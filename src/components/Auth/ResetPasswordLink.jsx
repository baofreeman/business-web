import { useState } from "react";
import { useResetPasswordLinkMutation } from "../../api/authApiSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordLinkSchema } from "./schema";
import { toast } from "react-toastify";
import { Input, Button, Loading } from "../ui/index";

const ResetPasswordLink = () => {
  const [resetPasswordLink] = useResetPasswordLinkMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordLinkSchema),
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      const res = await resetPasswordLink(values);
      if (res.data) {
        setIsLoading(false);
        setMsg(res.data.message);
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
            <label htmlFor="email" className="w-[130px]">
              Email
            </label>
            <Input
              size={"m"}
              design={"basic"}
              name="email"
              placeholder="email"
              type={"email"}
              register={register}
              error={errors.email?.message}
            />
          </div>

          {msg && <p>{msg}</p>}

          <Button size="l" design="primary" width="120" type={"submit"}>
            Xác nhận
          </Button>
        </form>
      </section>
    </>
  );
};

export default ResetPasswordLink;
