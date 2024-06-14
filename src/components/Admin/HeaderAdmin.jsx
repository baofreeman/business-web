import React from "react";
import Button from "../ui/Button/Button";
import { useLocation } from "react-router-dom";

const HeaderAdmin = () => {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <ul className="flex">
      <li>
        <Button
          size="m"
          design={pathname.includes("/products") ? "link-active" : "link-basic"}
          to={"/admin/products"}
        >
          Products
        </Button>
      </li>
      <li>
        <Button
          size="m"
          design={pathname.includes("/users") ? "link-active" : "link-basic"}
          to={"/admin/users"}
        >
          Users
        </Button>
      </li>
      <li>
        <Button
          size="m"
          design={pathname.includes("/orders") ? "link-active" : "link-basic"}
          to={"/admin/orders"}
        >
          Orders
        </Button>
      </li>
    </ul>
  );
};

export default HeaderAdmin;
