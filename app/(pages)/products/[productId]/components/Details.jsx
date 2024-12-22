"use client";

import { useState, useEffect } from "react";
import { getBrand } from "@/lib/firestore/brands/read_server";
import { getCategory } from "@/lib/firestore/categories/read_server";
import Link from "next/link";
import AddToCartButton from "@/app/components/AddToCartButton";
import AuthContextProvider from "@/context/AuthContext";

export default function Details({ product }) {
  const [selectedWeight, setSelectedWeight] = useState(product?.weights[0]);
  const [selectedFlavor, setSelectedFlavor] = useState(product?.flavors[0]);
  const [price, setPrice] = useState(product?.weights[0]?.salePrice || product?.weights[0]?.price);
  const [imageList, setImageList] = useState(product?.weights[0]?.imageUrl || []);
  const [selectedImage, setSelectedImage] = useState(product?.weights[0]?.imageUrl?.[0]);

  const handleWeightChange = (weightOption) => {
    setSelectedWeight(weightOption);
    setImageList(weightOption.imageUrl);
    setSelectedImage(weightOption.imageUrl?.[0]);
  };

  const handleFlavorChange = (flavor) => {
    setSelectedFlavor(flavor);
  };

  useEffect(() => {
    if (selectedWeight) {
      setPrice(selectedWeight.salePrice || selectedWeight.price);
    }
  }, [selectedWeight]);

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Main Section with Image and Details */}
      <div className="flex flex-col md:flex-row gap-5">
        {/* Left Side (Main Image) */}
        <div className="w-full md:w-1/2 flex flex-col gap-3">
          {/* Main Product Image */}
          <div className="flex justify-center w-full">
            <img
              className="object-contain:cover h-[350px] md:h-[430px] w-full"
              src={selectedImage}
              alt="Main Product"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="flex gap-3 justify-center items-center">
            {imageList.map((image, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(image)}
                className={`w-[60px] h-[60px] border rounded p-2 cursor-pointer ${
                  image === selectedImage ? "border-blue-500" : "border-gray-300"
                }`}
              >
                <img className="object-cover w-full h-full" src={image} alt={`Thumbnail ${index}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side (Product Details) */}
        <div className="w-full md:w-1/2 flex flex-col gap-5">
          {/* Category and Brand Section */}
          <div className="flex gap-4 mt-5">
            <Category categoryId={product?.categoryId} />
            <Brand brandId={product?.brandId} />
          </div>

          {/* Product Title and Description */}
          <h1 className="font-semibold text-xl md:text-3xl">{product?.title}</h1>
          <h2 className="text-gray-600 text-sm line-clamp-3 md:line-clamp-4">
            {product?.shortDescription}
          </h2>

          {/* Price Section */}
          <div className="flex gap-3 items-center mt-3 bg-gradient-to-r from-indigo-200 via-indigo-100 to-indigo-50 p-4 rounded-lg shadow-lg">
            <div className="flex flex-col items-start">
              <h3 className="text-3xl font-bold text-green-500">
                ₹ {price}
                {selectedWeight?.salePrice && (
                  <>
                    <span className="text-lg line-through text-gray-600 ml-2">
                      ₹ {selectedWeight?.price}
                    </span>
                    <span className="text-sm text-yellow-500 bg-red-600 px-2 py-1 rounded-full ml-2">
                      {((1 - price / selectedWeight?.price) * 100).toFixed(0)}% OFF
                    </span>
                  </>
                )}
              </h3>
            </div>
          </div>

          {/* Weight and Flavor Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
            {/* Weight Selection */}
            <div className="flex flex-col gap-2 bg-indigo-50 p-4 rounded-lg shadow-sm">
              <label className="text-lg font-semibold text-gray-700">Select Weight:</label>
              <div className="flex gap-2 flex-wrap">
                {product?.weights.map((weightOption) => (
                  <button
                    key={weightOption.weight}
                    onClick={() => handleWeightChange(weightOption)}
                    className={`border-2 rounded-full px-5 py-2 text-lg font-semibold ${
                      selectedWeight?.weight === weightOption.weight
                        ? "bg-indigo-600 text-white shadow-lg scale-105"
                        : "bg-gray-100 text-indigo-600 hover:bg-indigo-500 hover:text-white"
                    }`}
                  >
                    {weightOption.weight} kg
                  </button>
                ))}
              </div>
            </div>

            {/* Flavor Selection */}
            <div className="flex flex-col gap-2 bg-teal-50 p-4 rounded-lg shadow-sm">
              {product?.flavors?.length > 0 && (
                <div className="flex flex-col gap-2">
                  <label className="text-lg font-semibold text-gray-700">Flavor:</label>
                  <div className="flex gap-2 flex-wrap">
                    {product.flavors.map((flavor) => (
                      <button
                        key={flavor.name}
                        onClick={() => handleFlavorChange(flavor)}
                        className={`border-2 rounded-full px-5 py-2 text-lg font-semibold ${
                          selectedFlavor?.name === flavor.name
                            ? "bg-teal-600 text-white shadow-lg scale-105"
                            : "bg-gray-100 text-teal-600 hover:bg-teal-500 hover:text-white"
                        }`}
                      >
                        {flavor.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="flex items-center gap-4 w-full mt-4">
            <AuthContextProvider>
              <AddToCartButton
                productId={product?.id}
                selectedWeight={selectedWeight}
                selectedFlavor={selectedFlavor}
                price={selectedWeight?.price}
                salePrice={selectedWeight?.salePrice}
              />
            </AuthContextProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

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
      <div className="flex items-center gap-3 border-2 border-indigo-300 bg-indigo-50 px-4 py-2 rounded-full shadow-md">
        <img className="h-8 w-8 rounded-full" src={category?.imageURL} alt={category?.name} />
        <h4 className="text-lg font-semibold text-indigo-800">{category?.name}</h4>
      </div>
    </Link>
  );
}

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
    <div className="flex items-center gap-3 border-2 border-teal-300 bg-teal-50 px-4 py-2 rounded-full shadow-md">
      <img className="h-8 w-8 rounded-full" src={brand?.imageURL} alt={brand?.name} />
      <h4 className="text-lg font-semibold text-teal-800">{brand?.name}</h4>
    </div>
  );
}
