"use client";
import useCartStore from "@/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiShoppingBag } from "react-icons/fi";

const CartIcon = () => {
  const [isClient, setIsClient] = useState(false);
  const groupedItems = useCartStore((state) => state.getGroupedItems());

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Link
      href="/cart"
      className="flex items-center border  border-gray-200 px-2 py-1 text-sm gap-2 rounded-md shadow-md hover:shadow-none hoverEffect"
    >
      <FiShoppingBag className="h-6 w-6 text-darkBlue" />
      <div className="flex flex-col">
        <p className="text-xs">
          <span className="font-semibold">
            {groupedItems?.length ? groupedItems?.length : 0}
          </span>{" "}
          items
        </p>
        <p className="font-semibold">Cart</p>
      </div>
    </Link>
  );
};

export default CartIcon;
