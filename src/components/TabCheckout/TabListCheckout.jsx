import React, { useCallback, useEffect } from "react";
import CheckoutForm from "../form/checkoutForm/CheckoutForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchProvince, getProvince } from "../../api/countrySlice";

const TabListCheckout = () => {
  return (
    <div className="w-full">
      <CheckoutForm />
    </div>
  );
};

export default TabListCheckout;
