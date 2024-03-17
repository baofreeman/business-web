import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectCartItem,
  selectTotalAmount,
  selectTotalQuatity,
} from "../../api/cartSlice";
import useAuth from "../../hook/useAuth";
import { shippingValue } from "../../services/option";
import { convertPrice } from "../../config/convertPrice";
import Loading from "../ui/Loading/Loading";

const TabCheckout = () => {
  const cart = useSelector(selectCartItem);
  const itemsPrice = useSelector(selectTotalAmount);
  const totalQuatity = useSelector(selectTotalQuatity);
  const [shipping, setShipping] = useState();
  const { roles } = useAuth();
  const totalPrice = useMemo(() => {
    let total = 0;
    if (roles.length) {
      total = itemsPrice + shippingValue[0];
      return total;
    } else {
      total = itemsPrice + shippingValue[1];
      return total;
    }
  }, [roles]);

  useEffect(() => {
    if (roles.length) {
      setShipping(shippingValue[0]);
    } else {
      setShipping(shippingValue[1]);
    }
  }, [roles]);

  return (
    <div className="overflow-auto no-scrollbar w-full">
      <section className="w-full">
        <table className="w-full p-[20px] sm:p-[0px] uppercase">
          <thead className="sm:text-xs">
            <tr>
              <th className="text-left text-center px-2 py-4 sm:p-1">
                Sản phẩm
              </th>
              <th className="text-left text-center px-2 py-4 sm:p-1">
                Chi tiết
              </th>
              <th className="text-left text-center px-2 py-4 sm:p-1">
                Số lượng
              </th>
              <th className="text-left text-center px-2 py-4 sm:p-1">Giá</th>
            </tr>
          </thead>
          <tbody className="sm:text-xs">
            {cart?.map((i) => (
              <tr className="w-full" key={i.subCategory.model.skus._id}>
                <td
                  className="border text-center h-full px-2"
                  style={{ height: "100%" }}
                >
                  <img
                    src={`${process.env.REACT_APP_SERVER_URL}/uploads/products/${i?.productImg[0]}`}
                    height={"100%"}
                    style={{ marginLeft: "auto", marginRight: "auto" }}
                    className="w-[60px] sm:w-[20px]"
                  />
                </td>
                <td className="border text-center px-2 py-4 sm:p-1">
                  <h1 className="uppercase text-ellipsis line-clamp-2">
                    {i.name}
                  </h1>
                  <h1 className="text-silver">{i.subCategory.model.color}</h1>
                  <h1 className="text-silver">
                    {i.subCategory.model.skus.size}
                  </h1>
                </td>
                <td className="border text-center px-2 py-4 sm:p-1">{i.qty}</td>
                <td className="border text-center px-2 py-4 sm:p-1">
                  {i.subCategory.model.skus.price * i?.qty ? (
                    convertPrice(i.subCategory.model.skus.price * i?.qty)
                  ) : (
                    <Loading />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <div className="border rounded p-[10px] mt-[20px] sm:my-[10px] sm:p-[6px] sm:text-xs">
        <div className="rounded px-[20px] py-[10px] sm:px-[6px] sm:py-[4px] flex gap-2">
          <h1>Tổng sản phẩm: </h1>
          <span className="text-orange">{totalQuatity}</span>
        </div>
        <div className="rounded px-[20px] py-[10px] sm:px-[6px] sm:py-[4px] flex gap-2">
          <h1>Tổng cộng: </h1>
          <span className="text-orange">{convertPrice(itemsPrice)}</span>
        </div>
        <div className="rounded px-[20px] py-[10px] sm:px-[6px] sm:py-[4px] flex gap-2">
          <h1>Phí giao hàng: </h1>
          <span className="text-orange">
            {cart.length && convertPrice(shipping)}
          </span>
        </div>
        <div className="rounded px-[20px] py-[10px] sm:px-[6px] sm:py-[4px] flex gap-2">
          <h1>Tổng cộng thanh toán: </h1>
          <span className="text-orange">
            {cart.length && convertPrice(totalPrice)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TabCheckout;
