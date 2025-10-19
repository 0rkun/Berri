"use client";
import { Product } from "@/sanity.types";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import QuantityButton from "./QuantityButton";
import PriceFormatter from "./PriceFormatter";
import { useEffect, useState } from "react";
import useCartStore from "@/store";

interface Props {
  product: Product;
  className?: string;
}

const AddToCartButton = ({ product, className }: Props) => {
  const [isClient, setIsClient] = useState(false);
  const { addItem, getItemCount } = useCartStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="p-1">
        <div className="m-4">
          <Button
            disabled
            className={cn(
              "bg-darkBlue/10 text-black border border-darkBlue py-2 mt-1 w-full rounded-md font-medium hover:bg-darkBlue hover:text-white hoverEffect disabled:hover:cursor-not-allowed disabled:bg-darkBlue/10 disabled:text-gray-400 disabled:hover:text-gray-400 disabled:border-darkBlue/10",
              className
            )}
          >
            Add To Cart
          </Button>
        </div>
      </div>
    );
  }

  const itemCount = getItemCount(product?._id); // Sepetten ürün sayısını al
  const isOutOfStock = product?.stock === 0;

  const handleAddToCart = () => {
    addItem(product);
    toast.success(`${product?.name?.substring(0, 12)}... added succesfully`);
  };

  return (
    <div className="p-1">
      {itemCount ? (
        <div className="text-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Quantity</span>
            <QuantityButton product={product} />
          </div>
          <div className="flex items-center justify-between border-t pt-1">
            <span>Total :</span>
            <PriceFormatter
              amount={product?.price ? product?.price * itemCount : 0}
            />
          </div>
        </div>
      ) : (
        <div className="m-4">
          <Button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={cn(
              "bg-darkBlue/10 text-black border border-darkBlue py-2 mt-1 w-full rounded-md font-medium hover:bg-darkBlue hover:text-white hoverEffect disabled:hover:cursor-not-allowed disabled:bg-darkBlue/10 disabled:text-gray-400 disabled:hover:text-gray-400 disabled:border-darkBlue/10 ",
              className
            )}
          >
            Add To Cart
          </Button>
        </div>
      )}
    </div>
  );
};

export default AddToCartButton;
