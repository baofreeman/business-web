import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hook/useAuth";
import { useGetUserQuery } from "../../api/authApiSlice";

const RequireAuth = ({ allowedRoles }) => {
  const { roles } = useAuth(); // GET roles.
  const location = useLocation();
  console.log(roles);
  // Find role includes allowedRoles at App Router.
  const content = roles?.some((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to={"account/login"} state={{ from: location }} replace />
  );

  return content;
};

export default RequireAuth;
