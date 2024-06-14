import React from "react";
import { useGetProductsQuery } from "../../api/productsApiSlice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ItemProduct from "./ItemProduct";
import { selectSidebarLeft, selectSidebarRight } from "../../api/toggleSlice";

const ListProduct = () => {
  //Get params
  const { category } = useParams();
  const openSR = useSelector(selectSidebarRight);
  const openSL = useSelector(selectSidebarLeft);

  // GET product filter
  const { productFilter } = useGetProductsQuery("allProduct", {
    selectFromResult: ({ data }) => {
      if (category === "tất cả") {
        return {
          productFilter: data?.ids.filter((id) => data?.entities[id]),
        };
      }
      return {
        productFilter: data?.ids.filter(
          (id) => data?.entities[id].category === category
        ),
      };
    },
  });
  let gridCols =
    openSL && openSR
      ? "grid-cols-4 grid-auto"
      : !openSL && !openSR
      ? "grid-cols-8 grid-auto"
      : !openSL || !openSR
      ? "grid-cols-6 grid-auto"
      : null;
  let tabItem = null;
  tabItem = productFilter?.length
    ? productFilter.map((productId) => (
        <ItemProduct key={productId} productId={productId} />
      ))
    : (tabItem = (
        <span className="text-center m-auto col-span-4">Không có sản phẩm</span>
      ));
  return <div className={`grid ${gridCols} grid-cols-4 gap-4`}>{tabItem}</div>;
};

export default ListProduct;
