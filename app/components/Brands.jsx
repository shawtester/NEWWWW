"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Brands({ brands }) {
  const settings = {
    dots: true,
    infinite: brands.length > 4, // Enable infinite scrolling only if more than 4 items
    speed: 500,
    slidesToShow: 4, // Show up to 4 items on larger screens
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: brands.length > 3,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Duplicate brands for small count cases
  const displayedBrands =
    brands.length < 3 ? [...brands, ...brands, ...brands].slice(0, 3) : brands;

  return (
    <div className="flex flex-col gap-8 justify-center overflow-hidden md:p-10 p-5 bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Section Title */}
      <h2 className="text-center text-3xl font-bold text-gray-800 mb-5">
        Featured Brands
      </h2>

      <Slider {...settings}>
        {displayedBrands.map((brand, index) => (
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
