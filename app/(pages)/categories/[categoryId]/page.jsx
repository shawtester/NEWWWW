"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/app/components/Products";
import { getCategory } from "@/lib/firestore/categories/read_server";
import { getProductsByCategory } from "@/lib/firestore/products/read_server";
import React from "react";

export default function Page({ params }) {
  const categoryId = React.use(params).categoryId; // Unwrap params
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const categoryData = await getCategory({ id: categoryId });
        const productsData = await getProductsByCategory({ categoryId });

        if (categoryData && productsData) {
          setCategory(categoryData);
          setProducts(productsData);
        } else {
          // Handle case where data is not found
          console.error("Category or products not found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [categoryId]);

  if (loading) {
    return (
      <main className="flex justify-center items-center h-screen bg-white">
        {/* Loader Component */}
        <div className="loading">
          <svg width="128px" height="96px">
            <polyline
              points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
              id="back"
            ></polyline>
            <polyline
              points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
              id="front"
            ></polyline>
          </svg>
        </div>

        {/* Inline CSS Loader Styles */}
        <style jsx>{`
          /* Loader Styles */
          .loading svg {
            width: 128px; /* Increased loader size */
            height: 96px;
            filter: drop-shadow(0px 0px 8px rgba(255, 77, 79, 0.8)); /* Added shadow effect */
          }

          .loading svg polyline {
            fill: none;
            stroke-width: 4; /* Slightly thicker stroke */
            stroke-linecap: round;
            stroke-linejoin: round;
          }

          .loading svg polyline#back {
            fill: none;
            stroke: #ff4d5033;
          }

          .loading svg polyline#front {
            fill: none;
            stroke: #ff4d4f;
            stroke-dasharray: 48, 144;
            stroke-dashoffset: 192;
            animation: dash_682 1.4s linear infinite;
          }

          @keyframes dash_682 {
            72.5% {
              opacity: 0;
            }
            to {
              stroke-dashoffset: 0;
            }
          }
        `}</style>
      </main>
    );
  }

  return (
    <main className="flex justify-center p-5 md:px-10 md:py-5 w-full">
      <div className="flex flex-col gap-6 max-w-[900px] p-5">
        <h1 className="text-center font-semibold text-4xl">{category.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-center gap-4 md:gap-5">
          {products?.map((item) => (
            <ProductCard product={item} key={item?.id} />
          ))}
        </div>
      </div>
    </main>
  );
}
