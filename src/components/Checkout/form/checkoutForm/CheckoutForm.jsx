import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  resetCart,
  selectCartItem,
  selectTotalAmount,
  selectTotalQuatity,
} from "../../../../api/cartSlice";
import {
  fetchDistrict,
  fetchProvince,
  getDistrict,
  getProvince,
} from "../../../../api/countrySlice";
import { useAddOrderMutation } from "../../../../api/ordersApiSlice";

import useAuth from "../../../../hook/useAuth";
import { schema } from "./schema";

import { Input, Select, Button, Textarea, Errors } from "../../../ui";
import { SHIPPINGFEE } from "../../../../contants";
import { convertPrice } from "../../../../config";

const CheckoutForm = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [shipping, setShipping] = useState();
  const [payment, setPayment] = useState();
  const provinces = useSelector(getProvince);
  const districts = useSelector(getDistrict);

  const { username, userId } = useAuth();
  const cart = useSelector(selectCartItem);

  const itemsPrice = useSelector(selectTotalAmount);
  const totalQuantity = useSelector(selectTotalQuatity);

  const fetchMyAPI = useCallback(async () => {
    await dispatch(fetchProvince());
  }, []);

  const fetchDistrictApi = useCallback(async () => {
    await dispatch(fetchDistrict(province));
  }, [province]);

  useEffect(() => {
    fetchMyAPI();
  }, []);

  useEffect(() => {
    fetchDistrictApi();
  }, [province]);

  const handleProvince = (e) => {
    setProvince(e.target.value);
    clearErrors("province");
  };
  const handleDistrict = (e) => {
    setDistrict(e.target.value);
    clearErrors("district");
  };

  const handleChangeShipping = (e) => {
    setShipping(Number(e.target.value));
    clearErrors("shipping");
  };

  const handleChangePaymentMethod = (e) => {
    setPayment(e.target.value);
    clearErrors("paymentMethod");
  };
  const [addOrder, { isLoading, isError, error }] = useAddOrderMutation();

  const onSubmit = async (data) => {
    const {
      name,
      phone,
      province,
      district,
      address,
      note,
      paymentMethod,
      shippingPrice,
    } = data;
    const valueProvince = provinces.find(
      ({ province_id }) => province_id === province
    );
    const valueDistrict = districts.find(
      ({ district_id }) => district_id === district
    );
    let totalPrice = Number(itemsPrice) + Number(shippingPrice);
    const newData = {
      cart,
      name,
      phone,
      province: valueProvince.province_name,
      district: valueDistrict.district_name,
      userId: userId,
      address,
      note,
      totalQuantity,
      itemsPrice,
      shippingPrice,
      totalPrice,
      paymentMethod,
    };
    if (cart.length) {
      if (paymentMethod) {
        try {
          const res = await addOrder(newData);
          if (res.data) {
            navigate(res.data?.url);
            toast.success("Đặt hàng thành công");
            dispatch(resetCart());
          }
        } catch {
          if (isError) toast(error.message);
        }
      }
    }
  };

  return (
    <section className="flex flex-col p-[50px] sm:p-[0px] justify-center items-center w-full rounded gap-4">
      {cart.length ? (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex sm:flex-col md:flex-col gap-16 sm:gap-4 md:gap-[20px] pb-[20px] sm:pb-[10px]">
            <div className="flex w-full gap-2">
              <label className="basis-1/2">Tên người nhận</label>
              <Input
                size={"m"}
                design={"basic"}
                placeholder="Tên"
                name="name"
                register={register}
                error={errors.name?.message}
              />
            </div>
            <div className="flex w-full gap-2">
              <label className="basis-1/2">Số điện thoại</label>
              <Input
                size={"m"}
                design={"basic"}
                placeholder="Số điện thoại"
                name="phone"
                register={register}
                error={errors.phone?.message}
              />
            </div>
          </div>
          <div className="flex md:flex-col sm:flex-col gap-16 md:gap-[20px] sm:gap-4 pb-[20px] sm:pb-[10px]">
            <div className="flex w-full gap-2">
              <label className="basis-1/2">Tỉnh thành</label>
              <Select
                size={"m"}
                design={"basic"}
                placeholder="Thành phố/Tỉnh"
                name="province"
                label={"Tỉnh/Thành"}
                register={register}
                onChange={(e) => handleProvince(e)}
                error={errors.province && errors.province?.message}
              >
                {provinces?.map((item) => (
                  <option value={item.province_id} key={item.province_id}>
                    {item.province_name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="flex w-full gap-2">
              <label className="basis-1/2">Quận huyện</label>
              <Select
                size={"m"}
                design={"basic"}
                placeholder="Quận/Huyện"
                name="district"
                register={register}
                label={"Quận/Huyện"}
                onChange={(e) => handleDistrict(e)}
                error={errors.district && errors.district?.message}
              >
                {districts?.map((item) => (
                  <option value={item.district_id} key={item.district_id}>
                    {item.district_name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="flex w-full gap-2">
              <label className="basis-1/2">Địa chỉ</label>
              <Input
                size={"m"}
                design={"basic"}
                placeholder="Địa chỉ cụ thể"
                name="address"
                register={register}
                error={errors.address?.message}
              />
            </div>
          </div>

          <div className="flex sm:flex-col w-full gap-4 pb-[20px] sm:pb-[10px]">
            <div className="flex sm:flex-col flex-1 flex-col gap-2">
              <h1 className="sm:basis-1/2">Phương thức vận chuyển</h1>
              <div className="flex flex-col gap-3 justify-center border p-[10px]">
                <div className="flex gap-2">
                  <Input
                    size={"m"}
                    type="radio"
                    design={"basic"}
                    value={SHIPPINGFEE[0]}
                    name="shippingPrice"
                    id="field-freeship"
                    onChange={(e) => handleChangeShipping(e)}
                    register={register}
                    checked={username}
                    disabled={!username}
                  />
                  <label
                    htmlFor="field-freeship"
                    className={
                      shipping === SHIPPINGFEE[0] || username
                        ? "text-active cursor-pointer"
                        : "cursor-pointer"
                    }
                  >
                    <span className={!username ? "opacity-30 mr-2" : "mr-2"}>
                      Miễn phí vận chuyển
                    </span>
                    <span className="text-silver">
                      (Thành viên đã đăng ký tài khoản)
                    </span>
                  </label>
                </div>
                <div className="flex gap-2">
                  <Input
                    size={"m"}
                    type="radio"
                    design={"basic"}
                    value={SHIPPINGFEE[1]}
                    name="shippingPrice"
                    id="field-fast"
                    onChange={(e) => handleChangeShipping(e)}
                    register={register}
                    checked={!username}
                    disabled={username}
                  />
                  <label
                    htmlFor="field-fast"
                    className={
                      shipping === SHIPPINGFEE[1] || !username
                        ? "text-active cursor-pointer"
                        : "cursor-pointer"
                    }
                  >
                    <span className={username ? "opacity-30 mr-2" : "mr-2"}>
                      Giao hàng đồng giá
                    </span>
                    <span className={username ? "opacity-30" : "text-orange"}>
                      {`(${convertPrice(SHIPPINGFEE[1])})`}
                    </span>
                  </label>
                </div>
                {errors.shipping && <Errors>{errors.shipping?.message}</Errors>}
              </div>
            </div>

            <div className="flex sm:flex-col flex-1 flex-col gap-2">
              <h1 className="sm:basis-1/2">Phương thức thanh toán</h1>
              <div className="flex flex-col gap-3 justify-center border p-[10px]">
                <div className="flex gap-2">
                  <Input
                    size={"m"}
                    type="radio"
                    design={"basic"}
                    value="payment-cod"
                    name="paymentMethod"
                    id="field-payment-cod"
                    onChange={(e) => handleChangePaymentMethod(e)}
                    register={register}
                  />
                  <label
                    htmlFor="field-payment-cod"
                    className={
                      payment === "payment-cod"
                        ? "text-active cursor-pointer"
                        : "cursor-pointer"
                    }
                  >
                    Thanh toán khi nhận hàng
                  </label>
                </div>
                <div className="flex gap-2">
                  <Input
                    size={"m"}
                    type="radio"
                    design={"basic"}
                    value="payment-card"
                    name="paymentMethod"
                    id="field-payment-card"
                    onChange={(e) => setPayment(e.target.value)}
                    register={register}
                    disabled={true}
                  />
                  <label
                    htmlFor="field-payment-card"
                    className={
                      payment === "payment-card"
                        ? "text-active cursor-pointer"
                        : "text-silver cursor-pointer"
                    }
                  >
                    Thanh toán bằng thẻ ngân hàng (Tạm ngưng)
                  </label>
                </div>
                {errors.paymentMethod && (
                  <Errors>{errors.paymentMethod?.message}</Errors>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 pb-[20px] sm:pb-[10px]">
            <label className="basis-1/2">Ghi chú</label>
            <Textarea size="m" design="basic" name="note" register={register} />
          </div>

          <Button
            size="l"
            design={isLoading ? "disable" : "primary"}
            width="120"
            type={"submit"}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "đặt hàng"}
          </Button>
        </form>
      ) : (
        <h1>Bạn chưa có sản phẩm nào để thanh toán</h1>
      )}
    </section>
  );
};

export default CheckoutForm;
