import { useSelector } from "react-redux";
import { selectTotalQuatity } from "../../../api/cartSlice";
import { useLocation } from "react-router-dom";
import { Button } from "../../ui";
import CartIcon from "../../../assets/icons/CartIcon";
import { HeaderShop } from "../../Shop";
import { HeaderCart } from "../../Cart";
import { HeaderCheckout } from "../../Checkout";
import { HeaderAdmin } from "../../Admin";

const LayoutHeader = ({ id }) => {
  const totalQuantity = useSelector(selectTotalQuatity); // GET total quantity.
  const location = useLocation();
  const { pathname } = location;

  return (
    <div id={id} className="w-full h-full bg-white dark:bg-black header-layout">
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
    </div>
  );
};

export default LayoutHeader;
