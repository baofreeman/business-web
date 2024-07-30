import { useLocation } from "react-router-dom";
import { DetailItem } from "../Shop/index";
import { SubCart } from "../Cart/index";
import { SubCheckout } from "../Checkout/index";

const SidebarRight = () => {
  const location = useLocation();
  if (location.pathname.includes("/shop")) return <DetailItem />;
  if (location.pathname.includes("/cart")) return <SubCart />;
  if (location.pathname.includes("/checkout")) return <SubCheckout />;
};

export default SidebarRight;
