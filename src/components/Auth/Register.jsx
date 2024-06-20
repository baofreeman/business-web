import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../ui/Input/Input";
import Button from "../ui/Button/Button";
import { useCreateUserMutation } from "../../api/usersApiSlice";
import Errors from "../ui/Errors/Errors";
import { schema } from "./ValidateRegister";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [roles] = useState(["Custommer"]); // Set roles.
  const [createUser] = useCreateUserMutation(); // Create user mutation.
  const navigate = useNavigate();
  const [msg, setMsg] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const { username, password } = data;

    // Data User.
    const newData = {
      username,
      password,
      roles,
    };

    try {
      const res = await createUser(newData);
      if (res.error) {
        const { message } = res.error.data;
        setMsg(message);
        return toast.error(message);
      }
      if (window.history.state && window.history.state.idx > 0) {
        navigate(-1);
      }

      if (res.data) {
        navigate("/shop");
        return toast.success(res.data.message);
      }
    } catch (error) {
      return error;
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
          / <h1 className="text-active">Đăng ký</h1> /
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
        <Errors>{msg}</Errors>
        <Button size="l" design="primary" width="120" type={"submit"}>
          đăng ký
        </Button>
      </form>
    </section>
  );
};

export default Register;
