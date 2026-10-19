
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  Image as ImageIcon,
  Package,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Tag,
  Truck,
  X,
  ZoomIn,
} from "lucide-react";

import AddToCartButton from "../../components/Buttons/AddToCartButton";
import AddToWishList from "../../components/Buttons/AddToWishList";

const formatPrice = (amount) =>
  `KSh ${Number(amount || 0).toLocaleString("en-KE")}`;

const makePlaceholder = (name, index = 0) => {
  const backgrounds = ["#f4f1ec", "#eeeff5", "#eaf1ed", "#f6eee8"];
  const background = backgrounds[index % backgrounds.length];

  const safeName = String(name || "Product")
    .replace(/[<>&"']/g, "")
    .slice(0, 28);

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg"
      width="800" height="800" viewBox="0 0 800 800">
      <rect width="800" height="800" fill="${background}"/>
      <circle cx="400" cy="330" r="190" fill="#ffffff" opacity=".65"/>
      <g fill="none" stroke="#a3a3a3" stroke-width="10"
        stroke-linecap="round" stroke-linejoin="round">
        <rect x="300" y="235" width="200" height="220" rx="25"/>
        <path d="M350 235v-25a50 50 0 0 1 100 0v25"/>
        <path d="M360 320h80"/>
        <path d="M360 360h80"/>
      </g>
      <text x="400" y="540" font-family="Arial,sans-serif"
        font-size="27" fill="#525252" text-anchor="middle">
        ${safeName}
      </text>
      <text x="400" y="580" font-family="Arial,sans-serif"
        font-size="18" fill="#888888" text-anchor="middle">
        Image unavailable
      </text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const getImageUrl = (item) => {
  if (typeof item === "string") return item.trim();

  if (item && typeof item === "object") {
    const value = item.url || item.image || item.src || item.href;
    return typeof value === "string" ? value.trim() : "";
  }

  return "";
};

function OrderDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [activeImage, setActiveImage] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);

  const galleryImages = useMemo(() => {
    if (!product) return [];

    const candidates = [
      ...(Array.isArray(product.images) ? product.images : []),
      ...(Array.isArray(product.gallery) ? product.gallery : []),
      ...(Array.isArray(product.imageUrls) ? product.imageUrls : []),
      product.image,
    ];

    const images = candidates
      .map(getImageUrl)
      .filter((url) => {
        if (!url) return false;
        if (/^\s*javascript:/i.test(url)) return false;
        return true;
      });

    const uniqueImages = [...new Set(images)];

    // Show one honest placeholder if no product image exists.
    // Never duplicate an image just to fill the gallery.
    return uniqueImages.length
      ? uniqueImages
      : [makePlaceholder(product.name)];
  }, [product]);

  const price = Number(product?.price) || 0;
  const oldPrice = Number(product?.oldPrice) || 0;
  const discount = Number(product?.discount) || 0;
  const stock = Number(product?.stock);

  const hasOldPrice = oldPrice > price;
  const outOfStock = Number.isFinite(stock) && stock <= 0;

  const changeImage = (direction) => {
    setActiveImage((current) => {
      const total = galleryImages.length;
      if (!total) return 0;
      return (current + direction + total) % total;
    });
  };

  const handleBuyNow = () => {
    if (outOfStock) return;

    navigate("/checkout", {
      state: { product },
    });
  };

  const handleImageError = (event, index) => {
    const image = event.currentTarget;

    if (image.dataset.fallbackApplied === "true") return;

    image.dataset.fallbackApplied = "true";
    image.src = makePlaceholder(product?.name, index);
  };

  useEffect(() => {
    if (!galleryOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setGalleryOpen(false);
      if (event.key === "ArrowLeft") changeImage(-1);
      if (event.key === "ArrowRight") changeImage(1);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [galleryOpen, galleryImages.length]);

  useEffect(() => {
    setActiveImage(0);
    setGalleryOpen(false);
  }, [product]);

  if (!product) {
    return (
      <main className="flex min-h-[75vh] items-center justify-center bg-[#f7f7f5] px-5">
        <div className="w-full max-w-md rounded-3xl border border-gray-200/70 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
            <ShoppingBag size={28} className="text-gray-700" />
          </div>

          <h1 className="mt-5 text-2xl font-bold tracking-tight text-gray-900">
            Nothing to show yet
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Choose a product from the store to see its details, images and
            available purchase options.
          </p>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-gray-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            <ArrowLeft size={16} />
            Return to store
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f8f6] pb-12 text-gray-900">
      {/* Page background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-white via-white/60 to-transparent" />

      <div className="relative mx-auto max-w-[1440px] px-4 pt-5 sm:px-7 sm:pt-7 lg:px-10 lg:pt-9">
        {/* Navigation */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="group inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 shadow-sm transition hover:border-gray-400 hover:text-gray-950"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            <span>Back to shopping</span>
          </button>

          <nav
            aria-label="Breadcrumb"
            className="hidden min-w-0 items-center gap-2 text-xs text-gray-400 sm:flex"
          >
            <button
              type="button"
              onClick={() => navigate("/")}
              className="transition hover:text-gray-900"
            >
              Home
            </button>
            <span>/</span>
            <span>Shop</span>
            <span>/</span>
            <span className="max-w-48 truncate font-medium text-gray-800">
              {product.name}
            </span>
          </nav>
        </div>

        {/* Product layout */}
        <div className="overflow-hidden rounded-[24px] border border-gray-200/70 bg-white shadow-[0_20px_70px_-45px_rgba(0,0,0,0.25)] sm:rounded-[30px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr]">
            {/* LEFT: IMAGE GALLERY */}
            <section className="min-w-0 border-b border-gray-100 p-4 sm:p-7 lg:border-b-0 lg:border-r lg:p-8 xl:p-10">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                    Product showcase
                  </p>
                  <h2 className="mt-1 text-sm font-semibold text-gray-900">
                    Explore the details
                  </h2>
                </div>

                <span className="inline-flex items-center gap-2 rounded-full border border-gray-100 bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-600">
                  <ImageIcon size={14} />
                  {String(activeImage + 1).padStart(2, "0")}
                  <span className="text-gray-300">/</span>
                  {String(galleryImages.length).padStart(2, "0")}
                </span>
              </div>

              {/* Main image */}
              <div className="group/stage relative isolate overflow-hidden rounded-[20px] bg-[#f5f4f1] sm:rounded-[26px]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.35)_50%,rgba(236,234,229,0.1)_100%)]" />

                {/* Image labels */}
                <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-2 sm:left-5 sm:top-5">
                  <span className="rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-gray-700 shadow-sm backdrop-blur">
                    SokoPoa
                  </span>

                  {hasOldPrice && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm">
                      <Tag size={11} />
                      {discount > 0
                        ? `Save ${discount}%`
                        : `${Math.round(((oldPrice - price) / oldPrice) * 100)}% off`}
                    </span>
                  )}
                </div>

                <div className="relative flex aspect-square max-h-[620px] items-center justify-center p-5 sm:p-8 lg:p-7 xl:p-10">
                  <img
                    key={galleryImages[activeImage]}
                    src={galleryImages[activeImage]}
                    alt={`${product.name} — image ${activeImage + 1}`}
                    onError={(event) => handleImageError(event, activeImage)}
                    onClick={() => setGalleryOpen(true)}
                    draggable="false"
                    className="relative z-[1] h-full w-full cursor-zoom-in object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,0.06)] transition-transform duration-500 ease-out group-hover/stage:scale-[1.025]"
                  />
                </div>

                {/* Expand image */}
                <button
                  type="button"
                  onClick={() => setGalleryOpen(true)}
                  aria-label="Expand product image"
                  className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/90 px-3.5 py-2.5 text-xs font-semibold text-gray-700 shadow-sm backdrop-blur transition hover:bg-gray-950 hover:text-white sm:bottom-5 sm:right-5"
                >
                  <ZoomIn size={15} />
                  <span>View larger</span>
                </button>

                {/* Previous / next controls */}
                {galleryImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => changeImage(-1)}
                      aria-label="Previous product image"
                      className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/90 text-gray-800 shadow-sm backdrop-blur transition hover:scale-105 hover:bg-gray-950 hover:text-white sm:left-4 sm:h-11 sm:w-11"
                    >
                      <ChevronLeft size={21} />
                    </button>

                    <button
                      type="button"
                      onClick={() => changeImage(1)}
                      aria-label="Next product image"
                      className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/90 text-gray-800 shadow-sm backdrop-blur transition hover:scale-105 hover:bg-gray-950 hover:text-white sm:right-4 sm:h-11 sm:w-11"
                    >
                      <ChevronRight size={21} />
                    </button>
                  </>
                )}
              </div>

              {/* Actual product images */}
              {galleryImages.length > 1 && (
                <div className="mt-5">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-xs font-bold text-gray-800">
                      More views
                    </p>
                    <p className="text-[11px] text-gray-400">
                      Select an image
                    </p>
                  </div>

                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {galleryImages.map((image, index) => (
                      <button
                        type="button"
                        key={`${image}-${index}`}
                        onClick={() => setActiveImage(index)}
                        aria-label={`View product image ${index + 1}`}
                        aria-pressed={activeImage === index}
                        className={`group/thumb relative h-[68px] w-[68px] flex-shrink-0 overflow-hidden rounded-xl border bg-[#f7f6f3] p-1.5 transition sm:h-[82px] sm:w-[82px] ${
                          activeImage === index
                            ? "border-gray-950 ring-2 ring-gray-950/10"
                            : "border-gray-100 hover:border-gray-400"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} thumbnail ${index + 1}`}
                          onError={(event) => handleImageError(event, index)}
                          draggable="false"
                          className="h-full w-full rounded-lg object-contain transition-transform duration-300 group-hover/thumb:scale-105"
                        />

                        {activeImage === index && (
                          <span className="absolute bottom-1 left-1/2 h-1 w-5 -translate-x-1/2 rounded-full bg-gray-950" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trust information */}
              <div className="mt-5 grid grid-cols-2 gap-3 border-t border-gray-100 pt-5">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gray-50">
                    <ShieldCheck size={18} className="text-gray-700" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">
                      Shop confidently
                    </p>
                    <p className="mt-1 text-[10px] text-gray-400">
                      Transparent pricing
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gray-50">
                    <Truck size={18} className="text-gray-700" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">
                      Delivery options
                    </p>
                    <p className="mt-1 text-[10px] text-gray-400">
                      Confirm at checkout
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* RIGHT: PRODUCT INFORMATION */}
            <section className="flex min-w-0 flex-col p-5 sm:p-8 lg:p-8 xl:p-10">
              {/* Product heading */}
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
                    <Sparkles size={13} />
                    Product details
                  </div>

                  <h1 className="mt-3 break-words text-[26px] font-bold leading-[1.16] tracking-[-0.045em] text-gray-950 sm:text-3xl xl:text-[36px]">
                    {product.name}
                  </h1>

                  {(product.category || product.brand) && (
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      {product.brand && (
                        <span className="text-xs font-medium text-gray-500">
                          {product.brand}
                        </span>
                      )}

                      {product.brand && product.category && (
                        <span className="text-gray-300">·</span>
                      )}

                      {product.category && (
                        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-medium text-gray-600">
                          {product.category}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex flex-shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white p-1.5 transition hover:border-gray-300 hover:shadow-sm">
                  <AddToWishList productDetails={product} />
                </div>
              </div>

              {/* Description */}
              <div className="mt-4">
                <p className="text-sm leading-6 text-gray-500">
                  {product.description ||
                    "Explore the details of this product and choose the purchase option that works for you."}
                </p>
              </div>

              {/* Price */}
              <div className="mt-6 rounded-2xl border border-gray-100 bg-[#fafaf9] p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.17em] text-gray-400">
                    Price
                  </span>

                  {hasOldPrice && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                      <Tag size={12} />
                      Special price
                    </span>
                  )}
                </div>

                <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-2">
                  <span className="text-[32px] font-bold leading-none tracking-[-0.05em] text-gray-950 sm:text-[40px]">
                    {formatPrice(price)}
                  </span>

                  {hasOldPrice && (
                    <span className="text-sm font-medium text-gray-400 line-through">
                      {formatPrice(oldPrice)}
                    </span>
                  )}
                </div>

                {hasOldPrice && (
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-100/70 px-2.5 py-1.5 text-xs font-semibold text-emerald-800">
                      <Check size={13} />
                      Save {formatPrice(oldPrice - price)}
                    </span>

                    <span className="text-xs text-gray-500">
                      {discount > 0
                        ? `${discount}% off the original price`
                        : "Reduced from the original price"}
                    </span>
                  </div>
                )}
              </div>

              {/* Availability */}
              <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-gray-100 px-4 py-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gray-50">
                    <Package size={20} className="text-gray-700" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900">
                      Availability
                    </p>

                    <p
                      className={`mt-1 text-xs ${
                        outOfStock ? "text-red-600" : "text-gray-500"
                      }`}
                    >
                      {outOfStock
                        ? "Currently unavailable"
                        : Number.isFinite(stock)
                          ? `${stock} available in stock`
                          : "Availability confirmed at checkout"}
                    </p>
                  </div>
                </div>

                <span
                  className={`h-2.5 w-2.5 flex-shrink-0 rounded-full ring-4 ${
                    outOfStock
                      ? "bg-red-500 ring-red-50"
                      : "bg-emerald-500 ring-emerald-50"
                  }`}
                />
              </div>

              {/* Wishlist information */}
              <div className="mt-4 flex items-center gap-3 rounded-2xl bg-[#f7f6f3] p-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                  <Heart size={18} className="text-gray-700" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-bold text-gray-900">
                    Saving it for later?
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Use the heart icon to add this product to your wishlist.
                  </p>
                </div>
              </div>

              {/* Purchase actions */}
              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={handleBuyNow}
                  disabled={outOfStock}
                  className="group flex w-full items-center justify-between gap-3 rounded-2xl bg-gray-950 px-4 py-4 text-sm font-semibold text-white shadow-[0_8px_24px_-12px_rgba(0,0,0,0.45)] transition duration-200 hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-lg active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none sm:px-5"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <ShoppingBag size={18} />
                    </span>

                    <span className="text-left">
                      <span className="block">
                        {outOfStock ? "Out of stock" : "Buy it now"}
                      </span>

                      {!outOfStock && (
                        <span className="mt-0.5 block text-[11px] font-normal text-white/60">
                          Proceed directly to checkout
                        </span>
                      )}
                    </span>
                  </span>

                  {!outOfStock && (
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 transition-transform duration-200 group-hover:translate-x-1">
                      <ArrowRight size={18} />
                    </span>
                  )}
                </button>

                <div
                  className={`rounded-2xl border border-gray-200 bg-white p-2 transition hover:border-gray-300 ${
                    outOfStock ? "pointer-events-none opacity-50" : ""
                  }`}
                >
                  <AddToCartButton product={product} />
                </div>

                <p className="flex items-center justify-center gap-2 pt-1 text-[11px] text-gray-400">
                  <ShieldCheck size={14} />
                  Secure shopping · Review your order before payment
                </p>
              </div>

              {/* Checkout information */}
              <div className="mt-5 flex items-start gap-2.5 border-t border-gray-100 pt-5">
                <ShieldCheck
                  size={17}
                  className="mt-0.5 flex-shrink-0 text-gray-400"
                />

                <p className="text-[11px] leading-5 text-gray-500">
                  Review your order details and applicable delivery charges
                  during checkout before confirming your purchase.
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-7 flex flex-col items-center justify-between gap-3 px-2 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-gray-800">
              SOKOPOA
            </p>
            <p className="mt-1 text-[11px] text-gray-400">
              A better way to discover what you love.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 transition hover:text-gray-950"
          >
            Continue exploring
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* FULL-SCREEN IMAGE VIEWER */}
      {galleryOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#111111]/95 p-4 backdrop-blur-md sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Product image viewer"
          onClick={() => setGalleryOpen(false)}
        >
          {/* Viewer header */}
          <div className="absolute left-4 top-4 flex max-w-[70%] items-center gap-3 text-white sm:left-8 sm:top-7">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/10">
              <ShoppingBag size={18} />
            </div>

            <div className="min-w-0">
              <p className="truncate text-xs font-semibold sm:text-sm">
                {product.name}
              </p>
              <p className="mt-0.5 text-[10px] text-white/50">
                Image {activeImage + 1} of {galleryImages.length}
              </p>
            </div>
          </div>

          {/* Close */}
          <button
            type="button"
            onClick={() => setGalleryOpen(false)}
            aria-label="Close image viewer"
            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-8 sm:top-7 sm:h-11 sm:w-11"
          >
            <X size={21} />
          </button>

          {/* Previous */}
          {galleryImages.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                changeImage(-1);
              }}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition hover:bg-white/20 sm:left-8 sm:h-12 sm:w-12"
            >
              <ChevronLeft size={25} />
            </button>
          )}

          {/* Large image */}
          <img
            key={`viewer-${galleryImages[activeImage]}`}
            src={galleryImages[activeImage]}
            alt={`${product.name} — image ${activeImage + 1}`}
            onError={(event) => handleImageError(event, activeImage)}
            onClick={(event) => event.stopPropagation()}
            draggable="false"
            className="max-h-[72vh] max-w-full select-none object-contain drop-shadow-2xl"
          />

          {/* Next */}
          {galleryImages.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                changeImage(1);
              }}
              aria-label="Next image"
              className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition hover:bg-white/20 sm:right-8 sm:h-12 sm:w-12"
            >
              <ChevronRight size={25} />
            </button>
          )}

          {/* Image counter */}
          <div className="absolute bottom-[94px] rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-medium text-white/80 sm:bottom-[104px]">
            {String(activeImage + 1).padStart(2, "0")}
            <span className="mx-2 text-white/30">/</span>
            {String(galleryImages.length).padStart(2, "0")}
          </div>

          {/* Thumbnail navigation */}
          {galleryImages.length > 1 && (
            <div
              className="absolute bottom-5 flex max-w-[92vw] gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-black/30 p-2 backdrop-blur-md"
              onClick={(event) => event.stopPropagation()}
            >
              {galleryImages.map((image, index) => (
                <button
                  type="button"
                  key={`viewer-${image}-${index}`}
                  onClick={() => setActiveImage(index)}
                  aria-label={`Select image ${index + 1}`}
                  aria-pressed={activeImage === index}
                  className={`h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl border-2 bg-white/5 p-0.5 transition sm:h-14 sm:w-14 ${
                    activeImage === index
                      ? "border-white"
                      : "border-white/10 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={image}
                    alt=""
                    onError={(event) => handleImageError(event, index)}
                    className="h-full w-full rounded-lg object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
}

export default OrderDetails;
