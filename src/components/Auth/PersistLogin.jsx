import React, { useEffect, useRef, useState } from "react";
import usePersist from "../../hook/usePresist";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../api/authSlice";
import { useRefreshMutation } from "../../api/authApiSlice";
import { Outlet } from "react-router-dom";
import Button from "../ui/Button/Button";
import Loading from "../ui/Loading/Loading";

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentUser);
  const effectRan = useRef(false);
  const [trueSuccess, setTrueSuccess] = useState(false);
  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();
  useEffect(() => {
    if (effectRan.current === false || process.env.NODE_ENV !== "development") {
      const verifyRefreshToken = async () => {
        console.log("verifyting refresh token");
        try {
          await refresh();
          setTrueSuccess(true);
        } catch (error) {
          return error;
        }
      };
      if (!token && persist) verifyRefreshToken();
    }
    return () => (effectRan.current = true);
  }, []);

  let content;
  if (!persist || persist == false) {
    content = <Outlet />;
  } else if (isLoading) {
    content = <Loading />;
  } else if (isError) {
    window.location("/shop");
    content = (
      <div className="w-full flex flex-col gap-4 items-center justify-center h-[100%]">
        {error?.data?.message}
        <Button size="m" design="primary" to={"/login"}>
          Đăng nhập
        </Button>
        <Button size="m" design="primary" to={"/shop"}>
          Shop
        </Button>
      </div>
    );
  } else if (isSuccess && trueSuccess) {
    console.log("success");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    console.log("token and uninit");
    content = <Outlet />;
  }
  return content;
};

export default PersistLogin;
