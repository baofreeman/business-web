import { useLocation } from "react-router-dom";
import { SidebarAdmin } from "../SideBar/index";
import { FilterCart } from "../Cart/index";
import { FilterProducts } from "../Shop";

const SidebarLeft = () => {
  const location = useLocation();
  const pathname = location.pathname;
  if (pathname.includes("/shop")) return <FilterProducts />;
  if (pathname.includes("/admin")) return <SidebarAdmin />;
  if (pathname.includes("/cart")) return <FilterCart />;
  if (pathname.includes("/checkout")) return <FilterCart />;
};

export default SidebarLeft;
