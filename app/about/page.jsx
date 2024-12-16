"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutUs() {
  return (
    <>
    <Header/>
  
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section
        className="relative h-[300px] md:h-[400px] flex items-center justify-center bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: "url('/about-banner.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-400 via-yellow-600 to-black opacity-60"></div>
        <h1 className="relative text-white text-4xl md:text-5xl font-bold uppercase tracking-wide text-center">
          About Us
        </h1>
      </section>

      {/* Introduction Section */}
      <section className="max-w-7xl mx-auto py-12 px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Who We Are
          </h2>
          <p className="text-gray-600 mt-4 leading-relaxed text-lg">
            At <span className="text-yellow-500 font-semibold">NutriBox</span>,
            we are dedicated to redefining health and nutrition. Our focus is to
            provide innovative, high-quality, and science-backed products that
            promote well-being and inspire healthier lives.
          </p>
        </div>

        {/* Mission and Vision */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-4 text-yellow-500">
              Our Mission
            </h3>
            <p className="text-gray-700 leading-relaxed">
              To make nutrition simple, accessible, and effective for everyone.
              By blending nature, science, and innovation, we strive to empower
              individuals to lead healthier, happier lives.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-4 text-yellow-500">
              Our Vision
            </h3>
            <p className="text-gray-700 leading-relaxed">
              To become the global leader in nutrition products, setting the
              standard for quality, trust, and results. We envision a future
              where good health is accessible to all.
            </p>
          </div>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Our Journey
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg max-w-3xl mx-auto">
            Starting with a passion for wellness and nutrition, we embarked on a
            mission to transform lives. Over the years, we have grown from a
            small venture to a trusted name in the health and nutrition
            industry. Our commitment to quality, integrity, and customer
            satisfaction has been the driving force behind our success.
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-12 bg-yellow-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-yellow-500 mb-4">
                Quality
              </h3>
              <p className="text-gray-700">
                We are committed to providing products of the highest quality,
                ensuring they meet rigorous standards for purity and efficacy.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-yellow-500 mb-4">
                Integrity
              </h3>
              <p className="text-gray-700">
                Honesty and transparency are at the core of our operations. We
                build trust through ethical practices and accountability.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-yellow-500 mb-4">
                Innovation
              </h3>
              <p className="text-gray-700">
                We embrace innovation to create solutions that cater to the
                evolving needs of our customers, blending science with nature.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="py-12 bg-gray-100">
        <div className="text-center max-w-6xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-900">
            Ready to Begin Your Health Journey?
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Join us at NutriBox and discover products designed to fuel your
            mind, body, and spirit. Let’s build a healthier future together.
          </p>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full font-semibold">
            Explore Our Products
          </button>
        </div>
      </section>
    </div>
    <Footer/>
    </>
  );
}
