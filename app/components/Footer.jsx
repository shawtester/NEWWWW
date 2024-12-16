'use client';

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-yellow-400">Nutribox</h2>
            <p className="text-sm">Your Health, Our Priority</p>
            <p className="text-xs text-gray-400 leading-relaxed">
              We provide high-quality supplements to boost your fitness and health journey. Let's grow stronger together!
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg underline underline-offset-8 decoration-yellow-400">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-yellow-400 transition-all duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-yellow-400 transition-all duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-yellow-400 transition-all duration-200">
                  Products
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-yellow-400 transition-all duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg underline underline-offset-8 decoration-yellow-400">
              Contact Us
            </h3>
            <p className="text-sm">Phone: 
              <a href="tel:+917428794189" className="text-yellow-400 hover:underline ml-1">
                +91 7428 794 189
              </a>
            </p>
            <p className="text-sm">
              Instagram: 
              <a
                href="https://www.instagram.com/nutribox43/profilecard/?igsh=MWZwd3U2dXAyajVzZQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 hover:underline ml-1"
              >
                @nutribox43
              </a>
            </p>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg underline underline-offset-8 decoration-yellow-400">
              Newsletter
            </h3>
            <p className="text-sm">Subscribe to get the latest updates and special offers.</p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your Email"
                className="p-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button className="py-2 px-4 bg-yellow-400 text-gray-800 font-semibold rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300">
                Subscribe
              </button>
            </form>
          </div>

          {/* Social Media Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg underline underline-offset-8 decoration-yellow-400">
              Follow Us
            </h3>
            <div className="flex space-x-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-600 transition duration-300"
              >
                <i className="fab fa-facebook-f text-2xl"></i>
              </a>
              <a
                href="https://www.instagram.com/nutribox43/profilecard/?igsh=MWZwd3U2dXAyajVzZQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-pink-500 transition duration-300"
              >
                <i className="fab fa-instagram text-2xl"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 transition duration-300"
              >
                <i className="fab fa-twitter text-2xl"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm">
          <p>© {new Date().getFullYear()} Nutribox. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
