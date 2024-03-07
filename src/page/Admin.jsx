import React from "react";
import { Outlet } from "react-router-dom";
import { useGetOrderQuery } from "../api/ordersApiSlice";
const Admin = () => {
  const {
    data: orders,
    isLoading,
    isSuccess,
  } = useGetOrderQuery("allOrder", {
    pollingInterval: 60000000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  return <Outlet />;
};

export default Admin;
