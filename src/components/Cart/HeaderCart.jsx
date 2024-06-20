import React from "react";
import { useSelector } from "react-redux";
import { selectTotalQuatity } from "../../api/cartSlice";
import Button from "../ui/Button/Button";
import ArrowIcon from "../../assets/icons/ArrowIcon";

const HeaderCart = () => {
  const totalQuantity = useSelector(selectTotalQuatity); // GET Total quantity.

  return (
    <div className="flex w-full gap-8 justify-between items-center">
      <div className="flex gap-2 items-center">
        <span className="text-base sm:text-md uppercase flex gap-2">
          / <h1 className="text-active">Giỏ hàng</h1> /
        </span>
        <span className="text-silver">{`Có ${totalQuantity} sản phẩm trong giỏ hàng`}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="bg-white dark:bg-black">
          <ArrowIcon width={12} height={7} rotate={"-90deg"} />
        </div>
        <Button size="s-link" design="link-primary" to={"/shop"}>
          Cửa hàng
        </Button>
      </div>
    </div>
  );
};

export default HeaderCart;
