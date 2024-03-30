import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../ui/Input/Input";
import Button from "../ui/Button/Button";
import { useCreateUserMutation } from "../../api/usersApiSlice";
import Errors from "../ui/Errors/Errors";
import { schema } from "./ValidateRegister";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../api/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../api/authSlice";
import useAuth from "../../hook/useAuth";
import usePersist from "../../hook/usePresist";
import { toast } from "react-toastify";

const Login = () => {
  const [roles] = useState(["Custommer"]);
  const [msg, setMsg] = useState();
  const [persist, setPresist] = usePersist();
  const handleToggle = () => {
    if (watchName || watchPw) {
      setPresist((prev) => !prev);
    }
  };
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const watchName = watch("username");
  const watchPw = watch("password");
  const onSubmit = async (data) => {
    const { username, password } = data;
    const newData = {
      username,
      password,
      roles,
    };
    try {
      const res = await login(newData);
      const { accessToken } = res.data;
      dispatch(setCredentials({ accessToken }));
      toast.success("Đăng nhập thành công");
      navigate("/");
    } catch (error) {
      if (!error.status) {
        setMsg("Tài khoản hoặc mật khẩu không đúng");
        toast.error("Đăng nhập thất bại");
      } else if (error.status === 400) {
        setMsg("missing username or password");
        toast.error("Đăng nhập thất bại");
      } else if (error.status === 401) {
        setMsg("unauthozied");
        toast.error("Đăng nhập thất bại");
      } else {
        setMsg(error.data.message);
        toast.error("Đăng nhập thất bại");
      }
    }
  };

  return (
    <section
      className="flex flex-col gap-6 w-full justify-center items-center"
      style={{ height: "100%" }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-[400px] gap-8 justify-center items-center"
      >
        <span className="text-base uppercase flex gap-2">
          / <h1 className="text-active">Đăng nhập</h1> /
        </span>
        <div className="flex items-center gap-2 w-full">
          <label className="w-[130px]">Tên đăng nhập</label>
          <Input
            size={"m"}
            design={"basic"}
            placeholder="username"
            name="username"
            register={register}
            error={errors.username?.message}
          />
        </div>

        <div className="flex items-center gap-2 w-full">
          <label className="w-[130px]">Mật khẩu</label>
          <Input
            size={"m"}
            design={"basic"}
            name="password"
            placeholder="password"
            type={"password"}
            register={register}
            error={errors.password?.message}
          />
        </div>
        <div className="flex items-center gap-2">
          <Input
            name={"persist"}
            id={"persist"}
            size="sm"
            type="checkbox"
            checked={persist}
            placeholder="Persist"
            register={register}
            onChange={handleToggle}
            disabled={!watchName && !watchPw}
          />
          <label
            htmlFor="persist"
            className={
              persist
                ? "text-active cursor-pointer"
                : "text-silver cursor-pointer"
            }
          >
            Duy trì đăng nhập
          </label>
        </div>
        <Errors>{msg}</Errors>

        <Button size="l" design="primary" width="120" type={"submit"}>
          đăng nhập
        </Button>
      </form>
    </section>
  );
};

export default Login;
