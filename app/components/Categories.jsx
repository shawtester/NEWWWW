"use client";

import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";

export default function Categories({ categories }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // Slider settings
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4, slidesToScroll: 4, infinite: true },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 3, slidesToScroll: 3 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2, slidesToScroll: 2 },
      },
    ],
  };

  // Handle category click
  const handleCategoryClick = (categoryId) => {
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = `/categories/${categoryId}`;
      setIsLoading(false);
    }, 500);
  };

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

  return (
    <div
      ref={sectionRef}
      className={`transition-opacity transition-transform duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } flex flex-col gap-8 justify-center overflow-hidden md:p-10 p-5 bg-lightBluereen`}
    >
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
          const bgColor = colorPalette[index % colorPalette.length];

          return (
            <div
              key={category?.id || `category-${index}`}
              onClick={() => handleCategoryClick(category?.id)}
              className="px-2 cursor-pointer"
            >
              <div className="flex flex-col gap-2 items-center justify-center hover:border-gray-400 hover:bg-gray-100 transition-all duration-300 ease-in-out border-2 border-gray-300 p-2 rounded-lg">
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
        .loading svg {
          width: 128px;
          height: 96px;
          filter: drop-shadow(0px 0px 8px rgba(255, 77, 79, 0.8));
        }
        .loading svg polyline {
          fill: none;
          stroke-width: 4;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .loading svg polyline#back {
          stroke: #ff4d5033;
        }
        .loading svg polyline#front {
          stroke: #ff4d4f;
          stroke-dasharray: 48, 144;
          stroke-dashoffset: 192;
          animation: dash 1.4s linear infinite;
        }
        @keyframes dash {
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
