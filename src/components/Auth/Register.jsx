import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRegisterUserMutation } from "../../api/authApiSlice";
import { registerSchema } from "./schema";
import { Input, Button, Loading } from "../ui/index";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [registerUser] = useRegisterUserMutation(); // Create user mutation.
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (values, action) => {
    setIsLoading(true);
    try {
      const res = await registerUser(values);
      console.log(res);
      if (res.data) {
        toast.success(res.data.message);
        reset();
        navigate("/account/verify-email");
        setIsLoading(false);
      }

      if (res.error) {
        toast.error(res.error.data.message);
        setIsLoading(false);
      }
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      {isLoading && <Loading />}
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
            <label htmlFor="username" className="w-[130px]">
              Tên đăng nhập
            </label>
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
            <label htmlFor="email" className="w-[130px]">
              Email
            </label>
            <Input
              size={"m"}
              design={"basic"}
              placeholder="Email"
              name="email"
              register={register}
              error={errors.email?.message}
            />
          </div>

          <div className="flex items-center gap-2 w-full">
            <label htmlFor="password" className="w-[130px]">
              Mật khẩu
            </label>
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
          <div className="flex items-center gap-2 w-full">
            <label htmlFor="password_confirmation" className="w-[130px]">
              Mật khẩu
            </label>
            <Input
              size={"m"}
              design={"basic"}
              name="password_confirmation"
              placeholder="password"
              type={"password"}
              register={register}
              error={errors.password_confirmation?.message}
            />
          </div>
          <Button
            size="l"
            design="primary"
            width="120"
            type={"submit"}
            disabled={isLoading}
          >
            đăng ký
          </Button>
        </form>
      </section>
    </>
  );
};

export default Register;
