import { useLocation } from "react-router-dom";
import { SidebarRight } from "../../SideBar";

const LayoutRight = ({ srRef, id }) => {
  const { pathname, search } = useLocation();

  const showSr =
    pathname.includes("/cart") ||
    pathname.includes("/checkout") ||
    search.includes("productId")
      ? `sm:block md:block`
      : `sm:hidden md:hidden`;

  return (
    <>
      {pathname.includes("/admin") ? null : (
        <div
          id={id}
          className={`sidebar-right-layout bg-white dark:bg-black overflow-auto no-scrollbar ${showSr}`}
          ref={srRef}
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
