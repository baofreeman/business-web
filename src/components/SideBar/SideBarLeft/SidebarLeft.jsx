import React from "react";
import { useLocation } from "react-router-dom";
import FilterItem from "../../Shop/FilterItem";
import SidebarAdmin from "./SidebarAdmin";
import TabFilterCart from "../../Cart/TabFilterCart";

const SidebarLeft = () => {
  const location = useLocation();
  if (location.pathname.includes("/shop")) return <FilterItem />;
  if (location.pathname.includes("/admin")) return <SidebarAdmin />;
  if (location.pathname.includes("/cart")) return <TabFilterCart />;
  if (location.pathname.includes("/checkout")) return <TabFilterCart />;
};

export default SidebarLeft;
