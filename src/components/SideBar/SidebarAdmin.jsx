import { useLocation } from "react-router-dom";
import { NavbarAdmin, SibarLeftOrders } from "../Admin/index";

const SidebarAdmin = () => {
  const location = useLocation();
  const pathname = location.pathname;
  if (pathname.includes("/admin/products")) {
    return <NavbarAdmin />;
  }
  if (pathname.includes("/admin/orders")) {
    return <SibarLeftOrders />;
  }
};

export default SidebarAdmin;
