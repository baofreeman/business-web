import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hook/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { roles } = useAuth(); // GET roles.
  const location = useLocation();

  // Find role includes allowedRoles at App Router.
  const content = roles.some((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );

  return content;
};

export default RequireAuth;
