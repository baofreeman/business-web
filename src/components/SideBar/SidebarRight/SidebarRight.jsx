import React from "react";
import { useLocation } from "react-router-dom";

import DetailItem from "../../Shop/DetailItem";
import SidebarAdmin from "../SideBarLeft/SidebarAdmin";
import { TabCart } from "../../Cart/TabCart";
import TabCheckout from "../../Checkout/TabCheckout";

const SidebarRight = () => {
  const location = useLocation();
  if (location.pathname.includes("/shop")) return <DetailItem />;
  if (location.pathname.includes("/cart")) return <TabCart />;
  if (location.pathname.includes("/checkout")) return <TabCheckout />;
};

export default SidebarRight;
