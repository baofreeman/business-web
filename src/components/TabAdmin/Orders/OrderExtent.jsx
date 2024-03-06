import React, { memo } from "react";
import { useGetOrderQuery } from "../../../api/ordersApiSlice";
import { Link } from "react-router-dom";

const OrderExtent = ({ orderId }) => {
  const { order } = useGetOrderQuery("allOrder", {
    selectFromResult: ({ data }) => ({
      order: data?.entities[orderId],
    }),
  });
  return (
    <tr>
      <td className="border px-8 py-4">{order?._id}</td>
      <td className="border px-8 py-4">
        <h1>{order?.billingAddress.name}</h1>
        <h1>{order?.billingAddress.province}</h1>
        <h1>{order?.billingAddress.district}</h1>
        <h1>{order?.billingAddress.phone}</h1>
      </td>
      <td className="border px-8 py-4">
        {order?.items.map((i) => (
          <div>
            <h1>{i.name}</h1>
            <h1>{i.qty}</h1>
          </div>
        ))}
      </td>
      <td className="border px-8 py-4">{order?.totalQuantity}</td>
      <td className="border px-8 py-4">{order?.totalPrice}</td>
      <td className="border px-8 py-4">{order?.paymentMethod}</td>
      <td className="border px-8 py-4">{order?.note}</td>
      <td className="border px-8 py-4">{order?.createdAt}</td>
      <td className="border px-8 py-4">{order?.deliveryStatus}</td>
    </tr>
  );
};
const memoizedOrder = memo(OrderExtent);
export default memoizedOrder;
