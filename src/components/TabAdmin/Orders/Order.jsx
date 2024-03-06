import React from "react";
import { useGetOrderQuery } from "../../../api/ordersApiSlice";
import OrderExtent from "./OrderExtent";

const Order = () => {
  const { orders } = useGetOrderQuery("allOrder", {
    selectFromResult: ({ data }) => ({
      orders: data?.ids.map((id) => id),
    }),
  });
  let content;
  content = orders?.length ? (
    orders.map((orderId) => <OrderExtent key={orderId} orderId={orderId} />)
  ) : (
    <p>No orders</p>
  );
  return (
    <div className="p-10 w-full">
      <section className="w-full">
        {orders && orders.length ? (
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left px-8 py-4">Id</th>
                <th className="text-left px-8 py-4">Thông tin</th>
                <th className="text-left px-8 py-4">Sản phẩm</th>
                <th className="text-left px-8 py-4">Số lượng</th>
                <th className="text-left px-8 py-4">Tổng cộng</th>
                <th className="text-left px-8 py-4">Thanh toán</th>
                <th className="text-left px-8 py-4">Ghi chú</th>
                <th className="text-left px-8 py-4">Ngày tạo</th>
                <th className="text-left px-8 py-4">Trạng thái</th>
              </tr>
            </thead>
            <tbody>{content}</tbody>
          </table>
        ) : (
          <div className="text-center m-auto">
            <h1>Không có đơn hàng</h1>
          </div>
        )}
      </section>
    </div>
  );
};

export default Order;
