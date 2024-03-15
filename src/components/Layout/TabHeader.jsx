import Button from "../ui/Button/Button";
import { useSelector } from "react-redux";
import { selectTotalQuatity } from "../../api/cartSlice";
import { useLocation } from "react-router-dom";
import HeaderShop from "../TabShop/HeaderShop";
import HeaderCart from "../TabCart/HeaderCart";
import HeaderAdmin from "../TabAdmin/HeaderAdmin";
import HeaderCheckout from "../TabCheckout/HeaderCheckout";

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
            <svg
              className="fill-black dark:fill-silver"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="8.75"
                y="9.9165"
                width="7.58333"
                height="1.16666"
                transform="rotate(-180 8.75 9.9165)"
              ></rect>
              <rect
                x="4.08325"
                y="1.1665"
                width="2.91667"
                height="1.16667"
                transform="rotate(-180 4.08325 1.1665)"
              ></rect>
              <rect
                x="9.91675"
                y="12.8335"
                width="2.91667"
                height="1.16667"
              ></rect>
              <rect x="9.33325" y="4.0835" width="3.5" height="1.16667"></rect>
              <rect
                x="4.66675"
                y="5.25"
                width="3.5"
                height="1.16667"
                transform="rotate(-180 4.66675 5.25)"
              ></rect>
              <rect
                x="9.33325"
                y="8.75"
                width="2.33333"
                height="1.16667"
              ></rect>
              <rect x="9.91675" width="2.91667" height="1.16667"></rect>
              <rect
                x="4.08325"
                y="14"
                width="2.91667"
                height="1.16667"
                transform="rotate(-180 4.08325 14)"
              ></rect>
              <rect
                x="5.25"
                y="4.6665"
                width="1.16667"
                height="3.5"
                transform="rotate(-180 5.25 4.6665)"
              ></rect>
              <rect
                x="5.25"
                y="9.3335"
                width="1.16667"
                height="2.91667"
                transform="rotate(-180 5.25 9.3335)"
              ></rect>
              <rect
                x="9.91675"
                y="12.8335"
                width="1.16667"
                height="6.41667"
                transform="rotate(-180 9.91675 12.8335)"
              ></rect>
              <rect
                x="12.8333"
                y="1.1665"
                width="1.16667"
                height="2.91667"
              ></rect>
              <rect
                x="1.16675"
                y="4.0835"
                width="1.16667"
                height="2.91667"
                transform="rotate(-180 1.16675 4.0835)"
              ></rect>
              <rect
                x="12.8333"
                y="9.9165"
                width="1.16667"
                height="2.91667"
              ></rect>
              <rect
                x="1.16675"
                y="11.0835"
                width="1.16667"
                height="1.16667"
                transform="rotate(-180 1.16675 11.0835)"
              ></rect>
              <rect
                x="8.75"
                y="5.25"
                width="4.08333"
                height="1.16667"
                transform="rotate(-180 8.75 5.25)"
              ></rect>
              <rect x="8.75" y="1.1665" width="1.16667" height="4.08333"></rect>
              <rect
                x="5.25"
                y="12.8335"
                width="1.16667"
                height="2.91667"
                transform="rotate(-180 5.25 12.8335)"
              ></rect>
              <rect
                x="11.6667"
                y="8.75"
                width="1.16667"
                height="1.16667"
              ></rect>
              <rect
                x="1.16675"
                y="12.8335"
                width="1.16667"
                height="1.75"
                transform="rotate(-180 1.16675 12.8335)"
              ></rect>
            </svg>
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
