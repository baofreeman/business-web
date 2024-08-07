import { useLocation } from "react-router-dom";
import { SubCart } from "../Cart/index";
import { SubCheckout } from "../Checkout/index";
import { DetailProduct } from "../Shop";

const SidebarRight = () => {
  const location = useLocation();
  if (location.pathname.includes("/shop")) return <DetailProduct />;
  if (location.pathname.includes("/cart")) return <SubCart />;
  if (location.pathname.includes("/checkout")) return <SubCheckout />;
};

export default SidebarRight;
