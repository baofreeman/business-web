import Cookies from "js-cookie";
import { Outlet, useLocation } from "react-router-dom";

const authPaths = ["/account/register", "/account/login"];
const MiddlewareAuth = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const isAuthenticated = Cookies.get("is_auth");

  if (isAuthenticated) {
    if (authPaths.includes(pathname)) {
      window.location.replace("/");
    }
  }
  return <Outlet />;
};

export default MiddlewareAuth;
