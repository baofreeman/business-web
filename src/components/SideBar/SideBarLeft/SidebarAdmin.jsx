import { useLocation } from "react-router-dom";
import FilterProductAdmin from "../../Admin/Products/FilterProductAdmin";
import SibarLeftOrder from "../../Admin/Orders/SibarLeftOrder";

const SidebarAdmin = () => {
  const location = useLocation();
  const pathname = location.pathname;
  if (pathname.includes("/admin/products")) {
    return <FilterProductAdmin />;
  }
  if (pathname.includes("/admin/orders")) {
    return <SibarLeftOrder />;
  }
};

export default SidebarAdmin;
