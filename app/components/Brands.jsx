"use client";

import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Brands({ brands }) {
  const sliderRef = useRef(null);  // Ref for the slider

  const settings = {
    dots: false,
    infinite: true, // Infinite scrolling
    speed: 2200,
    slidesToShow: 4, // Show 4 items on large screens
    slidesToScroll: 1, // Scroll 1 item at a time
    autoplay: true,  // Enable autoplay for continuous scroll
    autoplaySpeed: 0,  // Set autoplay speed to 0 to make it continuous
    cssEase: "linear", // Linear easing for smooth transition
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3, // Show 3 items on medium screens
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2, // Show 2 items on smaller screens
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2, // Show 1 item on very small screens
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    // Manually trigger the slick slider to ensure infinite scroll
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.slickNext(); // Move to the next slide continuously
      }
    }, 2000); // Scroll every 2 seconds, adjust as needed

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="flex flex-col gap-8 justify-center overflow-hidden md:p-10 p-5 bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Section Title */}
      <h2 className="text-center text-3xl font-bold text-gray-800 mb-5">
        Featured Brands
      </h2>

      {/* Brand Slider */}
      <Slider {...settings} ref={sliderRef}>
        {brands.map((brand, index) => (
          <div className="px-2" key={`brand-${index}`}>
            <div className="flex flex-col items-center justify-center gap-4">
              {/* Brand Card */}
              <div className="h-28 w-full rounded-lg shadow-lg hover:shadow-xl border border-gray-200 bg-white overflow-hidden transition-transform duration-300 transform hover:scale-105">
                <img
                  className="h-full w-full object-contain p-4"
                  src={brand?.imageURL}
                  alt={`Brand ${index + 1}`}
                />
              </div>

              {/* Brand Title */}
              {brand?.title && (
                <p className="text-center text-base font-semibold text-gray-700">
                  {brand.title}
                </p>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
