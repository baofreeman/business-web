import { Button } from "../ui/index";
import { useSelector } from "react-redux";
import { selectTotalQuatity } from "../../api/cartSlice";
import { useLocation } from "react-router-dom";
import { HeaderShop } from "../Shop/index";
import { HeaderCart } from "../Cart/index";
import { HeaderAdmin } from "../Admin/index";
import { HeaderCheckout } from "../Checkout/index";
import CartIcon from "../../assets/icons/CartIcon";

const TabHeader = () => {
  const totalQuantity = useSelector(selectTotalQuatity); // GET total quantity.
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
