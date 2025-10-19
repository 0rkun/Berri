import { MdFavoriteBorder } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { TbArrowsLeftRight } from "react-icons/tb";
import { RiShoppingBag4Line } from "react-icons/ri";

const ProductCartBar = () => {
  return (
    <div className="flex items-center justify-center gap-2.5 text-gray-500  text-lg ">
      <div className="border shadow-md bg-white p-2 rounded-xl hover:bg-darkBlue hover:text-white hoverEffect">
        <MdFavoriteBorder />
      </div>

      <div className="border shadow-md bg-white p-2 rounded-xl hover:bg-darkBlue hover:text-white hoverEffect">
        <FaRegEye />
      </div>

      <div className="border shadow-md bg-white p-2 rounded-xl hover:bg-darkBlue hover:text-white hoverEffect">
        <TbArrowsLeftRight />
      </div>

      <div className="border shadow-md bg-white p-2 rounded-xl hover:bg-darkBlue hover:text-white hoverEffect">
        <RiShoppingBag4Line />
      </div>
    </div>
  );
};

export default ProductCartBar;
