import React from "react";
import { useGetOrderQuery } from "../../api/ordersApiSlice";
import Button from "../ui/Button/Button";

const CheckoutSuccess = () => {
  const {
    data: orders,
    isLoading,
    isSuccess,
  } = useGetOrderQuery("allOrders", {
    pollingInterval: 60000000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  console.log(orders);
  const text = `Nếu có thay đổi về đơn hàng vui lòng liên hệ
  Hotline: 0909090909 hoặc email: test@gmail.com
  để được nhân viên hỗ trợ. Xin cám ơn.`;
  return (
    <div className="flex flex-col items-center justify-center w-full gap-4">
      <h1 className="text-base text-active">Đơn hàng đã được đặt thành công</h1>
      <span className="whitespace-pre-line text-center pb-[20px]">{text}</span>
      <Button size="m" design="primary" to={"/shop"}>
        Tiếp tục mua sắm
      </Button>
    </div>
  );
};

export default CheckoutSuccess;
