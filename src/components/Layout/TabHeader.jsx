import Button from "../ui/Button/Button";
import { useSelector } from "react-redux";
import { selectTotalQuatity } from "../../api/cartSlice";
import { useLocation } from "react-router-dom";
import HeaderShop from "../Shop/HeaderShop";
import HeaderCart from "../Cart/HeaderCart";
import HeaderAdmin from "../Admin/HeaderAdmin";
import HeaderCheckout from "../Checkout/HeaderCheckout";
import CartIcon from "../../assets/icons/CartIcon";

const TabHeader = () => {
  const totalQuantity = useSelector(selectTotalQuatity);
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <nav
      style={{ height: "100%" }}
      className={`w-full flex items-center justify-between px-[10px]`}
    >
      {pathname.includes("/shop") ? (
        <HeaderShop />
      ) : pathname.includes("/cart") ? (
        <HeaderCart />
      ) : pathname.includes("/checkout") ? (
        <HeaderCheckout />
      ) : pathname.includes("/admin") ? (
        <HeaderAdmin />
      ) : null}
      {pathname.includes("/shop") ? (
        <div className="relative">
          <Button size="m" design="link-basic" to={"/cart"}>
            <CartIcon />
          </Button>
          <span className="absolute top-[-3px] right-[-10px] text-md text-orange bg-transparent w-[20px] h-[20px] rounded-[999px]">
            {totalQuantity}
          </span>
        </div>
      ) : null}
    </nav>
  );
};

export default TabHeader;
