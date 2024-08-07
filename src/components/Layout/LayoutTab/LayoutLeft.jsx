import { SidebarLeft } from "../../SideBar";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { selectSidebarLeft, setSidebarLeft } from "../../../api/sidebarSlice";
import { useEffect } from "react";

const LayoutLeft = ({ id }) => {
  const { search } = useLocation();
  const openSidebarLeft = useSelector(selectSidebarLeft);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const showSidebarLeft = search.includes("productId")
    ? `sm:hidden md:hidden`
    : `sm:block md:block`;

  useEffect(() => {
    if (openSidebarLeft === false && pathname.includes("/admin")) {
      dispatch(setSidebarLeft(!openSidebarLeft));
    }
  }, [pathname]);

  return (
    <div
      id={id}
      className={clsx(
        `sidebar-left-layout sm:flex sm:items-center md:flex md:items-center md:justify-center sm:justify-center bg-white dark:bg-black overflow-auto no-scrollbar ${showSidebarLeft}`,
        {
          hidden: !openSidebarLeft,
        }
      )}
    >
      <div className="w-full p-[24px] sm:p-[0px] md:p-[12px]">
        <SidebarLeft />
      </div>
    </div>
  );
};

export default LayoutLeft;
