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

const Login = () => {
  const [roles, setRoles] = useState(["Custommer"]);
  const [msg, setMsg] = useState();
  const [persist, setPresist] = usePersist();
  const handleToggle = () => {
    setPresist((prev) => !prev);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const navigate = useNavigate();
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
      navigate("/");
    } catch (error) {
      console.log(error);
      if (!error.status) {
        setMsg("Tài khoản hoặc mật khẩu không đúng");
      } else if (error.status === 400) {
        setMsg("missing username or password");
      } else if (error.status === 401) {
        setMsg("unauthozied");
      } else {
        setMsg(error.data.message);
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
            register={register}
            error={errors.password?.message}
          />
        </div>
        <div className="flex items-center gap-2">
          <Input
            name={"persist"}
            size="sm"
            type="checkbox"
            checked={persist}
            placeholder="Persist"
            register={register}
            onChange={handleToggle}
          />
          <label className={persist ? "text-active" : ""}>
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
