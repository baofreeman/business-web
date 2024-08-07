import { useLocation } from "react-router-dom";
import { SidebarRight } from "../../SideBar";
import { useSelector } from "react-redux";
import { selectSidebarRight } from "../../../api/sidebarSlice";
import clsx from "clsx";

const LayoutRight = ({ id }) => {
  const { pathname, search } = useLocation();
  const openSidebarRight = useSelector(selectSidebarRight);

  const showSidebarRight =
    pathname.includes("/cart") ||
    pathname.includes("/checkout") ||
    search.includes("productId")
      ? `sm:block md:block`
      : `sm:hidden md:hidden`;

  return (
    <>
      {!pathname.includes("/admin") && (
        <div
          id={id}
          className={clsx(
            `sidebar-right-layout bg-white dark:bg-black overflow-auto no-scrollbar ${showSidebarRight}`,
            {
              hidden: !openSidebarRight,
            }
          )}
        >
          <div
            className="p-[20px] sm:p-[6px] sm:relative"
            style={{ height: "100%" }}
          >
            <SidebarRight />
          </div>
        </div>
      )}
    </>
  );
};

export default LayoutRight;
