import React, { useState, useEffect, useRef } from "react";
import {
  FaRobot,
  FaTimes,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { Client, Account, Databases } from "appwrite";

/**
 * FloatingContactButton
 *
 * - Fetches current user via Appwrite Account.get()
 * - Loads wishlist and orders from multiple collection IDs (tries the ones you supplied)
 * - Shows typing animation ("Assistant is thinking...") then personalized content
 * - Provides WhatsApp / Email / Call links prefilled with user context
 * - Includes a compact debug panel so you can inspect raw data (useful for permissions/CORS troubleshooting)
 *
 * Notes:
 *  - Ensure Appwrite CORS is set to allow your front-end URL
 *  - Ensure sessions are active (login creates a session that account.get() uses)
 *  - If collection names/ids differ in your console, replace values in COLLECTIONS array
 */

export default function FloatingContactButton() {
  // UI state
  const [isOpen, setIsOpen] = useState(false);
  const [isDebugOpen, setIsDebugOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  // Data state
  const [user, setUser] = useState(null); // Appwrite user object
  const [wishlistItems, setWishlistItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  // debug and refs
  const mountedRef = useRef(true);

  // Appwrite config (project ID from your project)
  const APPWRITE_ENDPOINT = "https://cloud.appwrite.io/v1";
  const APPWRITE_PROJECT = "67e83a4b001b39dcc0dc";
  const client = new Client().setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT);
  const account = new Account(client);
  const databases = new Databases(client);

  // Collections you posted (we will try them, in order, and gracefully handle errors)
  // NOTE: If console shows different collection IDs, replace these with the exact collection IDs.
  const DATABASE_ID = "database-67e83c7d003109ed269c";
  const COLLECTION_IDS = [
    "table-wishlist", // provided link (may be slug)
    "wishlist", // earlier guessed id
    "67eade1800187dbb6aad", // table-67eade...
    "67e84557002bec656b65", // table-67e845...
    "68016180000538126583", // earlier orders collection id you used
  ];

  // Contact details (change these to your business channels)
  const whatsappNumber = "254700000000"; // no plus, used with wa.me
  const phoneNumber = "+254700000000"; // used with tel:
  const supportEmail = "support@yourecommerce.com";

  // Responsive popup width classes
  const popupWidthClass = windowWidth < 420 ? "w-64" : windowWidth < 1024 ? "w-80" : "w-96";

  // Listen to resize for responsiveness
  useEffect(() => {
    mountedRef.current = true;
    const handleResize = () => {
      if (mountedRef.current) setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      mountedRef.current = false;
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Helper: attempt to fetch user, wishlist, orders
  useEffect(() => {
    let aborted = false;
    const timeoutForTyping = 800; // min time for typing animation

    const fetchAll = async () => {
      setLoadingData(true);
      setErrorMessage(null);
      setIsTyping(true);

      try {
        // 1) Get current user (throws if no session)
        const currentUser = await account.get();
        if (aborted) return;
        setUser(currentUser);

        // 2) Fetch documents from all candidate collections, filter by current user's id or email
        // We'll try to pull wishlist-like documents and order-like documents and separate them by
        // checking presence of typical fields (e.g., productId/productName/price).
        const collectedWishlists = [];
        const collectedOrders = [];

        // iterate through collection ids and attempt to list documents for each
        for (const col of COLLECTION_IDS) {
          if (aborted) return;

          try {
            // try to fetch docs from this collection
            const res = await databases.listDocuments(DATABASE_ID, col, [
              // no filters here — we fetch and then filter in JS to avoid SDK query complexity
            ]);
            if (!res || !res.documents) continue;

            // categorize documents into wishlist or orders by checking fields
            res.documents.forEach((doc) => {
              // common fields checking heuristics:
              const hasProductName = doc.productName || doc.name || doc.title || doc.product_title;
              const hasUserField = doc.userId || doc.user || doc.user_id || doc.ownerId || doc.owner;

              // try matching by user id or email if available
              const matchesUser =
                (currentUser && (doc.userId === currentUser.$id || doc.user === currentUser.$id || doc.ownerId === currentUser.$id)) ||
                (currentUser && (doc.email === currentUser.email || doc.userEmail === currentUser.email));

              // If it looks like an order (has order-specific fields)
              if (doc.orderId || doc.status || doc.total || doc.items) {
                if (matchesUser) collectedOrders.push(doc);
              } else if (hasProductName && matchesUser) {
                // looks like wishlist item
                collectedWishlists.push(doc);
              } else {
                // if document contains user match but unclear type, push it to orders if it has price, otherwise wishlist
                if (matchesUser) {
                  if (doc.price || doc.amount || doc.qnty || doc.quantity) collectedOrders.push(doc);
                  else collectedWishlists.push(doc);
                }
              }
            });
          } catch (e) {
            // collection not accessible or doesn't exist, continue to next
            // show dev-friendly console output
            // eslint-disable-next-line no-console
            console.debug(`Failed to load from collection '${col}':`, e.message || e);
          }
        }

        // Deduplicate by id
        const dedupeById = (arr) => {
          const map = new Map();
          arr.forEach((it) => {
            if (!it || !it.$id) return;
            map.set(it.$id, it);
          });
          return Array.from(map.values());
        };

        const finalWishlist = dedupeById(collectedWishlists);
        const finalOrders = dedupeById(collectedOrders);

        if (!aborted) {
          setWishlistItems(finalWishlist);
          setOrders(finalOrders);

          // build suggestions: if user has orders, look at last ordered product(s)
          const suggestionList = [];
          if (finalOrders.length > 0) {
            // try to determine product names from orders and propose "upgrades"
            const last = finalOrders[finalOrders.length - 1];
            const lastName = last.productName || last.name || last.title || last.product_title || last.items?.[0]?.name;
            suggestionList.push({
              title: lastName ? `Upgrade suggestions for ${lastName}` : "Recommended upgrades",
              detail: `Based on your recent purchase${lastName ? ` (${lastName})` : ""}, we found similar or newer models you may like.`,
              example: lastName ? `${lastName} Pro / Plus` : "Check latest models",
            });
          } else if (finalWishlist.length > 0) {
            suggestionList.push({
              title: "Wishlist deals",
              detail: `You have ${finalWishlist.length} saved item(s). I can find discounts or similar alternatives.`,
              example: finalWishlist.slice(0, 3).map((w) => w.productName || w.name || w.title || "Saved item").join(", "),
            });
          } else {
            suggestionList.push({
              title: "Trending picks",
              detail: "Explore best-sellers and trending items tailored for you.",
              example: "Top phones, TVs, health & beauty picks",
            });
          }

          setSuggestions(suggestionList);
        }
      } catch (err) {
        // account.get may fail if user not logged in or session expired
        if (!aborted) {
          setErrorMessage(err.message || "Failed to fetch user data. Are you logged in?");
          setUser(null);
          setWishlistItems([]);
          setOrders([]);
          setSuggestions([
            {
              title: "Not signed in",
              detail: "Sign in to get personalized suggestions, wishlist data and past orders.",
              example: "Use the Login link to sign in.",
            },
          ]);
          // eslint-disable-next-line no-console
          console.warn("Appwrite fetch error:", err);
        }
      } finally {
        // ensure typing animation shows for at least timeoutForTyping
        setTimeout(() => {
          if (!aborted) {
            setIsTyping(false);
            setLoadingData(false);
          }
        }, timeoutForTyping);
      }
    };

    fetchAll();

    return () => {
      aborted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Generate friendly message used in contact link
  const contextText = () => {
    const action = (() => {
      const path = (typeof window !== "undefined" && window.location.pathname.toLowerCase()) || "";
      if (path.includes("phone")) return "browsing phones";
      if (path.includes("tv")) return "checking TVs";
      if (path.includes("cart")) return "reviewing cart";
      if (path.includes("wishlist")) return "viewing wishlist";
      if (path.includes("checkout")) return "checking out";
      return "browsing the store";
    })();

    const name = (user && (user.name || user.$id || user.email)) || "Guest";
    return `${name} is ${action}`;
  };

  // small UI helper components
  const SmallStat = ({ label, value }) => (
    <div className="flex items-center justify-between w-full text-xs md:text-sm">
      <div className="text-gray-600">{label}</div>
      <div className="font-semibold text-gray-800">{value}</div>
    </div>
  );

  // main render
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Popup */}
      {isOpen && (
        <div
          className={`bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 mb-3 transition-all duration-300 ease-in-out transform ${popupWidthClass}`}
          role="dialog"
          aria-label="Smart Assistant Popup"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-tr from-blue-500 to-indigo-500 text-white p-2 rounded-full shadow-sm">
                <FaRobot />
              </div>
              <div>
                <div className="text-sm md:text-base font-semibold text-gray-800">Smart Assistant</div>
                <div className="text-xs text-gray-500">Personalized help & suggestions</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsDebugOpen((s) => !s)}
                className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded-md"
                title="Toggle debug"
              >
                {isDebugOpen ? <span className="flex items-center gap-1"><FaChevronUp /> Debug</span> : <span className="flex items-center gap-1"><FaChevronDown /> Debug</span>}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-red-500 p-1 rounded-md"
                aria-label="Close assistant"
                title="Close"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {/* Typing / content */}
          {isTyping ? (
            <div className="flex items-center gap-3 text-gray-500 mb-3">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300" />
              </div>
              <div className="text-sm italic">Assistant is thinking...</div>
            </div>
          ) : (
            <>
              {/* Greeting and stats */}
              <div className="mb-3">
                <div className="text-sm text-gray-700 mb-2">
                  👋 Hello{" "}
                  <span className="font-semibold text-gray-900">
                    {user ? user.name || user.email || user.$id : "Guest"}
                  </span>
                  , I see you’re {(() => {
                    const path = (typeof window !== "undefined" && window.location.pathname.toLowerCase()) || "";
                    if (path.includes("phone")) return "browsing phones 📱";
                    if (path.includes("tv")) return "checking out TVs 📺";
                    if (path.includes("health")) return "exploring health & beauty 💄";
                    if (path.includes("cart")) return "reviewing your cart 🛒";
                    if (path.includes("wishlist")) return "viewing your wishlist ❤️";
                    if (path.includes("checkout")) return "completing your purchase 💳";
                    return "shopping on our store 🛍️";
                  })()}.
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <SmallStat label="Wishlist" value={wishlistItems.length} />
                  <SmallStat label="Orders" value={orders.length} />
                </div>

                {/* Suggestion box */}
                <div className="bg-gray-50 border border-gray-200 p-3 rounded-md mb-3">
                  {suggestions && suggestions.length > 0 ? (
                    <>
                      <div className="text-sm font-semibold text-gray-800">{suggestions[0].title}</div>
                      <div className="text-xs text-gray-600 mt-1">{suggestions[0].detail}</div>
                      <div className="text-xs text-gray-500 mt-2 italic">{suggestions[0].example}</div>
                    </>
                  ) : (
                    <div className="text-sm text-gray-600">No suggestions right now.</div>
                  )}
                </div>
              </div>

              {/* Contact buttons */}
              <div className="flex flex-col gap-2">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=Hi! ${encodeURIComponent(contextText())}. I need help.`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                >
                  <FaWhatsapp /> <span className="text-sm">WhatsApp</span>
                </a>

                <a
                  href={`mailto:${supportEmail}?subject=${encodeURIComponent("Help request")}&body=${encodeURIComponent(contextText())}`}
                  className="flex items-center justify-center gap-2 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition"
                >
                  <FaEnvelope /> <span className="text-sm">Email Support</span>
                </a>

                <a
                  href={`tel:${phoneNumber}`}
                  className="flex items-center justify-center gap-2 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
                >
                  <FaPhoneAlt /> <span className="text-sm">Call Us</span>
                </a>
              </div>

              {/* Optional error */}
              {errorMessage && <div className="text-xs text-red-500 mt-3">{errorMessage}</div>}
            </>
          )}

          {/* Debug panel */}
          {isDebugOpen && (
            <div className="mt-3 p-3 bg-gray-100 border border-gray-200 rounded-md text-xs text-gray-700">
              <div className="font-medium mb-2">Debug Info</div>

              <div className="mb-2">
                <div className="text-gray-600">User:</div>
                <pre className="whitespace-pre-wrap max-h-40 overflow-auto bg-white p-2 rounded text-xs">
                  {user ? JSON.stringify(user, null, 2) : "No user session (account.get() failed)"}
                </pre>
              </div>

              <div className="mb-2">
                <div className="text-gray-600">Wishlist documents fetched:</div>
                <pre className="whitespace-pre-wrap max-h-40 overflow-auto bg-white p-2 rounded text-xs">
                  {JSON.stringify(wishlistItems.slice(0, 20), null, 2)}
                </pre>
              </div>

              <div>
                <div className="text-gray-600">Orders fetched:</div>
                <pre className="whitespace-pre-wrap max-h-40 overflow-auto bg-white p-2 rounded text-xs">
                  {JSON.stringify(orders.slice(0, 20), null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => {
          setIsOpen((s) => !s);
          // When opening, ensure typing animation shows briefly to mimic AI thinking
          if (!isOpen) {
            setIsTyping(true);
            setTimeout(() => {
              setIsTyping(false);
            }, 700);
          }
        }}
        aria-label="Open Smart Contact Assistant"
        title="Smart Assistant"
        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 md:p-4 rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition transform focus:outline-none"
      >
        <FaRobot size={windowWidth < 480 ? 18 : 22} />
      </button>
    </div>
  );
}

