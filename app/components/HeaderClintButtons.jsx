"use client";

import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/lib/firestore/user/read";
import { Badge } from "@nextui-org/react";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function HeaderClientButtons() {
  const { user } = useAuth();
  const { data } = useUser({ uid: user?.uid });

  return (
    <div className="flex items-center gap-3">
      {/* Favorites Icon */}
      <Link href={`/favorites`}>
        <Badge
          variant="solid"
          size="sm"
          className={`text-white bg-red-500 text-[8px] ${
            (data?.favorites?.length ?? 0) === 0 ? "hidden" : "inline"
          }`}
          content={data?.favorites?.length ?? 0}
        >
          <button
            title="My Favorites"
            className="h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-700"
          >
            <Heart size={16} />
          </button>
        </Badge>
      </Link>

      {/* Cart Icon */}
      <Link href={`/cart`}>
        <Badge
          variant="solid"
          size="sm"
          className={`text-white bg-red-500 text-[8px] ${
            (data?.carts?.length ?? 0) === 0 ? "hidden" : "inline"
          }`}
          content={data?.carts?.length ?? 0}
        >
          <button
            title="My Cart"
            className="h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-700"
          >
            <ShoppingCart size={16} />
          </button>
        </Badge>
      </Link>
    </div>
  );
}
