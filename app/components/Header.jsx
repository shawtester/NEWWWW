"use client";

import {
  Heart,
  Search,
  ShoppingCart,
  UserCircle2,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import AuthContextProvider, { useAuth } from "@/context/AuthContext";
import { useUser } from "@/lib/firestore/user/read";
import AdminButton from "./AdminButton";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const { data, error } = useUser({ uid: user?.uid }); // Assuming `useUser` doesn't provide `loading` directly
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data || error) {
      setLoading(false); // Data is loaded or error occurred
    }
  }, [data, error]);

  const menuList = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact-us" },
  ];

  const favoritesCount = data?.favorites?.length ?? 0;
  const cartCount = data?.carts?.length ?? 0;

  return (
    <nav className="sticky top-0 z-50 bg-[#1f1f1f] text-white py-3 px-4 md:py-4 md:px-16 border-b flex items-center justify-between relative">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <Image
          src="/Logo.png"
          alt="NUTRIBOX Logo"
          width={100}
          height={25}
          className="object-contain cursor-pointer"
        />
      </Link>

      {/* Search Icon (Visible on Mobile) */}
      <div className="flex md:hidden">
        <Link href={`/search`}>
          <button
            title="Search Products"
            className="h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-700"
          >
            <Search size={18} />
          </button>
        </Link>
      </div>

      {/* Hamburger Menu Icon for Mobile */}
      {!isMobileMenuOpen && (
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-white focus:outline-none"
          >
            <Menu size={24} />
          </button>
        </div>
      )}

      {/* Mobile Sliding Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-3/4 max-w-xs bg-[#1f1f1f] text-white z-50 transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white focus:outline-none"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-start gap-4 p-4">
          {menuList.map((item) => (
            <Link href={item.link} key={item.name}>
              <button className="text-lg font-semibold px-4 py-2 rounded-lg hover:bg-gray-700 w-full text-left">
                {item.name}
              </button>
            </Link>
          ))}
        </div>

        {/* Header Icons */}
        <div className="flex flex-col items-start gap-4 p-4">
          <AuthContextProvider>
            <AdminButton />
          </AuthContextProvider>
          <Link href={`/favorites`}>
            <div className="relative">
              <button
                title="My Favorites"
                className="h-10 w-10 flex justify-center items-center rounded-full hover:bg-gray-700"
              >
                <Heart size={20} />
              </button>
              {favoritesCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </div>
          </Link>
          <Link href={`/cart`}>
            <div className="relative">
              <button
                title="My Cart"
                className="h-10 w-10 flex justify-center items-center rounded-full hover:bg-gray-700"
              >
                <ShoppingCart size={20} />
              </button>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>
          <Link href={`/account`}>
            <button
              title="My Account"
              className="h-10 w-10 flex justify-center items-center rounded-full hover:bg-gray-700"
            >
              <UserCircle2 size={20} />
            </button>
          </Link>
          <AuthContextProvider>
            <LogoutButton />
          </AuthContextProvider>
        </div>
      </div>

      {/* Backdrop for Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Navigation Menu for Desktop */}
      <div
        className={`absolute left-1/2 transform -translate-x-1/2 hidden md:flex gap-8 font-semibold`}
      >
        {menuList.map((item) => (
          <Link href={item.link} key={item.name}>
            <button className="text-sm px-4 py-2 rounded-lg hover:bg-gray-700">
              {item.name}
            </button>
          </Link>
        ))}
      </div>

      {/* Header Icons for Desktop */}
      <div className="hidden md:flex items-center gap-3">
        <AuthContextProvider>
          <AdminButton />
        </AuthContextProvider>
        <Link href={`/search`}>
          <button
            title="Search Products"
            className="h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-700"
          >
            <Search size={18} />
          </button>
        </Link>
        <Link href={`/favorites`}>
          <div className="relative">
            <button
              title="My Favorites"
              className="h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-700"
            >
              <Heart size={16} />
            </button>
            {favoritesCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-xs text-white rounded-full w-4 h-4 flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </div>
        </Link>
        <Link href={`/cart`}>
          <div className="relative">
            <button
              title="My Cart"
              className="h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-700"
            >
              <ShoppingCart size={16} />
            </button>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-xs text-white rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
        </Link>
        <Link href={`/account`}>
          <button
            title="My Account"
            className="h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-700"
          >
            <UserCircle2 size={18} />
          </button>
        </Link>
        <AuthContextProvider>
          <LogoutButton />
        </AuthContextProvider>
      </div>

      {/* Show Loading Spinner when data is being fetched */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="w-8 h-8 border-4 border-t-4 border-gray-300 border-solid rounded-full animate-spin"></div>
        </div>
      )}
    </nav>
  );
}
