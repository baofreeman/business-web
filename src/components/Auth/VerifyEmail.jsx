import { useState } from "react";
import { Input, Button, Loading } from "../ui/index";
import { useForm } from "react-hook-form";
import { verifyEmailSchema } from "./schema";
import { useVerifyEmailMutation } from "../../api/authApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

const VerifyEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [verifyEmail] = useVerifyEmailMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(verifyEmailSchema),
  });
  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      const res = await verifyEmail(values);
      if (res.data) {
        toast.success(res.data.message);
        reset();
        navigate("/account/login");
        setIsLoading(false);
      }
      if (res.error) {
        toast.error(res.error.data.message);
        setIsLoading(false);
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
            / <h1 className="text-active">Xác minh</h1> /
          </span>

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
            <label htmlFor="otp" className="w-[130px]">
              OTP
            </label>
            <Input
              size={"m"}
              design={"basic"}
              placeholder="OTP"
              name="otp"
              register={register}
              error={errors.otp?.message}
            />
          </div>

          {/* <Errors>{msg}</Errors> */}
          <Button
            size="l"
            design="primary"
            width="120"
            type={"submit"}
            disabled={isLoading}
          >
            Gửi
          </Button>
        </form>
      </section>
    </>
  );
};

export default VerifyEmail;
