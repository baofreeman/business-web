import { useLocation } from "react-router-dom";

import DetailItem from "../../Shop/DetailItem";
import SubCart from "../../Cart/SubCart";
import SubCheckout from "../../Checkout/SubCheckout";

const SidebarRight = () => {
  const location = useLocation();
  if (location.pathname.includes("/shop")) return <DetailItem />;
  if (location.pathname.includes("/cart")) return <SubCart />;
  if (location.pathname.includes("/checkout")) return <SubCheckout />;
};

export default SidebarRight;
