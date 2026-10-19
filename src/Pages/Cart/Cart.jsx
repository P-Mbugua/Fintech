
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useCart } from "../../Context/CartContext";
import { Client, Account, Databases, Query } from "appwrite";
import { useNavigate } from "react-router-dom";

// Appwrite configuration
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67e83a4b001b39dcc0dc");

const account = new Account(client);
const databases = new Databases(client);

const DATABASE_ID = "67e83c7d003109ed269c";
const CART_COLLECTION_ID = "67eade1800187dbb6aad";

const formatPrice = (amount) =>
  `KSh ${Number(amount || 0).toLocaleString("en-KE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;

function Cart() {
  const { cart = [], setCart } = useCart();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [updatingIds, setUpdatingIds] = useState([]);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // Prevent duplicate requests from rapid clicks before React rerenders.
  const pendingRequests = useRef(new Set());

  // Fetch the authenticated user's cart from Appwrite.
  useEffect(() => {
    let active = true;

    const fetchCart = async () => {
      setLoading(true);
      setLoadError("");

      try {
        const user = await account.get();

        const response = await databases.listDocuments(
          DATABASE_ID,
          CART_COLLECTION_ID,
          [
            Query.equal("userId", user.$id),
            Query.limit(100),
          ]
        );

        if (!active) return;

        const items = response.documents.map((document) => ({
          ...document,
          quantity: Math.max(1, Number(document.quantity) || 1),
        }));

        setCart(items);
      } catch (error) {
        console.error("Error fetching cart:", error);

        if (active) {
          setLoadError(
            "We couldn't load your cart. Check your connection and try again."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchCart();

    return () => {
      active = false;
    };
  }, [setCart]);

  // Calculate totals whenever the cart changes.
  const subtotal = useMemo(
    () =>
      cart.reduce(
        (total, item) =>
          total +
          Math.max(0, Number(item.price01) || 0) *
            Math.max(1, Number(item.quantity) || 1),
        0
      ),
    [cart]
  );

  const totalItems = useMemo(
    () =>
      cart.reduce(
        (total, item) => total + Math.max(1, Number(item.quantity) || 1),
        0
      ),
    [cart]
  );

  const setItemUpdating = (documentId, isUpdating) => {
    setUpdatingIds((previous) =>
      isUpdating
        ? [...new Set([...previous, documentId])]
        : previous.filter((id) => id !== documentId)
    );
  };

  // Change quantity in Appwrite first, then synchronize the UI.
  const changeQuantity = useCallback(
    async (item, direction) => {
      const documentId = item.$id;

      if (!documentId || pendingRequests.current.has(documentId)) return;

      const currentQuantity = Math.max(1, Number(item.quantity) || 1);
      const nextQuantity = currentQuantity + direction;

      if (direction !== 1 && direction !== -1) return;

      // Do not allow quantities below one.
      if (nextQuantity < 1) return;

      pendingRequests.current.add(documentId);
      setItemUpdating(documentId, true);

      try {
        const user = await account.get();

        if (!user || item.userId !== user.$id) {
          throw new Error("You are not authorized to update this cart item.");
        }

        const updatedDocument = await databases.updateDocument(
          DATABASE_ID,
          CART_COLLECTION_ID,
          documentId,
          { quantity: nextQuantity }
        );

        setCart((previous) =>
          previous.map((cartItem) =>
            cartItem.$id === documentId
              ? { ...cartItem, ...updatedDocument }
              : cartItem
          )
        );
      } catch (error) {
        console.error("Error updating cart quantity:", error);
        window.alert(
          "We couldn't update the quantity. Please try again."
        );
      } finally {
        pendingRequests.current.delete(documentId);
        setItemUpdating(documentId, false);
      }
    },
    [setCart]
  );

  // Remove an item only after Appwrite confirms deletion.
  const removeItem = useCallback(
    async (item) => {
      const documentId = item.$id;

      if (!documentId || pendingRequests.current.has(documentId)) return;

      pendingRequests.current.add(documentId);
      setItemUpdating(documentId, true);

      try {
        const user = await account.get();

        if (!user || item.userId !== user.$id) {
          throw new Error("You are not authorized to remove this item.");
        }

        await databases.deleteDocument(
          DATABASE_ID,
          CART_COLLECTION_ID,
          documentId
        );

        setCart((previous) =>
          previous.filter((cartItem) => cartItem.$id !== documentId)
        );
      } catch (error) {
        console.error("Error removing cart item:", error);
        window.alert("We couldn't remove this item. Please try again.");
      } finally {
        pendingRequests.current.delete(documentId);
        setItemUpdating(documentId, false);
      }
    },
    [setCart]
  );

  const proceedToCheckout = async () => {
    if (cart.length === 0 || updatingIds.length > 0 || checkoutLoading) {
      return;
    }

    setCheckoutLoading(true);

    try {
      // Confirm the session before navigating.
      await account.get();

      // Re-read the cart so checkout uses current database quantities.
      const response = await databases.listDocuments(
        DATABASE_ID,
        CART_COLLECTION_ID,
        [
          Query.equal("userId", (await account.get()).$id),
          Query.limit(100),
        ]
      );

      const latestCart = response.documents.map((item) => ({
        ...item,
        quantity: Math.max(1, Number(item.quantity) || 1),
      }));

      setCart(latestCart);

      if (latestCart.length === 0) {
        window.alert("Your cart is empty.");
        return;
      }

      navigate("/checkout", {
        state: { cart: latestCart },
      });
    } catch (error) {
      console.error("Error preparing checkout:", error);
      window.alert(
        "We couldn't prepare your checkout. Please try again."
      );
    } finally {
      setCheckoutLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-[65vh] bg-gray-50 flex flex-col items-center justify-center gap-4 px-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-rose-600" />
        <p className="text-sm font-medium text-gray-500">
          Loading your cart...
        </p>
      </div>
    );
  }

  // Error state
  if (loadError) {
    return (
      <main className="min-h-[65vh] bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-lg rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-7 w-7"
            >
              <path d="M12 8v5m0 3h.01M10.3 3.9 2.5 17.4a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
            </svg>
          </div>

          <h2 className="text-xl font-bold text-gray-900">
            Unable to load your cart
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            {loadError}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-700"
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f7f8] pb-12 pt-6 sm:pt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page heading */}
        <div className="mb-7 flex flex-col gap-3 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-rose-600">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-600" />
              SokoPoa shopping
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
              Your shopping cart
            </h1>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Everything you love, ready when you are.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-4 w-4"
            >
              <path d="M19 12H5m7 7-7-7 7-7" />
            </svg>
            Continue shopping
          </button>
        </div>

        {cart.length === 0 ? (
          /* Empty cart */
          <section className="rounded-3xl border border-gray-200 bg-white px-5 py-16 text-center shadow-sm sm:py-24">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-rose-50 text-rose-600">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-10 w-10"
              >
                <path d="M3 3h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 8H6" />
                <circle cx="10" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
              </svg>
            </div>

            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              Your cart is waiting
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
              You haven't added anything yet. Explore SokoPoa and find
              something worth bringing home.
            </p>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="mt-7 rounded-xl bg-rose-600 px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-rose-700"
            >
              Start shopping
            </button>
          </section>
        ) : (
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_370px]">
            {/* Cart items */}
            <section className="min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4 sm:px-6">
                <div>
                  <h2 className="font-bold text-gray-900">
                    Cart items
                  </h2>
                  <p className="mt-1 text-xs text-gray-500">
                    {cart.length} {cart.length === 1 ? "product" : "products"} ·{" "}
                    {totalItems} {totalItems === 1 ? "item" : "items"} total
                  </p>
                </div>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                  {cart.length} products
                </span>
              </div>

              <div className="divide-y divide-gray-100">
                {cart.map((item) => {
                  const documentId = item.$id;
                  const quantity = Math.max(
                    1,
                    Number(item.quantity) || 1
                  );
                  const price = Math.max(0, Number(item.price01) || 0);
                  const isUpdating = updatingIds.includes(documentId);
                  const imageSrc = item.image;

                  return (
                    <article
                      key={documentId || item.id}
                      className={`relative flex flex-col gap-4 p-4 transition-opacity sm:flex-row sm:items-center sm:gap-5 sm:px-6 sm:py-5 ${
                        isUpdating ? "opacity-60" : ""
                      }`}
                    >
                      {/* Product image */}
                      <div className="flex min-w-0 flex-1 items-start gap-4">
                        <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-gray-50 sm:h-28 sm:w-28">
                          {imageSrc ? (
                            <img
                              src={imageSrc}
                              alt={item.productName || "Product"}
                              loading="lazy"
                              className="h-full w-full object-contain p-2 transition duration-300 hover:scale-105"
                              onError={(event) => {
                                event.currentTarget.style.display = "none";
                              }}
                            />
                          ) : (
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.2"
                              className="h-9 w-9 text-gray-300"
                            >
                              <rect x="3" y="3" width="18" height="18" rx="2" />
                              <circle cx="8.5" cy="8.5" r="1.5" />
                              <path d="m21 15-5-5L5 21" />
                            </svg>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="line-clamp-2 text-sm font-semibold leading-6 text-gray-900 sm:text-base">
                            {item.productName || "Unnamed product"}
                          </h3>

                          <p className="mt-1 text-xs text-gray-500">
                            Price per item
                          </p>

                          <p className="mt-0.5 font-bold text-gray-900">
                            {formatPrice(price)}
                          </p>

                          <button
                            type="button"
                            onClick={() => removeItem(item)}
                            disabled={isUpdating || !documentId}
                            className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 transition hover:text-rose-600 disabled:cursor-not-allowed"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.7"
                              className="h-3.5 w-3.5"
                            >
                              <path d="M3 6h18m-2 0-1 14H6L5 6m3 0V4h8v2m-7 4v6m4-6v6" />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Quantity and line total */}
                      <div className="flex items-end justify-between gap-4 sm:w-48 sm:shrink-0 sm:flex-col sm:items-end sm:justify-center">
                        <div>
                          <p className="mb-2 text-xs font-medium text-gray-500 sm:text-right">
                            Quantity
                          </p>

                          <div className="inline-flex h-10 items-center overflow-hidden rounded-lg border border-gray-200 bg-white">
                            <button
                              type="button"
                              aria-label={`Decrease quantity of ${item.productName}`}
                              onClick={() => changeQuantity(item, -1)}
                              disabled={isUpdating || quantity <= 1 || !documentId}
                              className="flex h-full w-9 items-center justify-center text-lg text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              −
                            </button>

                            <span className="flex h-full min-w-10 items-center justify-center border-x border-gray-200 px-2 text-sm font-semibold text-gray-900">
                              {quantity}
                            </span>

                            <button
                              type="button"
                              aria-label={`Increase quantity of ${item.productName}`}
                              onClick={() => changeQuantity(item, 1)}
                              disabled={isUpdating || !documentId}
                              className="flex h-full w-9 items-center justify-center text-lg text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
                            Subtotal
                          </p>
                          <p className="mt-1 text-base font-bold text-gray-950 sm:text-lg">
                            {formatPrice(price * quantity)}
                          </p>
                          {isUpdating && (
                            <p className="mt-1 text-[11px] text-rose-600">
                              Saving...
                            </p>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="border-t border-gray-100 bg-gray-50/70 px-4 py-4 sm:px-6">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-rose-600"
                >
                  <span aria-hidden="true">←</span>
                  Add more products
                </button>
              </div>
            </section>

            {/* Order summary */}
            <aside className="lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-100 px-5 py-5 sm:px-6">
                  <h2 className="text-lg font-bold text-gray-950">
                    Order summary
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Review your order before checkout.
                  </p>
                </div>

                <div className="space-y-4 px-5 py-5 sm:px-6">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-gray-500">
                      Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
                    </span>
                    <span className="font-semibold text-gray-900">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-gray-500">Delivery</span>
                    <span className="text-xs font-medium text-gray-500">
                      Calculated at checkout
                    </span>
                  </div>

                  <div className="border-t border-dashed border-gray-200 pt-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-bold text-gray-950">
                          Estimated total
                        </p>
                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          Excludes delivery charges, if applicable.
                        </p>
                      </div>

                      <p className="shrink-0 text-xl font-bold tracking-tight text-gray-950">
                        {formatPrice(subtotal)}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={proceedToCheckout}
                    disabled={
                      cart.length === 0 ||
                      updatingIds.length > 0 ||
                      checkoutLoading
                    }
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {checkoutLoading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        Preparing checkout...
                      </>
                    ) : (
                      <>
                        Proceed to checkout
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          className="h-4 w-4"
                        >
                          <path d="M5 12h14m-7-7 7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>

                  <div className="flex items-start gap-2 rounded-xl bg-gray-50 p-3.5">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="mt-0.5 h-4 w-4 shrink-0 text-gray-500"
                    >
                      <rect x="5" y="10" width="14" height="11" rx="2" />
                      <path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3" />
                    </svg>

                    <p className="text-xs leading-5 text-gray-500">
                      Your cart is synced with your account. Quantity changes
                      are saved to your cart in real time.
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-center text-xs leading-5 text-gray-400">
                Need help with your order? Visit our Help Centre.
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

export default Cart;
