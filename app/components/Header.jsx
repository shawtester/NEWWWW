"use client";

import { Heart, Search, ShoppingCart, UserCircle2 } from "lucide-react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import AuthContextProvider from "@/context/AuthContext";
import HeaderClientButtons from "./HeaderClintButtons";
import AdminButton from "./AdminButton";
import { useEffect, useState } from "react";

export default function Header() {
  const [animatedText, setAnimatedText] = useState(""); // State for dynamic text
  const fullText = "NUTRIBOX";

  // Animation logic
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setAnimatedText(fullText.slice(0, index + 1)); // Add one letter at a time
      index++;
      if (index === fullText.length) clearInterval(interval); // Stop at the full word
    }, 300); // 300ms interval per letter

    return () => clearInterval(interval);
  }, []);

  const menuList = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact-us" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white bg-opacity-65 backdrop-blur-2xl py-3 px-4 md:py-4 md:px-16 border-b flex items-center justify-between">
      {/* Dynamic Text Animation - Clickable */}
      <Link href="/" className="flex items-center">
        <h1
          className="text-2xl font-bold font-mono tracking-widest cursor-pointer"
          style={{ width: "150px" }} // Reserve space for the full text
        >
          {animatedText.split("").map((char, idx) => (
            <span
              key={idx}
              className={
                idx < Math.ceil(animatedText.length / 2)
                  ? "text-yellow-400" // First half in yellow
                  : "text-gray-900" // Second half in gray
              }
            >
              {char}
            </span>
          ))}
        </h1>
      </Link>

      {/* Navigation Menu */}
      <div className="hidden md:flex gap-2 items-center font-semibold">
        {menuList.map((item) => (
          <Link href={item?.link} key={item?.name}>
            <button className="text-sm px-4 py-2 rounded-lg hover:bg-gray-50">
              {item?.name}
            </button>
          </Link>
        ))}
      </div>

      {/* Header Icons */}
      <div className="flex items-center gap-1">
        <AuthContextProvider>
          <AdminButton />
        </AuthContextProvider>
        <Link href={`/search`}>
          <button
            title="Search Products"
            className="h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-50"
          >
            <Search size={14} />
          </button>
        </Link>
        <AuthContextProvider>
          <HeaderClientButtons />
        </AuthContextProvider>
        <Link href={`/account`}>
          <button
            title="My Account"
            className="h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-50"
          >
            <UserCircle2 size={14} />
          </button>
        </Link>
        <AuthContextProvider>
          <LogoutButton />
        </AuthContextProvider>
      </div>
    </nav>
  );
}
