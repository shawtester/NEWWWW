"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Slider from "react-slick";

export default function Categories({ categories }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Slider settings
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  if (categories.length === 0) {
    return <></>;
  }

  // Define a color palette for circular boxes
  const colorPalette = [
    "bg-red-200",
    "bg-blue-200",
    "bg-green-200",
    "bg-yellow-200",
    "bg-purple-200",
    "bg-pink-200",
    "bg-orange-200",
    "bg-teal-200",
    "bg-indigo-200",
    "bg-gray-200",
  ];

  // Handle category click
  const handleCategoryClick = async (categoryId) => {
    setIsLoading(true); // Show loading spinner
    try {
      await router.push(`/categories/${categoryId}`);
    } finally {
      setIsLoading(false); // Hide spinner after navigation
    }
  };

  return (
    <div className="flex flex-col gap-8 justify-center overflow-hidden md:p-10 p-5 bg-lightBluereen">
      <div className="flex justify-center w-full">
        <h1 className="text-lg font-semibold">Shop By Category</h1>
      </div>

      {/* Loader */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
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
        </div>
      )}

      <Slider {...settings}>
        {(categories?.length <= 2
          ? [...categories, ...categories, ...categories]
          : categories
        )?.map((category, index) => {
          // Pick a background color from the palette, cycling through if there are more categories than colors
          const bgColor = colorPalette[index % colorPalette.length];

          return (
            <div
              key={category?.id || `category-${index}`}
              onClick={() => handleCategoryClick(category?.id)}
              className="px-2 cursor-pointer"
            >
              <div className="flex flex-col gap-2 items-center justify-center hover:border-gray-400 hover:bg-gray-100 transition-all duration-300 ease-in-out border-2 border-gray-300 p-2 rounded-lg">
                {/* Circular Background with Dynamic Color */}
                <div
                  className={`md:h-32 md:w-32 h-24 w-24 rounded-full md:p-5 p-2 border-2 border-gray-300 overflow-hidden flex items-center justify-center ${bgColor}`}
                >
                  <img
                    src={category?.imageURL}
                    alt={category?.name || "Category"}
                    className="h-full w-full object-contain rounded-full"
                  />
                </div>
                <h1 className="font-semibold text-center">{category?.name}</h1>
              </div>
            </div>
          );
        })}
      </Slider>

      {/* CSS Styles for Loader */}
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
    </div>
  );
}
