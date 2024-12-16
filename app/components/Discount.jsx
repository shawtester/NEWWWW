export default function OffersPage() {
    const images = [
      { src: "/Gym_Bag_Offer_Banner.jpg", alt: "Gym Bag Offer" },
      { src: "/UPI_Banner.jpg", alt: "UPI Payment Offer" },
      { src: "/Homepage__Deal-of-the-day__02_aea49964-504b-41a3-9e3f-7f56d2de6755.jpg", alt: "Winter Special Offer" },
    ];
  
    return (
      <div className="flex flex-col items-center py-10 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Handpicked Offers</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-5">
          {images.map((image, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
  