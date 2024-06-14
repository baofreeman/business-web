import React from "react";
import { useLocation } from "react-router-dom";
import TabFilterProductAdmin from "../../Admin/Products/TabFilterProductAdmin";
import TabSibarLeftOrder from "../../Admin/Orders/TabSibarLeftOrder";

const SidebarAdmin = () => {
  const location = useLocation();
  const pathname = location.pathname;
  if (pathname.includes("/admin/products")) {
    return <TabFilterProductAdmin />;
  }
  if (pathname.includes("/admin/orders")) {
    return <TabSibarLeftOrder />;
  }
};

export default SidebarAdmin;
