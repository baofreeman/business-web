import React, { memo, useRef } from "react";
import { useGetProductsQuery } from "../../api/productsApiSlice";
import { useDispatch } from "react-redux";
import { setSibarRight } from "../../api/toggleSlice";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { convertPrice } from "../../config/convertPrice";

const TabItem = ({ productId }) => {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const { category } = useParams();
  const tag = searchParams.get("tag");
  const color = searchParams.get("color");
  const size = searchParams.get("size");
  const { product } = useGetProductsQuery(
    { tag, color, size },
    {
      selectFromResult: ({ data }) => ({ product: data?.entities[productId] }),
    }
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSR = () => {
    dispatch(setSibarRight(true));
    navigate({
      pathname: category ? `/shop/${category}` : "/shop",
      search: createSearchParams({
        ...params,
        productId: product?._id,
      }).toString(),
    });
  };

  const price = product?.subCategory?.flatMap(({ tag, model }) =>
    model?.map(({ color, skus }) => skus.map(({ price }) => price))
  );
  let min = price && Math.min(...price[0]);
  let max = price && Math.max(...price[0]);
  const srRef = useRef();
  return (
    <div className="w-full outline hover:outline-orange hover:outline-4 focus-within:outline-orange focus-within:outline-4 rounded">
      <div
        className="w-full h-full pb-[20px] sm:pb-[10px] border rounded cursor-pointer"
        ref={srRef}
        onClick={handleSR}
      >
        <section className="w-full flex flex-col relative p-0 gap-4 uppercase">
          <div className="w-full block pb-[150%] relative">
            <img
              className="w-full max-h-full absolute top-0 left-0 right-0 object-cover"
              src={`${process.env.REACT_APP_SERVER_URL}/uploads/products/${product?.productImg[0]}`}
              alt="No product"
            />
          </div>
          <div className="flex flex-col justify-between items-center px-[10px] gap-2 sm:gap-1 w-full flex-1">
            <h1 className="flex-1 w-full justify-center items-center text-md whitespace-nowrap overflow-hidden text-ellipsis">
              {product?.name}
            </h1>
            <div className="text-sm flex justify-between items-center w-full gap-2 sm:gap-1">
              <h1 className="text-silver sm:hidden">Giá</h1>
              <h1 className="text-sm text-silver whitespace-wrap text-center">
                {max === min
                  ? convertPrice(max)
                  : convertPrice(min) - convertPrice(max)}
              </h1>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default memo(TabItem);
