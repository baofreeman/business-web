import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getSelectors,
  useLazyGetVariantsQuery,
} from "../../api/productsApiSlice";
import { addToCart } from "../../api/cartSlice";

import { Loading, Select, Button, Errors } from "../ui";
import { convertPrice } from "../../config";

const ModalItem = () => {
  const [searchParams] = useSearchParams();
  const [disable, setDisable] = useState("");

  const productId = searchParams.get("productId"); // GET productId params
  const [isColor, setIsColor] = useState("");
  const dispatch = useDispatch();

  // // GET product.
  // const { product } = useGetProductsQuery(
  //   {},
  //   {
  //     selectFromResult: ({ data }) => ({
  //       product: data?.entities[productId],
  //     }),
  //   }
  // );

  const { selectById } = getSelectors({});
  const product = useSelector(selectById(productId));

  // // GET variants Product with lazy query
  const [trigger, result] = useLazyGetVariantsQuery();
  const { data, error, isError, isLoading } = result;

  const items = product?.subCategory.flatMap(({ tag, model, _id }) => ({
    tag,
    model,
    _id,
  }));

  // // Choose Size
  const handleSize = (e) => {
    let itemId = e.target.value;
    setDisable(itemId);
    trigger(itemId);
  };

  // Add to cart
  const handleAddCart = async () => {
    if (result?.status === "fulfilled") {
      await dispatch(addToCart(data[0]));
      trigger("");
      setDisable("");
      setIsColor("");
    } else {
      setDisable("");
      return error.message;
    }
  };
  return (
    <div className="flex w-full sm:flex-col overflow-hidden h-[100%]">
      {productId ? (
        <div className="flex w-full items-start justify-center gap-6">
          <div className="flex h-full w-[30%] flex-col gap-2">
            <h1 className="line-clamp-2 pr-[10px] select-none">
              {product?.name}
            </h1>
            <div className="w-full h-[80px] overflow-scroll no-scrollbar">
              <span className="text-silver">{product?.description}</span>
            </div>
          </div>
          <div className="flex w-[70%] gap-2 h-[100%] sm:flex-col">
            <div className="flex flex-row gap-4 w-[70%] sm:w-full sm:flex-col flex-wrap sm:h-[100px] overflow-y-scroll scroll-smooth lg:no-scrollbar xl:no-scrollbar 2xl:no-scrollbar sm:overflow-x-scroll sm:overflow-y-hidden">
              {items?.map((item) => (
                <div
                  key={item?._id}
                  className="flex flex-col basic-1/2 grow min-w-0 items-start h-[100%] gap-2 border rounded p-[10px] uppercase"
                >
                  <h1 className="px-2 cursor-pointers w-full">{item.tag}</h1>
                  <div className="px-2 flex flex-col sm:h-[62px] w-full items-start h-[100%] justify-between gap-2 sm:flex-nowrap scroll-smooth overflow-y-scroll">
                    {item.model.map((z) => (
                      <div
                        key={z._id}
                        className="flex items-center gap-2 py-2 flex-1 w-full"
                      >
                        <div className="flex gap-2 pr-[6px]">
                          <input
                            type="checkbox"
                            value={z._id}
                            onChange={(e) => {
                              setIsColor(e.target.value);
                            }}
                            checked={z._id === isColor}
                            id={`color-${z._id}`}
                          />
                          <label
                            className={
                              z._id === isColor
                                ? `text-active cursor-pointer`
                                : "cursor-pointer"
                            }
                            htmlFor={`color-${z._id}`}
                          >
                            {z.color}
                          </label>
                        </div>
                        <div className="flex-1 w-full">
                          <Select
                            design="basic"
                            onChange={(e) => handleSize(e)}
                            disabled={z._id !== isColor}
                            label={"Kích cỡ"}
                          >
                            {z.skus.map((s) => (
                              <option key={s._id} value={s._id}>
                                {s.size}
                              </option>
                            ))}
                          </Select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row sm:w-full gap-2 items-center justify-center w-[30%]">
              <div className="flex w-full gap-4">
                <h1 className="text-silver">GIÁ: </h1>
                {isLoading && <Loading />}
                {data && data[0]?.subCategory?.model?.skus?.price && (
                  <h1 className="text-orange">
                    {convertPrice(data[0]?.subCategory?.model?.skus?.price)}
                  </h1>
                )}
              </div>
              <Button
                size="m"
                design={!disable ? "disable" : "primary"}
                width="full"
                onClick={handleAddCart}
                disabled={!disable}
              >
                Thêm giỏ hàng
              </Button>
            </div>
          </div>
          {isError && <Errors>{error.message}</Errors>}
        </div>
      ) : (
        <span className="text-silver flex justify-center items-center h-[100%] w-full">
          CHỌN SẢN PHẨM ĐỂ XEM CHI TIẾT
        </span>
      )}
    </div>
  );
};

export default ModalItem;
