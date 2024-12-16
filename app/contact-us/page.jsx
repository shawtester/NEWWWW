"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactUs() {
  return (
    <>
    <Header/>
  
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section
        className="relative h-[300px] md:h-[400px] flex items-center justify-center bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: "url('/contact-banner.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-400 via-yellow-600 to-black opacity-60"></div>
        <h1 className="relative text-white text-4xl md:text-5xl font-bold uppercase tracking-wide text-center">
          Contact Us
        </h1>
      </section>

      {/* Contact Details Section */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Get in Touch
          </h2>
          <p className="text-gray-600 mt-4 leading-relaxed text-lg">
            We would love to hear from you. Whether you have a question about
            our products, services, or anything else, our team is ready to
            answer all your queries.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          {/* Phone */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <Phone className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">Call Us</h3>
            <p className="text-gray-600 mt-2">+91 7428 794 189</p>
          </div>

          {/* Email */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <Mail className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">Email Us</h3>
            <p className="text-gray-600 mt-2">support@nutribox.com</p>
          </div>

          {/* Location */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <MapPin className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">Visit Us</h3>
            <p className="text-gray-600 mt-2">
              123 NutriBox Street, Wellness City, India
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-yellow-50 py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
            Send Us a Message
          </h2>
          <form className="bg-white shadow-md rounded-lg p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            </div>

            {/* Subject */}
            <div className="mt-6">
              <label
                htmlFor="subject"
                className="block text-gray-700 font-medium mb-2"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                placeholder="Enter the subject"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            {/* Message */}
            <div className="mt-6">
              <label
                htmlFor="message"
                className="block text-gray-700 font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                placeholder="Write your message here..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="mt-8 text-center">
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-full transition duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="py-12 bg-gray-100 text-center">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-900">
          Need Immediate Assistance?
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Call us now at{" "}
          <span className="text-yellow-500 font-bold">+91 7428 794 189</span>{" "}
          for prompt support.
        </p>
        <a
          href="tel:+917428794189"
          className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full font-semibold"
        >
          Call Now
        </a>
      </section>
    </div>
    <Footer/>
    </>
  );
}
