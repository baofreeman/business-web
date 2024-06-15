import React, { memo, useEffect, useRef, useState } from "react";
import { useGetProductsQuery } from "../../api/productsApiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { convertPrice } from "../../config/convertPrice";
import { selectSidebarRight, setSidebarRight } from "../../api/toggleSlice";

const ItemProduct = ({ productId }) => {
  //Get params
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());

  const categoryQuery = searchParams.get("category");
  const tagQuery = searchParams.get("tag");
  const colorQuery = searchParams.get("color");
  const sizeQuery = searchParams.get("size");
  const openSidebarRight = useSelector(selectSidebarRight);

  //GET product filter or allproduct
  const { product } = useGetProductsQuery(
    {
      category: categoryQuery,
      tag: tagQuery,
      color: colorQuery,
      size: sizeQuery,
    },
    {
      selectFromResult: ({ data }) => ({ product: data?.entities[productId] }),
    }
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const srRef = useRef();

  const handleSR = () => {
    if (openSidebarRight == false) {
      dispatch(setSidebarRight(true));
    }
    navigate({
      pathname: "/shop",
      search: createSearchParams({
        productId: product?._id,
      }).toString(),
    });
  };

  //Caculating Price
  const price = product?.subCategory?.flatMap(({ model }) =>
    model?.map(({ skus }) => skus.map(({ price }) => price))
  );
  let min = price && Math.min(...price[0]);
  let max = price && Math.max(...price[0]);
  const refProduct = useRef();
  const selectedProduct = () => {
    const defaultValue = refProduct.current.getAttribute("defaultValue");
    if (defaultValue === productId) {
      setActive(true);
    }
  };

  useEffect(() => {
    selectedProduct();
    console.log(active);
  }, [productId]);

  return (
    <div
      data-active={active}
      ref={refProduct}
      defaultValue={productId}
      className={`w-full outline dark:outline-gray data-[active=true]:outline-orange dark:hover:outline-orange hover:outline-orange hover:outline-4 rounded`}
      onClick={selectedProduct}
    >
      <div
        className="w-full h-full pb-[20px] sm:pb-[10px] rounded cursor-pointer"
        ref={srRef}
        onClick={() => handleSR()}
      >
        <section className="w-full flex flex-col relative p-0 gap-4 uppercase">
          <div className="w-full block pb-[150%] relative">
            <img
              className="w-full max-h-full absolute top-0 left-0 right-0 object-cover"
              src={product?.productImg[0]?.url}
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
                  : `${convertPrice(min)} - ${convertPrice(max)}`}
              </h1>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default memo(ItemProduct);
