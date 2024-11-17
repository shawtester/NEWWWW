"use client";

import { useState, useEffect } from "react";
import { getBrand } from "@/lib/firestore/brands/read_server";
import { getCategory } from "@/lib/firestore/categories/read_server";
import Link from "next/link";
import AddToCartButton from "@/app/components/AddToCartButton"; // Import the AddToCartButton component
import AuthContextProvider from "@/context/AuthContext"; // Wrap it with AuthContextProvider if needed

export default function Details({ product }) {
  console.log(product?.flavors[0]

  );
  
  const [selectedWeight, setSelectedWeight] = useState(product?.weights[0]);
  const [selectedFlavor, setSelectedFlavor] = useState(product?.flavors[0]); // Add flavor state
  const [price, setPrice] = useState(product?.weights[0]?.salePrice || product?.weights[0]?.price);

  useEffect(() => {
    // Update price when the selected weight or flavor changes
    if (selectedWeight) {
      setPrice(selectedWeight.salePrice || selectedWeight.price);
    }
  }, [selectedWeight, selectedFlavor]); // Dependency includes selectedFlavor

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex gap-3">
        <Category categoryId={product?.categoryId} />
        <Brand brandId={product?.brandId} />
      </div>
      <h1 className="font-semibold text-xl md:text-4xl">{product?.title}</h1>
      <h2 className="text-gray-600 text-sm line-clamp-3 md:line-clamp-4">
        {product?.shortDescription}
      </h2>
      <div className="flex gap-3 items-center mt-3">
        <h3 className="text-green-500 font-bold text-lg">
          ₹ {price}{" "}
          {selectedWeight?.salePrice && (
            <span className="line-through text-gray-700 text-sm">
              ₹ {selectedWeight?.price}
            </span>
          )}
        </h3>

        {/* Weight Selection */}
        <div className="flex items-center gap-3">
          <label htmlFor="weight-select" className="text-sm font-semibold">Select Weight:</label>
          <select
            id="weight-select"
            className="border rounded-md p-2"
            value={selectedWeight?.weight}
            onChange={(e) => {
              const weight = product?.weights.find(w => w.weight === e.target.value);
              setSelectedWeight(weight);
            }}
          >
            {product?.weights.map((weightOption) => (
              <option key={weightOption.weight} value={weightOption.weight}>
                {weightOption.weight} kg
              </option>
            ))}
          </select>
        </div>

        {/* Flavor Selection */}
        <div className="flex items-center gap-3">
          <label htmlFor="flavor-select" className="text-sm font-semibold">Select Flavor:</label>
          <select
            id="flavor-select"
            className="border rounded-md p-2"
            value={selectedFlavor}
            onChange={(e) => setSelectedFlavor(e.target.value)}
          >
            {product?.flavors?.map((flavor) => (
              <option key={flavor.name} value={flavor.name}>
                {flavor.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-3">
        <AuthContextProvider>
          <AddToCartButton
            productId={product?.id}
            selectedWeight={selectedWeight}
            selectedFlavor={selectedFlavor} // Pass selected flavor
            price={price}
            salePrice={selectedWeight?.salePrice}
          />
        </AuthContextProvider>
      </div>

      {product?.stock <= (product?.orders ?? 0) && (
        <div className="flex">
          <h3 className="text-red-500 py-1 rounded-lg text-sm font-semibold">
            Out Of Stock
          </h3>
        </div>
      )}

      <div className="flex flex-col gap-2 py-2">
        <div
          className="text-gray-600"
          dangerouslySetInnerHTML={{ __html: product?.description ?? "" }}
        ></div>
      </div>
    </div>
  );
}

// Fetch category data in a client-side hook
function Category({ categoryId }) {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    async function fetchCategory() {
      const categoryData = await getCategory({ id: categoryId });
      setCategory(categoryData);
    }
    fetchCategory();
  }, [categoryId]);

  if (!category) return <div>Loading...</div>;

  return (
    <Link href={`/categories/${categoryId}`}>
      <div className="flex items-center gap-1 border px-3 py-1 rounded-full">
        <img className="h-4" src={category?.imageURL} alt={category?.name} />
        <h4 className="text-xs font-semibold">{category?.name}</h4>
      </div>
    </Link>
  );
}

// Fetch brand data in a client-side hook
function Brand({ brandId }) {
  const [brand, setBrand] = useState(null);

  useEffect(() => {
    async function fetchBrand() {
      const brandData = await getBrand({ id: brandId });
      setBrand(brandData);
    }
    fetchBrand();
  }, [brandId]);

  if (!brand) return <div>Loading...</div>;

  return (
    <div className="flex items-center gap-1 border px-3 py-1 rounded-full">
      <img className="h-4" src={brand?.imageURL} alt={brand?.name} />
      <h4 className="text-xs font-semibold">{brand?.name}</h4>
    </div>
  );
}
