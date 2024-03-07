import React from "react";
import Button from "../ui/Button/Button";
import { useLocation } from "react-router-dom";

const TabFilterCheckout = () => {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <div className="flex w-full">
      <ul className="flex flex-col items-center">
        <li>
          <Button
            size="m"
            design={
              pathname.includes("/products") ? "link-active" : "link-basic"
            }
            to={"/admin/products"}
          >
            Đơn hàng của bạn
          </Button>
        </li>
        <li>
          <Button size="m" design="link-basic" to={"/admin/products"}>
            Kiểm tra đơn hàng
          </Button>
        </li>
        <li>
          <Button size="m" design="link-basic" to={"/admin/products"}>
            Khiếu nại đơn hàng
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default TabFilterCheckout;
