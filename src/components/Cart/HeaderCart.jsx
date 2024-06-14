import React from "react";
import { useSelector } from "react-redux";
import { selectTotalQuatity } from "../../api/cartSlice";
import Button from "../ui/Button/Button";

const HeaderCart = () => {
  const totalQuantity = useSelector(selectTotalQuatity);
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
          <svg
            width="12"
            height="7"
            viewBox="0 0 12 7"
            fill="#929292"
            xmlns="http://www.w3.org/2000/svg"
            style={{ rotate: "-90deg" }}
          >
            <path d="M1.71429 0H0V1.71429H1.71429V3.42857H3.42857V5.14286H5.14286V6.85714H6.85714V5.14286H8.57143V3.42857H10.2857V1.71429H12V0H10.2857V1.71429H8.57143V3.42857H6.85714V5.14286H5.14286V3.42857H3.42857V1.71429H1.71429V0Z"></path>
          </svg>
        </div>
        <Button size="s-link" design="link-primary" to={"/shop"}>
          Cửa hàng
        </Button>
      </div>
    </div>
  );
};

export default HeaderCart;
