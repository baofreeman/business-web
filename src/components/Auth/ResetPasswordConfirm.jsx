import { useState } from "react";
import { useResetPasswordMutation } from "../../api/authApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordSchema } from "./schema";
import { toast } from "react-toastify";
import { Input, Button, Loading } from "../ui/index";

const ResetPasswordConfirm = () => {
  const { id, token } = useParams();
  const [resetPassword] = useResetPasswordMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      const data = { id, token, ...values };
      const res = await resetPassword(data);
      if (res.data) {
        setIsLoading(false);
        reset();
        navigate("/");
        toast.success(res.data.message);
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
            / <h1 className="text-active">Quên mật khẩu</h1> /
          </span>

          <div className="flex items-center gap-2 w-full">
            <label htmlFor="password" className="w-[130px]">
              Mật khẩu mới
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
              Nhập lại mật khẩu
            </label>
            <Input
              size={"m"}
              design={"basic"}
              name="password_confirmation"
              placeholder="confirm password"
              type={"password"}
              register={register}
              error={errors.password_confirmation?.message}
            />
          </div>

          <Button size="l" design="primary" width="120" type={"submit"}>
            Xác nhận
          </Button>
        </form>
      </section>
    </>
  );
};

export default ResetPasswordConfirm;
