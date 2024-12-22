"use client";

import { useAuth } from "@/context/AuthContext";
import { useAdmin } from "@/lib/firestore/admins/read";
import { Avatar } from "@nextui-org/react";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function Header({ toggleSidebar }) {
  const { user } = useAuth();
  const { data: admin } = useAdmin({ email: user?.email });
  const [loading, setLoading] = useState(false);

  const handleSidebarToggle = () => {
    setLoading(true);  // Start loading
    toggleSidebar();   // Toggle the sidebar visibility

    // Simulate an action (e.g., a network request or any delay)
    setTimeout(() => {
      setLoading(false);  // Stop loading after the action completes
    }, 1000);  // Adjust the duration to simulate the action time
  };

  return (
    <section className="relative fixed w-full top-0 flex items-center gap-3 bg-white border-b px-4 py-3">
      {/* Sidebar Toggle (Mobile) */}
      <div className="flex justify-center items-center md:hidden">
        <button
          onClick={handleSidebarToggle}
          disabled={loading}
          className="transition-all duration-300 transform hover:scale-105"
        >
          <Menu />
        </button>
      </div>
      <div className="w-full flex justify-between items-center pr-0 md:pr-[260px]">
        <h1 className="text-xl font-semibold transition-all duration-300 hover:text-gray-700">Dashboard</h1>
        <div className="flex gap-2 items-center">
          <div className="md:flex flex-col items-end hidden">
            <h1 className="text-sm font-semibold transition-all duration-300 hover:text-gray-700">
              {admin?.name}
            </h1>
            <h1 className="text-xs text-gray-600">{admin?.email}</h1>
          </div>
          <Avatar
            size="sm"
            src={admin?.imageURL}
            className="transition-all duration-300 hover:scale-105"
          />
        </div>
      </div>

      {/* Full-Screen Loading Overlay with Blur */}
      {loading && (
        <div className="absolute inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center transition-all duration-300">
          {/* Optional: Loading Spinner */}
          <div className="w-8 h-8 border-4 border-t-4 border-gray-300 border-solid rounded-full animate-spin"></div>
        </div>
      )}
    </section>
  );
}
