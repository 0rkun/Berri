import React from "react";
import PriceFormatter from "./PriceFormatter";
import { cn } from "@/lib/utils";

interface Props {
  price: number | undefined;
  discount: number | undefined;
  className?: string;
  label?: string;
}

const PriceView = ({ price, discount, className, label }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <PriceFormatter amount={price} className={className} />

        {price && discount && (
          <PriceFormatter
            amount={price + (discount * price) / 100}
            className={
              (cn("text-sm text-red-500 font-medium line-through"), className)
            }
          />
        )}
      </div>
      <p className="text-gray-500 font-medium"> {label} pack </p>
    </div>
  );
};

export default PriceView;
