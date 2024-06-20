import React from "react";
import useAuth from "../../hook/useAuth";
import Button from "../ui/Button/Button";

const FilterCart = () => {
  const { username } = useAuth(); // Authentication

  return (
    <div className="w-full">
      {!username ? (
        <span className="text-silver text-center md:flex md:flex-col md:w-full sm:flex sm:flex-col sm:w-full sm:gap-1 md:gap-1">
          Đăng ký tài khoản thành viên để nhập thêm nhiều ưu đãi{" "}
          <Button size="s-link" design="link-primary" to={"/register"}>
            đăng ký
          </Button>
        </span>
      ) : (
        <span className="text-silver text-center md:flex md:flex-col md:w-full sm:flex sm:flex-col sm:w-full sm:gap-1 md:gap-1">
          Bạn đã đăng ký thành viên sẽ được{" "}
          <span className="text-orange">miễn phí vận chuyển</span>
        </span>
      )}
    </div>
  );
};

export default FilterCart;
