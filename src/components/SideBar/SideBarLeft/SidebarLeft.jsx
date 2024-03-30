import React from "react";
import { useLocation } from "react-router-dom";
import TabFilter from "../../TabShop/TabFilter";
import SidebarAdmin from "./SidebarAdmin";
import TabFilterCart from "../../TabCart/TabFilterCart";

const SidebarLeft = () => {
  const location = useLocation();
  if (location.pathname.includes("/shop")) return <TabFilter />;
  if (location.pathname.includes("/admin")) return <SidebarAdmin />;
  if (location.pathname.includes("/cart")) return <TabFilterCart />;
  if (location.pathname.includes("/checkout")) return <TabFilterCart />;
};

export default SidebarLeft;
