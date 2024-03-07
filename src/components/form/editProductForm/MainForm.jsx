import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../../ui/Input/Input";
import Select from "../../ui/Select/Select";
import Textarea from "../../ui/Textarea/Textarea";

const MainForm = ({ product }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    setValue("name", product?.name);
    setValue("category", product?.category);
    setValue("description", product?.description);
  }, []);
  const onSubmit = (data) => {
    console.log(data);
  };
  console.log(product.subCategory);
  return (
    <div className="flex flex-col p-4 border rounded-md gap-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="flex flex-col gap-2 w-full">
          <div className="flex gap-2 w-full">
            <label className="basis-1/2">Tên sản phẩm</label>
            <Input
              size={"m"}
              design={"basic"}
              placeholder="Tên sản phẩm"
              name="name"
              register={register}
              error={errors.name?.message}
            />
          </div>

          <div className="flex gap-2 w-full">
            <label className="basis-1/2">Danh mục</label>
            <Input
              size={"m"}
              design={"basic"}
              placeholder="Danh mục"
              name="category"
              register={register}
              error={errors.name?.message}
            />
          </div>

          <div className="flex gap-2 w-full">
            <label className="basis-1/2">Mô tả</label>
            <Textarea
              size={"m"}
              design={"basic"}
              name="description"
              register={register}
              error={errors.name?.message}
            />
          </div>
        </section>
        <input type="submit" />
      </form>
    </div>
  );
};

export default MainForm;
