"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";
import AuthContextProvider from "@/context/AuthContext";
import AddToCartButton from "./AddToCartButton";
import MyRating from "./MyRating";
import { getProductReviewCounts } from "@/lib/firestore/products/count/read";
import { Suspense } from "react";
import moment from "moment";

import crypto from "crypto";

// Utility function to generate a deterministic hash for product ID
function getDeterministicBadge(productId) {
  const badges = [
    { src: "/Trending.gif", alt: "Trending" },
    { src: "/Bestseller.gif", alt: "Bestseller" },
  ];
  
  // Generate a hash from the product ID
  const hash = crypto.createHash("md5").update(productId).digest("hex");
  
  // Use the last character's hex value to select the badge
  const index = parseInt(hash.slice(-1), 16) % badges.length;
  return badges[index];
}





function RatingReview({ product }) {
  const [counts, setCounts] = useState(null);

  useEffect(() => {
    const fetchReviewCounts = async () => {
      try {
        const data = await getProductReviewCounts({ productId: product?.id });
        setCounts(data);
      } catch (error) {
        console.error("Error fetching review counts:", error);
      }
    };

    if (product?.id) {
      fetchReviewCounts();
    }
  }, [product?.id]);

  if (!counts) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex gap-3 items-center">
      <MyRating value={counts?.averageRating ?? 0} />
      <h1 className="text-xs text-gray-400">
        <span>{counts?.averageRating?.toFixed(1)}</span> ({counts?.totalReviews})
      </h1>
    </div>
  );
}

export default function ProductsGridView({ products }) {
  return (
    <section className="w-full flex justify-center">
      <div className="flex flex-col gap-5 max-w-[900px] p-5">
        <h1 className="text-center font-semibold text-lg">Products</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {products?.map((item) => (
            <ProductCard product={item} key={item?.id} />
          ))}
        </div>
      </div>
    </section>
  );
}





export function ProductCard({ product }) {
  const [currentImage, setCurrentImage] = useState(product?.imageList[0]);
  const [imageIndex, setImageIndex] = useState(0);
  const [selectedWeight, setSelectedWeight] = useState(product?.weights?.[0]);
  const [selectedFlavor, setSelectedFlavor] = useState(product?.flavors?.[0]);

  // Random badge selection
  const badge = getDeterministicBadge(product?.id || "default");

  // Hover logic to cycle images
  const handleImageHover = () => {
    const nextIndex = (imageIndex + 1) % product?.imageList.length;
    setImageIndex(nextIndex);
    setCurrentImage(product?.imageList[nextIndex]);
  };

  // Click logic to cycle images
  const handleImageClick = () => {
    const nextIndex = (imageIndex + 1) % product?.imageList.length;
    setImageIndex(nextIndex);
    setCurrentImage(product?.imageList[nextIndex]);
  };

  // Handle weight selection
  const handleWeightChange = (e) => {
    const weight = product.weights.find((w) => w.weight === e.target.value);
    setSelectedWeight(weight);
  };

  return (
    <div
      className="flex flex-col gap-4 border p-5 rounded-lg hover:shadow-xl transition-shadow duration-300 relative bg-white"
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      {/* Product Badge */}
      <div className="absolute top-1 left-1 z-10">
        <img src={badge.src} alt={badge.alt} className="w-20" />
      </div>

      {/* Product Image */}
      <div
        className="relative w-full border border-gray-300 rounded-lg overflow-hidden hover:border-blue-500 transition duration-300 shadow-sm cursor-pointer"
        onMouseEnter={handleImageHover} // Change image on hover
        onClick={handleImageClick} // Keep the click functionality
      >
        <img
          src={currentImage}
          className="h-52 w-full object-contain transform transition-transform duration-300 hover:scale-105"
          alt={product?.title}
        />
        <div className="absolute top-1 right-1">
          <AuthContextProvider>
            <FavoriteButton productId={product?.id} />
          </AuthContextProvider>
        </div>
      </div>

      {/* Product Title */}
      <Link href={`/products/${product?.id}`}>
        <h1 className="font-bold text-gray-800 text-lg line-clamp-2 leading-tight hover:text-blue-600 transition-colors">
          {product?.title}
        </h1>
      </Link>

      {/* Rating and Reviews */}
      <RatingReview product={product} />

      {/* Flavor and Weight Selectors */}
      <div className="flex justify-between gap-4">
        {/* Flavor Selector */}
        {product?.flavors?.length > 0 && (
          <div className="flex flex-col gap-1 w-1/2">
            <label
              htmlFor="flavors"
              className="text-sm font-medium text-gray-700"
            >
              Flavor:
            </label>
            <select
              id="flavors"
              value={selectedFlavor?.name}
              onChange={(e) =>
                setSelectedFlavor(
                  product.flavors.find((f) => f.name === e.target.value)
                )
              }
              className="border rounded-md px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {product.flavors.map((flavor) => (
                <option key={flavor.name} value={flavor.name}>
                  {flavor.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Weight Selector */}
        {selectedWeight && (
          <div className="flex flex-col gap-1 w-1/2">
            <label
              htmlFor="weights"
              className="text-sm font-medium text-gray-700"
            >
              Weight:
            </label>
            <select
              id="weights"
              value={selectedWeight?.weight}
              onChange={handleWeightChange}
              className="border rounded-md px-2 py-1 text-sm text-gray-700 focus:ring-2 focus:ring-blue-400"
            >
              {product.weights.map((weight) => (
                <option key={weight.weight} value={weight.weight}>
                  {weight.weight}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Price */}
      {selectedWeight && (
        <h2 className="text-green-600 text-lg font-bold mt-2">
          ₹ {selectedWeight?.salePrice}{" "}
          <span className="line-through text-gray-400">
            ₹ {selectedWeight?.price}
          </span>
        </h2>
      )}

      {/* Stock Status */}
      <div className="text-sm mt-1">
        {product?.isInStock ? (
          <span className="text-green-500 font-semibold">In Stock</span>
        ) : (
          <span className="text-red-500 font-semibold">Out of Stock</span>
        )}
      </div>

      {/* Add To Cart */}
      <div className="mt-auto flex items-center justify-center gap-2 bg-blue-50 p-3 rounded-md">
        <span className="text-blue-700 font-semibold text-sm">ADD TO CART</span>
        <AuthContextProvider>
          <AddToCartButton
            productId={product?.id}
            selectedWeight={selectedWeight}
            selectedFlavor={selectedFlavor}
          />
        </AuthContextProvider>
      </div>
    </div>
  );
}