import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { loginSchema } from "./schema";
import { useLoginUserMutation } from "../../api/authApiSlice";
import { Input, Button, Loading, Errors } from "../ui/index";

const Login = () => {
  const [loginUser] = useLoginUserMutation(); // Login mutation.
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      const res = await loginUser(values);
      if (res.data) {
        reset();
        window.location.replace("/");
        toast.success(res.data.message);
        setIsLoading(false);
      }

      if (res.error) {
        setIsLoading(false);
        toast.error(res.error.data.message);
      }
    } catch (error) {
      setIsLoading(false);
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
            / <h1 className="text-active">Đăng nhập</h1> /
          </span>
          <div className="flex items-center gap-2 w-full">
            <label className="w-[130px]">Email</label>
            <Input
              size={"m"}
              design={"basic"}
              placeholder="email"
              name="email"
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
          {/* <Errors>{msg}</Errors> */}
          <Button
            size="s"
            design="link-primary"
            to={"/account/reset-password-link"}
          >
            quên mật khẩu
          </Button>

          <Button
            size="l"
            design="primary"
            width="120"
            type={"submit"}
            disabled={isLoading}
          >
            đăng nhập
          </Button>
        </form>
      </section>
    </>
  );
};

export default Login;
