"use client";

import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const reviews = [
  {
    id: 1,
    name: "Arjun Mehta",
    date: "November 10, 2024",
    rating: 5,
    comment:
      "Best whey protein I have used! It has improved my muscle recovery and tastes great too.",
    product: "Whey Protein",
  },
  {
    id: 2,
    name: "Priya Sharma",
    date: "November 8, 2024",
    rating: 4,
    comment:
      "I have tried many products, but this isolate protein blends perfectly and has helped in my weight management.",
    product: "Isolate Protein",
  },
  {
    id: 3,
    name: "Rajesh Gupta",
    date: "November 5, 2024",
    rating: 3,
    comment:
      "The flavor is good, and the results are decent, but the packaging could be improved.",
    product: "Whey Protein",
  },
  {
    id: 4,
    name: "Nisha Verma",
    date: "November 3, 2024",
    rating: 5,
    comment:
      "I love the isolate protein! Easy to digest and gives great results without bloating.",
    product: "Isolate Protein",
  },
];

export default function ReviewsPage() {
  const [displayedReviews, setDisplayedReviews] = useState([]);

  useEffect(() => {
    setDisplayedReviews(reviews);
  }, []);

  return (
    <div className="min-h-screen bg-white p-6 flex items-center justify-center">
      <div className="max-w-6xl w-full">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800 tracking-wide">
          What Our Customers Say
        </h1>

        {/* Review Slider */}
        {displayedReviews.length === 0 ? (
          <p className="text-center text-gray-500">No reviews available.</p>
        ) : (
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Pagination, Navigation]}
            breakpoints={{
              768: { slidesPerView: 2 }, // 2 slides for medium screens
              1024: { slidesPerView: 3 }, // 3 slides for large screens
            }}
            className="mySwiper"
          >
            {displayedReviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div
                  className="p-6 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 transition-transform transform hover:-translate-y-3 duration-300 ease-in-out bg-white"
                >
                  {/* Reviewer Info */}
                  <div className="flex flex-col items-center mb-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 text-white flex items-center justify-center font-semibold text-xl shadow-md">
                      {review.name.charAt(0)}
                    </div>
                    <h2 className="mt-2 text-lg font-semibold text-gray-800">
                      {review.name}
                    </h2>
                    <span className="text-xs text-gray-500">{review.date}</span>
                    <span className="text-sm italic text-blue-600 font-medium">
                      {review.product}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1 mb-3">
                    {Array(5)
                      .fill()
                      .map((_, i) => (
                        <FaStar
                          key={i}
                          className={`text-xl ${
                            i < review.rating
                              ? "text-yellow-400 scale-110"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                  </div>

                  {/* Comment */}
                  <p className="text-gray-700 text-center leading-relaxed">
                    {review.comment}
                  </p>

                  {/* Decorative Line */}
                  <div className="absolute top-2 left-2 w-8 h-1 bg-blue-400 rounded"></div>
                  <div className="absolute bottom-2 right-2 w-8 h-1 bg-pink-400 rounded"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}
