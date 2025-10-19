import { Product } from "@/sanity.types";
import React from "react";
import { HiMinus, HiPlus } from "react-icons/hi";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import useCartStore from "@/store";

interface Props {
  product: Product;
  className?: string;
  borderStyle?: string;
}

const QuantityButton = ({ product }: Props) => {
  const { addItem, removeItem, getItemCount } = useCartStore();

  const handleRemoveProduct = () => {
    removeItem(product?._id);
    if (itemsCount > 1) {
      toast.success("decreased successfully");
    } else {
      toast.success(
        `${product?.name?.substring(0, 12)}... removed successfully `
      );
    }
  };

  const handleAddProduct = () => {
    addItem(product);
    toast.success(" increased successfully");
  };

  const itemsCount = getItemCount(product?._id);
  const isOutOfStock = product?.stock === 0;

  console.log(isOutOfStock);

  return (
    <div className={cn("flex items-center gap-1 pb-1 text-base")}>
      <Button
        variant="outline"
        size="icon"
        className="w-6 h-6"
        onClick={handleRemoveProduct}
      >
        <HiMinus />
      </Button>

      <span className="font-semibold text-center text-darkBlue w-8 ">
        {itemsCount}
      </span>

      <Button
        variant="outline"
        size="icon"
        className="w-6 h-6"
        onClick={handleAddProduct}
      >
        <HiPlus />
      </Button>
    </div>
  );
};

export default QuantityButton;
