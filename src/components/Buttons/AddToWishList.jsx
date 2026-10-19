
import React, { useEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";
import {
  Client,
  Account,
  Databases,
  ID,
  Query,
} from "appwrite";
import { toast } from "react-toastify";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67e83a4b001b39dcc0dc");

const account = new Account(client);
const databases = new Databases(client);

const DATABASE_ID = "67e83c7d003109ed269c";
const WISHLIST_COLLECTION_ID = "6accace400097c9b7edb";

export {
  account,
  databases,
  DATABASE_ID,
  WISHLIST_COLLECTION_ID,
};

function AddToWishList({
  productDetails,
  sharedUser,
  sharedWishlist,
  onWishlistChange,
  wishlistReady = false,
}) {
  const [localUser, setLocalUser] = useState(null);
  const [localReady, setLocalReady] = useState(false);
  const [localWishlisted, setLocalWishlisted] = useState(false);
  const [localDocumentId, setLocalDocumentId] = useState(null);
  const [loading, setLoading] = useState(false);

  const busy = useRef(false);
  const mounted = useRef(false);

  // If sharedUser is provided, HotSales manages the wishlist state.
  const usesSharedState = sharedUser !== undefined;

  const user = usesSharedState ? sharedUser : localUser;
  const ready = usesSharedState ? wishlistReady : localReady;

  const productId = String(productDetails?.id ?? "");
  const sharedEntry = sharedWishlist?.[productId];

  const isWishlisted = usesSharedState
    ? Boolean(sharedEntry)
    : localWishlisted;

  const documentId = usesSharedState
    ? sharedEntry?.$id || null
    : localDocumentId;

  useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  // Standalone usage: load the user and this product's wishlist status.
  // HotSales uses shared state and skips these individual requests.
  useEffect(() => {
    if (usesSharedState) return undefined;

    let active = true;

    async function loadWishlist() {
      try {
        const currentUser = await account.get();

        if (!active) return;

        setLocalUser(currentUser);

        const response = await databases.listDocuments(
          DATABASE_ID,
          WISHLIST_COLLECTION_ID,
          [
            Query.equal("userId", currentUser.$id),
            Query.equal("productId", productId),
            Query.limit(1),
          ]
        );

        if (!active) return;

        const saved = response.documents[0] || null;

        setLocalWishlisted(Boolean(saved));
        setLocalDocumentId(saved?.$id || null);
      } catch (error) {
        if (active) {
          setLocalUser(null);
          setLocalWishlisted(false);
          setLocalDocumentId(null);

          console.error("Could not load wishlist:", error);
        }
      } finally {
        if (active) setLocalReady(true);
      }
    }

    loadWishlist();

    return () => {
      active = false;
    };
  }, [usesSharedState, productId]);

  const updateWishlistState = (saved, id) => {
    if (usesSharedState) {
      onWishlistChange?.(
        productId,
        saved ? { $id: id || null } : null
      );
    } else {
      setLocalWishlisted(saved);
      setLocalDocumentId(id || null);
    }
  };

  const handleToggle = async () => {
    if (busy.current) return;

    if (!ready) {
      toast.info("Your wishlist is still loading. Please try again.", {
        autoClose: 1800,
      });
      return;
    }

    if (!user?.$id) {
      toast.info("Please log in to manage your wishlist.", {
        autoClose: 2000,
      });
      return;
    }

    if (!productId) {
      toast.error("This product could not be identified.");
      return;
    }

    busy.current = true;
    setLoading(true);

    const wasWishlisted = isWishlisted;
    const previousDocumentId = documentId;

    // Optimistic update: update the heart before contacting Appwrite.
    updateWishlistState(!wasWishlisted, previousDocumentId);

    const toastId = toast.loading(
      wasWishlisted
        ? "Removing from wishlist..."
        : "Adding to wishlist..."
    );

    try {
      if (wasWishlisted) {
        let idToDelete = previousDocumentId;

        // Find the document only if its ID is not already known.
        if (!idToDelete) {
          const result = await databases.listDocuments(
            DATABASE_ID,
            WISHLIST_COLLECTION_ID,
            [
              Query.equal("userId", user.$id),
              Query.equal("productId", productId),
              Query.limit(1),
            ]
          );

          idToDelete = result.documents[0]?.$id;
        }

        if (!idToDelete) {
          throw new Error("Wishlist document was not found.");
        }

        await databases.deleteDocument(
          DATABASE_ID,
          WISHLIST_COLLECTION_ID,
          idToDelete
        );

        if (mounted.current) {
          toast.update(toastId, {
            render: "Removed from wishlist",
            type: "success",
            isLoading: false,
            autoClose: 1500,
          });
        }
      } else {
        const savedDocument = await databases.createDocument(
          DATABASE_ID,
          WISHLIST_COLLECTION_ID,
          ID.unique(),
          {
            userId: user.$id,
            productId,
            productName: String(productDetails?.name || ""),
            price: Number(productDetails?.price) || 0,
            oldPrice: Number(productDetails?.oldPrice ?? 0) || 0,
            discount: Number(productDetails?.discount ?? 0) || 0,
            stock: Number(productDetails?.stock ?? 0) || 0,
            image: String(productDetails?.image ?? ""),
            createdAt: Math.floor(Date.now() / 1000),
          }
        );

        updateWishlistState(true, savedDocument.$id);

        if (mounted.current) {
          toast.update(toastId, {
            render: "Added to wishlist!",
            type: "success",
            isLoading: false,
            autoClose: 1500,
          });
        }
      }
    } catch (error) {
      console.error("Wishlist update failed:", error);

      // Roll back the heart if Appwrite rejects the operation.
      updateWishlistState(wasWishlisted, previousDocumentId);

      if (mounted.current) {
        toast.update(toastId, {
          render: "Could not update wishlist. Please try again.",
          type: "error",
          isLoading: false,
          autoClose: 2500,
        });
      }
    } finally {
      busy.current = false;

      if (mounted.current) {
        setLoading(false);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={loading || !ready}
      aria-label={
        isWishlisted
          ? `Remove ${productDetails?.name || "product"} from wishlist`
          : `Add ${productDetails?.name || "product"} to wishlist`
      }
      aria-pressed={isWishlisted}
      title={
        !ready
          ? "Loading wishlist..."
          : isWishlisted
            ? "Remove from wishlist"
            : "Add to wishlist"
      }
      className={`flex h-9 w-9 items-center justify-center rounded-full shadow-sm transition-all duration-150 ${
        isWishlisted
          ? "bg-red-600 text-white hover:bg-red-700"
          : "bg-white text-gray-600 hover:bg-red-50 hover:text-red-600"
      } ${
        !ready || loading
          ? "cursor-wait opacity-80"
          : "hover:scale-105"
      }`}
    >
      <Heart
        size={18}
        strokeWidth={2}
        className={isWishlisted ? "fill-current" : ""}
      />
    </button>
  );
}

export default AddToWishList;
