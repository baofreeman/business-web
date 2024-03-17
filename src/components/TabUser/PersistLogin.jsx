import React, { useEffect, useRef, useState } from "react";
import usePersist from "../../hook/usePresist";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../api/authSlice";
import { useRefreshMutation } from "../../api/authApiSlice";
import { Link, Outlet } from "react-router-dom";

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentUser);
  const effectRan = useRef(false);
  const [trueSuccess, setTrueSuccess] = useState(false);
  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();
  useEffect(() => {
    if (effectRan.current === false || process.env.NODE_ENV !== "developmemt") {
      const verifyRefreshToken = async () => {
        console.log("verifyting refresh token");
        try {
          await refresh();
          setTrueSuccess(true);
        } catch (error) {
          console.log(error);
        }
      };
      if (!token && persist) verifyRefreshToken();
    }
    return () => (effectRan.current = true);
  }, []);

  let content;
  if (!persist || persist == false) {
    // console.log("no persist");
    content = <Outlet />;
  } else if (isLoading) {
    // console.log("is loading");
    content = <p>Loading...</p>;
  } else if (isError) {
    // console.log("Error");
    content = (
      <p>
        {error?.data?.message}
        <Link to={"/login"}>Please Login</Link>
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    // console.log("success");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    // console.log("token and uninit");
    content = <Outlet />;
  }
  return content;
};

export default PersistLogin;
