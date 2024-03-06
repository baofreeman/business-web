import React from "react";
import { useLocation } from "react-router-dom";

import TabDetail from "../../TabShop/TabDetail";
import SidebarAdmin from "../SideBarLeft/SidebarAdmin";
import { TabCart } from "../../TabCart/TabCart";
import TabCheckout from "../../TabCheckout/TabCheckout";

const SidebarRight = () => {
  const location = useLocation();
  if (location.pathname.includes("/shop")) return <TabDetail />;
  // if (location.pathname.includes("/admin")) return <SidebarAdmin />;
  if (location.pathname.includes("/cart")) return <TabCart />;
  if (location.pathname.includes("/checkout")) return <TabCheckout />;
};

export default SidebarRight;
