
import React, { useCallback, useEffect, useState } from "react";
import { useCart } from "../../Context/CartContext";
import {
  Client,
  Account,
  Databases,
  ID,
  Query,
} from "appwrite";
import { toast } from "react-toastify";
import {
  Minus,
  Plus,
  ShoppingCart,
  LoaderCircle,
} from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67e83a4b001b39dcc0dc");

const account = new Account(client);
const databases = new Databases(client);

const DATABASE_ID = "67e83c7d003109ed269c";
const CART_COLLECTION_ID = "67eade1800187dbb6aad";

function AddToCartButton({ product }) {
  const { addToCart, updateQuantity, removeFromCart } = useCart();

  const [user, setUser] = useState(null);
  const [cartDocument, setCartDocument] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const productId = String(product?.id ?? "");

  const loadCartItem = useCallback(async () => {
    if (!productId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const currentUser = await account.get();
      setUser(currentUser);

      const response = await databases.listDocuments(
        DATABASE_ID,
        CART_COLLECTION_ID,
        [
          Query.equal("userId", currentUser.$id),
          Query.equal("productId", productId),
          Query.limit(1),
        ]
      );

      const existing = response.documents[0] || null;

      setCartDocument(existing);
      setQuantity(existing ? Number(existing.quantity) || 1 : 0);
    } catch (error) {
      setUser(null);
      setCartDocument(null);
      setQuantity(0);

      if (error?.code !== 401) {
        console.error("Could not load cart item:", error);
      }
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    let active = true;

    const load = async () => {
      if (!productId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const currentUser = await account.get();

        if (!active) return;
        setUser(currentUser);

        const response = await databases.listDocuments(
          DATABASE_ID,
          CART_COLLECTION_ID,
          [
            Query.equal("userId", currentUser.$id),
            Query.equal("productId", productId),
            Query.limit(1),
          ]
        );

        if (!active) return;

        const existing = response.documents[0] || null;

        setCartDocument(existing);
        setQuantity(
          existing ? Math.max(1, Number(existing.quantity) || 1) : 0
        );
      } catch (error) {
        if (active) {
          setUser(null);
          setCartDocument(null);
          setQuantity(0);

          if (error?.code !== 401) {
            console.error("Could not load cart item:", error);
          }
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    load();

    return () => {
      active = false;
    };
  }, [productId]);

  const addFirstItem = async () => {
    if (!productId || !product?.name) {
      toast.error("Product information is missing.");
      return;
    }

    const currentUser = user || (await account.get());
    setUser(currentUser);

    // Recheck before creating a document.
    const response = await databases.listDocuments(
      DATABASE_ID,
      CART_COLLECTION_ID,
      [
        Query.equal("userId", currentUser.$id),
        Query.equal("productId", productId),
        Query.limit(1),
      ]
    );

    const existing = response.documents[0];

    if (existing) {
      setCartDocument(existing);
      setQuantity(Math.max(1, Number(existing.quantity) || 1));
      toast.info("This product is already in your cart.");
      return;
    }

    const price = Number(product.price) || 0;

    const saved = await databases.createDocument(
      DATABASE_ID,
      CART_COLLECTION_ID,
      ID.unique(),
      {
        userId: currentUser.$id,
        productId,
        productName: String(product.name),
        quantity: 1,
        price01: price,
        total01: price,
        createdAt01: Math.floor(Date.now() / 1000),
        image: String(product.image || ""),
      }
    );

    setCartDocument(saved);
    setQuantity(1);

    // Keep the existing local cart integration.
    addToCart(product);

    toast.success("Added to cart!");
  };

  const changeQuantity = async (change) => {
    if (updating || loading) return;

    if (!cartDocument?.$id) {
      if (change > 0) {
        try {
          setUpdating(true);
          await addFirstItem();
        } catch (error) {
          console.error("Could not add item:", error);
          toast.error(
            error?.code === 401
              ? "Please log in to add items to your cart."
              : "Could not add this product. Please try again."
          );
        } finally {
          setUpdating(false);
        }
      }
      return;
    }

    const nextQuantity = quantity + change;

    if (nextQuantity < 0) return;

    try {
      setUpdating(true);

      if (nextQuantity === 0) {
        await databases.deleteDocument(
          DATABASE_ID,
          CART_COLLECTION_ID,
          cartDocument.$id
        );

        setCartDocument(null);
        setQuantity(0);

        // Update local cart if your CartContext provides this method.
        if (typeof removeFromCart === "function") {
          removeFromCart(product.id);
        }

        toast.success("Product removed from cart.");
        return;
      }

      const price = Number(cartDocument.price01) || Number(product.price) || 0;

      const updated = await databases.updateDocument(
        DATABASE_ID,
        CART_COLLECTION_ID,
        cartDocument.$id,
        {
          quantity: nextQuantity,
          total01: price * nextQuantity,
        }
      );

      setCartDocument(updated);
      setQuantity(nextQuantity);

      // Sync the local cart if these methods are available.
      if (typeof updateQuantity === "function") {
        updateQuantity(product.id, nextQuantity);
      } else if (change > 0 && typeof addToCart === "function") {
        addToCart(product);
      }

    } catch (error) {
      console.error("Could not update cart quantity:", error);

      toast.error(
        error?.message || "Could not update the quantity."
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <button
        type="button"
        disabled
        className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-5 py-3 text-sm font-semibold text-gray-400"
      >
        <LoaderCircle size={17} className="animate-spin" />
        Loading cart...
      </button>
    );
  }

  // Product is already in the cart: show the quantity stepper.
  if (cartDocument && quantity > 0) {
    return (
      <div className="flex min-h-[54px] w-full items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-1.5 shadow-sm">
        <button
          type="button"
          onClick={() => changeQuantity(-1)}
          disabled={updating}
          aria-label="Decrease quantity"
          className="flex h-11 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-800 transition hover:bg-gray-200 active:scale-95 disabled:opacity-50"
        >
          <Minus size={18} />
        </button>

        <div className="flex min-w-0 flex-1 flex-col items-center justify-center">
          <span className="text-base font-bold tabular-nums text-gray-950">
            {updating ? "..." : quantity}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
            In your cart
          </span>
        </div>

        <button
          type="button"
          onClick={() => changeQuantity(1)}
          disabled={updating}
          aria-label="Increase quantity"
          className="flex h-11 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gray-950 text-white transition hover:bg-gray-700 active:scale-95 disabled:opacity-50"
        >
          <Plus size={18} />
        </button>
      </div>
    );
  }

  // Product is not in the cart.
  return (
    <button
      type="button"
      onClick={async () => {
        if (updating) return;

        try {
          setUpdating(true);
          await addFirstItem();
        } catch (error) {
          console.error("Error adding product to cart:", error);

          toast.error(
            error?.code === 401
              ? "Please log in to add items to your cart."
              : error?.message || "Could not add this product."
          );
        } finally {
          setUpdating(false);
        }
      }}
      disabled={updating}
      className="flex min-h-[54px] w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-sm transition hover:border-gray-400 hover:bg-gray-50 active:scale-[0.99] disabled:cursor-wait disabled:opacity-60"
    >
      {updating ? (
        <>
          <LoaderCircle size={18} className="animate-spin" />
          Adding...
        </>
      ) : (
        <>
          <ShoppingCart size={18} />
          Add to Cart
        </>
      )}
    </button>
  );
}

export default AddToCartButton;
