
import React, { useEffect, useState } from "react";
import { ChevronRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Query } from "appwrite";

import OrderButton from "../../components/Buttons/OrderButton";
import AddToWishList from "../../components/Buttons/AddToWishList";

import {
  account,
  databases,
  DATABASE_ID,
  WISHLIST_COLLECTION_ID,
} from "../../components/Buttons/AddToWishList";

// FLASH SALES PRODUCT DATA

const hotSalesData = [
  {
    id: 1,
    name: "NIVEA UV Face Shine Control",
    price: 899,
    oldPrice: 1300,
    discount: 31,
    stock: 100,
    image:
      "https://www.masoko.com/_next/image?url=https%3A%2F%2Fassets.os.masoko.com%2Fmedia%2Fcatalog%2Fproduct%2Fs%2Fa%2Fsamsung_galaxy_a16_black.png&w=1920&q=75",
  },
  {
    id: 2,
    name: "VON Twin Tub Washing Machine",
    price: 17490,
    oldPrice: 29995,
    discount: 42,
    stock: 100,
    image:
      "https://img.kilimall.com/c/obs/seller/100003940/goods_image/241028154000_ad2cad7b2a5d098a82dcac93f63bd382.jpg?x-image-process=image/format,webp/resize,w_720#",
  },
  {
    id: 3,
    name: "Samsung A05, 6.7' 4GB RAM",
    price: 10430,
    oldPrice: 12516,
    discount: 17,
    stock: 119,
    image:
      "https://www.masoko.com/_next/image?url=https%3A%2F%2Fassets.os.masoko.com%2Fmedia%2Fcatalog%2Fproduct%2Fi%2Fp%2Fiphone_16_pro_natural_titanium_3.jpg&w=1920&q=75",
  },
  {
    id: 4,
    name: "Poco C75, 128GB + 8GB RAM",
    price: 12999,
    oldPrice: 16819,
    discount: 23,
    stock: 65,
    image:
      "https://www.masoko.com/_next/image?url=https%3A%2F%2Fassets.os.masoko.com%2Fmedia%2Fcatalog%2Fproduct%2Fs%2F2%2Fs25-ultra-2.jpg&w=1920&q=75",
  },
  {
    id: 5,
    name: "Infinix Smart 8 6.6' HD",
    price: 8499,
    oldPrice: 13999,
    discount: 39,
    stock: 82,
    image:
      "https://www.masoko.com/_next/image?url=https%3A%2F%2Fassets.os.masoko.com%2Fmedia%2Fcatalog%2Fproduct%2Fr%2Fe%2Fredmi_14c_starry_blue.jpg&w=1920&q=75",
  },
  {
    id: 6,
    name: "VON 3 Gas + 1 Electric Cooker",
    price: 22299,
    oldPrice: 35000,
    discount: 36,
    stock: 67,
    image:
      "https://img.kilimall.com/c/obs/seller/7879/goods_image/250118232632_82004acbfe7b383df51f3591abf4ffa5.jpg?x-image-process=image/format,webp/resize,w_720#",
  },
];

// COUNTDOWN HELPER

const getSecondsUntilNextSale = () => {
  const now = new Date();
  const nextSale = new Date(now);

  nextSale.setHours(
    (Math.floor(now.getHours() / 2) + 1) * 2,
    0,
    0,
    0
  );

  return Math.max(
    0,
    Math.floor((nextSale.getTime() - now.getTime()) / 1000)
  );
};

function HotSales() {
  const [timeLeft, setTimeLeft] = useState(getSecondsUntilNextSale);
  const [salesData, setSalesData] = useState(hotSalesData);

  // Shared wishlist state for all product cards.
  const [currentUser, setCurrentUser] = useState(null);
  const [wishlist, setWishlist] = useState({});
  const [wishlistReady, setWishlistReady] = useState(false);

  // Load the current user and wishlist once, not once per product.
  useEffect(() => {
    let active = true;

    async function loadWishlist() {
      try {
        const user = await account.get();

        if (!active) return;

        setCurrentUser(user);

        const response = await databases.listDocuments(
          DATABASE_ID,
          WISHLIST_COLLECTION_ID,
          [
            Query.equal("userId", user.$id),
            Query.limit(100),
          ]
        );

        if (!active) return;

        const savedProducts = {};

        response.documents.forEach((doc) => {
          savedProducts[String(doc.productId)] = {
            $id: doc.$id,
          };
        });

        setWishlist(savedProducts);
      } catch (error) {
        if (active) {
          setCurrentUser(null);
          setWishlist({});
          console.error("Could not load wishlist:", error);
        }
      } finally {
        if (active) {
          setWishlistReady(true);
        }
      }
    }

    loadWishlist();

    return () => {
      active = false;
    };
  }, []);

  // Update the shared wishlist immediately when a heart is clicked.
  const handleWishlistChange = (productId, entry) => {
    setWishlist((previous) => {
      const updated = { ...previous };

      if (entry) {
        updated[String(productId)] = entry;
      } else {
        delete updated[String(productId)];
      }

      return updated;
    });
  };

  // Shuffle products when a countdown cycle finishes.
  const shuffleProducts = () => {
    setSalesData((current) => {
      const products = [...current];

      for (let i = products.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [products[i], products[j]] = [
          products[j],
          products[i],
        ];
      }

      return products;
    });
  };

  // Update the countdown every second.
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          shuffleProducts();
          return getSecondsUntilNextSale();
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format seconds as HH:MM:SS.
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [hours, minutes, secs]
      .map((value) => String(value).padStart(2, "0"))
      .join(":");
  };

  return (
    <section className="w-full bg-white py-6 sm:py-8">
      {/* FLASH SALES HEADER */}

      <div className="mb-5 px-4 sm:px-5">
        <div className="flex w-full flex-wrap items-center justify-between gap-x-6 gap-y-4 xl:flex-nowrap">
          <div className="flex shrink-0 items-center gap-2.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50">
              <Zap
                size={22}
                className="fill-red-600 text-red-600"
              />
            </div>

            <h2 className="whitespace-nowrap text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
              Flash Sales
            </h2>

            <span className="whitespace-nowrap rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-red-600">
              Live now
            </span>
          </div>

          <p className="hidden flex-1 text-center text-sm text-gray-500 lg:block">
            Limited-time deals. Get more for less.
          </p>

          <div className="flex shrink-0 items-center gap-3">
            <span className="whitespace-nowrap text-sm font-medium text-gray-500">
              Ends in
            </span>

            <div
              className="rounded-lg bg-gray-900 px-3 py-2 font-mono text-sm font-bold tracking-wide text-white sm:text-base"
              aria-label={`Time remaining ${formatTime(timeLeft)}`}
            >
              {formatTime(timeLeft)}
            </div>
          </div>

          <Link
            to="/flash-sales"
            className="ml-auto inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-sm font-semibold text-gray-800 transition-colors hover:text-red-600 xl:ml-0"
          >
            See all
            <ChevronRight size={18} />
          </Link>
        </div>
      </div>

      {/* RESPONSIVE PRODUCT GRID */}

      <div className="grid grid-cols-2 gap-3 px-3 sm:grid-cols-3 sm:gap-4 sm:px-4 lg:grid-cols-4 xl:grid-cols-6">
        {salesData.map((item) => {
          const stockPercentage = Math.min(
            100,
            Math.max(0, item.stock)
          );

          return (
            <div
              key={item.id}
              className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gray-200 hover:shadow-lg"
            >
              {/* PRODUCT IMAGE AND ACTIONS */}

              <div className="relative flex h-36 items-center justify-center bg-gray-50 p-3 sm:h-44 sm:p-4">
                <span className="absolute left-2 top-2 z-10 rounded-md bg-red-600 px-2 py-1 text-[10px] font-bold text-white sm:left-3 sm:top-3 sm:text-xs">
                  -{item.discount}%
                </span>

                {/* ONE WISHLIST BUTTON PER PRODUCT */}

                <div className="absolute right-2 top-2 z-10 sm:right-3 sm:top-3">
                  <AddToWishList
                    productDetails={item}
                    sharedUser={currentUser}
                    sharedWishlist={wishlist}
                    wishlistReady={wishlistReady}
                    onWishlistChange={handleWishlistChange}
                  />
                </div>

                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  onError={(event) => {
                    event.currentTarget.style.visibility = "hidden";
                  }}
                />
              </div>

              {/* PRODUCT DETAILS */}

              <div className="flex flex-1 flex-col p-3 sm:p-3.5">
                <h3
                  title={item.name}
                  className="mb-2 min-h-10 text-sm font-medium leading-5 text-gray-800"
                >
                  {item.name}
                </h3>

                {/* PRICES */}

                <div className="mb-3">
                  <p className="text-base font-extrabold tracking-tight text-red-600 sm:text-lg">
                    KSh {item.price.toLocaleString("en-KE")}
                  </p>

                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <p className="text-xs text-gray-400 line-through">
                      KSh {item.oldPrice.toLocaleString("en-KE")}
                    </p>

                    <span className="text-[10px] font-semibold text-green-700 sm:text-xs">
                      Save KSh{" "}
                      {(item.oldPrice - item.price).toLocaleString("en-KE")}
                    </span>
                  </div>
                </div>

                {/* STOCK INDICATOR */}

                <div className="mt-auto border-t border-gray-100 pt-3">
                  <div className="mb-1.5 flex items-center justify-between gap-2">
                    <span className="text-[10px] text-gray-500 sm:text-xs">
                      Stock available
                    </span>

                    <span className="text-[10px] font-semibold text-gray-700 sm:text-xs">
                      {item.stock} left
                    </span>
                  </div>

                  <div
                    className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100"
                    role="progressbar"
                    aria-label={`Stock available for ${item.name}`}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={stockPercentage}
                  >
                    <div
                      className="h-full rounded-full bg-orange-500 transition-all"
                      style={{ width: `${stockPercentage}%` }}
                    />
                  </div>
                </div>

                {/* ORDER BUTTON */}

                <div className="mt-3">
                  <OrderButton productDetails={item} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default HotSales;
