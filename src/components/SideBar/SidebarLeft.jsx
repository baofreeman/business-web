import { useLocation } from "react-router-dom";
import { FilterItem } from "../Shop/index";
import { SidebarAdmin } from "../SideBar/index";
import { FilterCart } from "../Cart/index";

const SidebarLeft = () => {
  const location = useLocation();
  const pathname = location.pathname;
  if (pathname.includes("/shop")) return <FilterItem />;
  if (pathname.includes("/admin")) return <SidebarAdmin />;
  if (pathname.includes("/cart")) return <FilterCart />;
  if (pathname.includes("/checkout")) return <FilterCart />;
};

export default SidebarLeft;
