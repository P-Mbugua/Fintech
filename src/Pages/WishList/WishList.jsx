
import React, { useState, useEffect, useCallback } from "react";
import {
  Star,
  StarHalf,
  StarOff,
  Heart,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { Client, Account, TablesDB, Query } from "appwrite";
import { toast } from "react-toastify";
import AddToCartButton from "../../components/Buttons/AddToCartButton";
import "react-toastify/dist/ReactToastify.css";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67e83a4b001b39dcc0dc");

const account = new Account(client);
const tablesDB = new TablesDB(client);

const DATABASE_ID = "67e83c7d003109ed269c";
const WISHLIST_TABLE_ID = "6accace400097c9b7edb";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [user, setUser] = useState(null);

  const fetchWishlist = useCallback(async () => {
    setLoading(true);

    try {
      const currentUser = await account.get();
      setUser(currentUser);

      const response = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: WISHLIST_TABLE_ID,
        queries: [
          Query.equal("userId", currentUser.$id),
          Query.orderDesc("$createdAt"),
        ],
      });

      setWishlist(response.rows);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setWishlist([]);

      if (error.code === 401) {
        setUser(null);
      } else {
        toast.error("Unable to load your wishlist. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const renderStars = (rating) => {
    if (rating == null || Number.isNaN(Number(rating))) {
      return <span className="text-xs text-gray-400">Not rated</span>;
    }

    const value = Math.min(5, Math.max(0, Number(rating)));
    const full = Math.floor(value);
    const half = value - full >= 0.5;

    return (
      <div
        className="flex items-center gap-0.5 text-amber-400"
        aria-label={`Rating ${value} out of 5`}
      >
        {[...Array(full)].map((_, i) => (
          <Star key={`full-${i}`} size={14} fill="currentColor" />
        ))}
        {half && <StarHalf size={14} fill="currentColor" />}
        {[...Array(5 - full - (half ? 1 : 0))].map((_, i) => (
          <StarOff
            key={`empty-${i}`}
            size={14}
            className="text-gray-200"
          />
        ))}
      </div>
    );
  };

  const handleRemoveFromWishlist = async (rowId) => {
    try {
      setRemovingId(rowId);

      await tablesDB.deleteRow({
        databaseId: DATABASE_ID,
        tableId: WISHLIST_TABLE_ID,
        rowId,
      });

      setWishlist((items) => items.filter((item) => item.$id !== rowId));
      toast.success("Product removed from your wishlist.");
    } catch (error) {
      console.error("Error removing wishlist product:", error);
      toast.error("Could not remove this product. Please try again.");
    } finally {
      setRemovingId(null);
    }
  };

  const getCartProduct = (item) => ({
    id: String(item.productId),
    name: item.productName,
    price: Number(item.price),
    oldPrice: item.oldPrice,
    discount: item.discount,
    stock: item.stock,
    image: item.image,
  });

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-gray-900" />
          <p className="text-sm text-gray-500">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#fafafa] px-5">
        <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white px-7 py-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-50">
            <Heart size={24} strokeWidth={1.6} className="text-gray-700" />
          </div>
          <h1 className="mt-5 text-2xl font-semibold tracking-tight text-gray-900">
            My Wishlist
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Please log in to view your saved products.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafafa] px-4 py-7 sm:px-6 sm:py-10 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <header className="mb-7 flex items-center justify-between gap-4 sm:mb-9">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white">
              <Heart size={21} strokeWidth={1.7} className="text-gray-800" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-gray-950 sm:text-3xl">
                My Wishlist
              </h1>
            </div>
          </div>

          <span className="rounded-full border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium tabular-nums text-gray-600">
            {wishlist.length} {wishlist.length === 1 ? "item" : "items"}
          </span>
        </header>

        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          {wishlist.length > 0 ? (
            <>
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[900px] table-auto text-left">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50/70">
                      {["Product", "Category", "Price", "Rating", "Stock", ""].map(
                        (heading, index) => (
                          <th
                            key={`${heading}-${index}`}
                            className={`px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500 ${
                              index === 5 ? "text-right" : ""
                            }`}
                          >
                            {heading}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {wishlist.map((item) => (
                      <tr
                        key={item.$id}
                        className="group transition-colors duration-200 hover:bg-gray-50/70"
                      >
                        <td className="px-5 py-4">
                          <div className="flex min-w-[250px] items-center gap-4">
                            <div className="flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-white p-2">
                              {item.image ? (
                                <img
                                  src={item.image}
                                  alt={item.productName || "Product"}
                                  loading="lazy"
                                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                                />
                              ) : (
                                <ShoppingBag
                                  size={24}
                                  strokeWidth={1.5}
                                  className="text-gray-300"
                                />
                              )}
                            </div>
                            <span className="max-w-[230px] text-sm font-semibold leading-5 text-gray-800">
                              {item.productName || "Unnamed product"}
                            </span>
                          </div>
                        </td>

                        <td className="px-5 py-4 text-sm text-gray-400">—</td>

                        <td className="px-5 py-4">
                          <p className="whitespace-nowrap text-sm font-semibold text-gray-900">
                            KSh {Number(item.price || 0).toLocaleString("en-KE")}
                          </p>
                          {Number(item.oldPrice) > Number(item.price) && (
                            <p className="mt-1 whitespace-nowrap text-xs text-gray-400 line-through">
                              KSh {Number(item.oldPrice).toLocaleString("en-KE")}
                            </p>
                          )}
                        </td>

                        <td className="px-5 py-4">{renderStars(item.rating)}</td>

                        <td className="px-5 py-4 text-sm text-gray-600">
                          {item.stock ?? "—"}
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex min-w-max items-center justify-end gap-2">
                            <AddToCartButton product={getCartProduct(item)} />

                            <button
                              type="button"
                              onClick={() => handleRemoveFromWishlist(item.$id)}
                              disabled={removingId === item.$id}
                              title="Remove from wishlist"
                              aria-label={`Remove ${item.productName} from wishlist`}
                              className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {removingId === item.$id ? (
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-200 border-t-gray-700" />
                              ) : (
                                <Trash2 size={16} strokeWidth={1.7} />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="divide-y divide-gray-100 md:hidden">
                {wishlist.map((item) => (
                  <article key={item.$id} className="p-4 sm:p-5">
                    <div className="flex gap-4">
                      <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-white p-2">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.productName || "Product"}
                            loading="lazy"
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <ShoppingBag
                            size={26}
                            strokeWidth={1.5}
                            className="text-gray-300"
                          />
                        )}
                      </div>

                      <div className="min-w-0 flex-1 pt-1">
                        <h2 className="text-sm font-semibold leading-5 text-gray-900">
                          {item.productName || "Unnamed product"}
                        </h2>
                        <p className="mt-2 text-base font-semibold text-gray-900">
                          KSh {Number(item.price || 0).toLocaleString("en-KE")}
                        </p>
                        {Number(item.oldPrice) > Number(item.price) && (
                          <p className="text-xs text-gray-400 line-through">
                            KSh {Number(item.oldPrice).toLocaleString("en-KE")}
                          </p>
                        )}
                        <div className="mt-2">{renderStars(item.rating)}</div>
                        <p className="mt-1 text-xs text-gray-500">
                          Stock: {item.stock ?? "—"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <div className="min-w-0 flex-1">
                        <AddToCartButton product={getCartProduct(item)} />
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveFromWishlist(item.$id)}
                        disabled={removingId === item.$id}
                        aria-label={`Remove ${item.productName} from wishlist`}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                      >
                        {removingId === item.$id ? (
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-200 border-t-gray-700" />
                        ) : (
                          <Trash2 size={16} strokeWidth={1.7} />
                        )}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center px-6 py-20 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gray-200 bg-gray-50">
                <Heart size={26} strokeWidth={1.5} className="text-gray-400" />
              </div>
              <h2 className="mt-5 text-lg font-semibold tracking-tight text-gray-900">
                Your wishlist is empty
              </h2>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Wishlist;
