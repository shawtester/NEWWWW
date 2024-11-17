"use client";

import Link from "next/link";
import { getProductReviewCounts } from "@/lib/firestore/products/count/read";
import { useEffect, useState } from "react";
import FavoriteButton from "./FavoriteButton";
import AuthContextProvider from "@/context/AuthContext";

import AddToCartButton from "./AddToCartButton";

export default function ProductsGridView({ products }) {
  // Fetch product review counts for each product in a useEffect
  const [reviewCounts, setReviewCounts] = useState({});

  useEffect(() => {
    async function fetchReviewCounts() {
      const counts = {};
      for (const product of products) {
        counts[product.id] = await getProductReviewCounts({ productId: product.id });
      }
      setReviewCounts(counts);
    }

    fetchReviewCounts();
  }, [products]);

  return (
    <section className="w-full flex justify-center  ">
      <div className="flex flex-col gap-5 max-w-[900px] p-5">
        <h1 className="text-center font-semibold text-lg">Products</h1>
        {/* Updated grid layout for 2 products per row on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-5">
          {products?.map((item) => (
            <ProductCard product={item} key={item?.id} reviewCounts={reviewCounts[item.id]} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductCard({ product, reviewCounts }) {
  // State for selected weight and flavor
  const [selectedWeight, setSelectedWeight] = useState(product?.weights?.[0]);
  const [selectedFlavor, setSelectedFlavor] = useState(product?.flavors?.[0]);

  // Handle weight selection change
  const handleWeightChange = (event) => {
    const weight = product.weights.find((w) => w.weight === event.target.value);
    setSelectedWeight(weight);
  };

  // Handle flavor selection change
  const handleFlavorChange = (event) => {
    const flavor = product.flavors.find((f) => f.name === event.target.value);
    setSelectedFlavor(flavor);
  };

  return (
    
   

    

  
    <div className="flex flex-col gap-3 border p-4 rounded-lg">
      <AuthContextProvider>
      <FavoriteButton productId={product?.id} />

      </AuthContextProvider>

    
      <div className="relative w-full">
        <img
          src={product?.featureImageURL || product?.imageList?.[0]}
          className="rounded-lg h-48 w-full object-cover"
          alt={product?.title}
        />
      </div>
     
      <Link href={`/products/${product?.id}`}>
        <h1 className="font-semibold line-clamp-2 text-sm">{product?.title}</h1>
      </Link>
      <div className="text-xs text-gray-500">

        {product?.flavors?.length > 0 && (
          <div className="flex gap-2 items-center mt-2">
            <label htmlFor="flavors" className="text-xs">
              Flavor:
            </label>
            <select
              id="flavors"
              value={selectedFlavor?.name}
              onChange={handleFlavorChange}
              className="border px-2 py-1 rounded text-xs"
            >
              {product.flavors.map((flavor) => (
                <option key={flavor.name} value={flavor.name}>
                  {flavor.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      {selectedWeight && (
        <div className="mt-2">
          <div className="flex gap-2 items-center">
            <label htmlFor="weights" className="text-xs">
              Weight:
            </label>
            <select
              id="weights"
              value={selectedWeight?.weight}
              onChange={handleWeightChange}
              className="border px-2 py-1 rounded text-xs"
            >
              {product.weights.map((weight) => (
                <option key={weight.weight} value={weight.weight}>
                  {weight.weight}
                </option>
              ))}
            </select>
          </div>
          <h2 className="text-green-500 text-sm font-semibold mt-2">
            ₹ {selectedWeight?.salePrice}{" "}
            <span className="line-through text-xs text-gray-600">
              ₹ {selectedWeight?.price}
            </span>
          </h2>
        </div>
      )}
      <p className="text-xs text-gray-500 line-clamp-2">
        {product?.shortDescription}
      </p>
      <RatingReview counts={reviewCounts} />
      {product?.isInStock <= (product?.orders ?? 0) && (
        <div className="flex">
          <h3 className="text-red-500 rounded-lg text-xs font-semibold">
            Out Of Stock
          </h3>
        </div>
      )}
      <div className="flex items-center gap-4 w-full">
        <div className="w-full">
         
        </div>
        
        <AuthContextProvider>
          <AddToCartButton
productId={product?.id}
selectedWeight={selectedWeight}
selectedFlavor={selectedFlavor}
 price={selectedWeight?.price}
salePrice={selectedWeight?.salePrice} />
        </AuthContextProvider>
      </div>
    </div>
  
  );

}

function RatingReview({ counts }) {
  return (
    <div className="flex gap-3 items-center">
      <h1 className="text-xs text-gray-400">
        <span>{counts?.averageRating?.toFixed(1)}</span> ({counts?.totalReviews})
      </h1>
    </div>
  );
}
