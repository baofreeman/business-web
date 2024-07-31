import { useLocation } from "react-router-dom";
import { OrderSidebarLeftAdmin, ProductSidebarLeftAdmin } from "../Admin/index";

const SidebarAdmin = () => {
  const location = useLocation();
  const pathname = location.pathname;
  if (pathname.includes("/admin/products")) {
    return <ProductSidebarLeftAdmin />;
  }
  if (pathname.includes("/admin/orders")) {
    return <OrderSidebarLeftAdmin />;
  }
};

export default SidebarAdmin;
