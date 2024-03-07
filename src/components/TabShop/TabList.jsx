import React from "react";
import TabItem from "./TabItem";
import { useGetProductsQuery } from "../../api/productsApiSlice";
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectSibarLeft, selectSibarRight } from "../../api/toggleSlice";

const TabsList = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const tagParam = searchParams.get("tag");
  const colorParam = searchParams.get("color");
  const productId = searchParams.get("productId");
  const sizeParam = searchParams.get("size");
  const nameParam = searchParams.get("name");
  const openSR = useSelector(selectSibarRight);
  const openSL = useSelector(selectSibarLeft);
  console.log(productId, category);
  const { productFilter } = useGetProductsQuery(
    { tag: tagParam, color: colorParam, size: sizeParam },
    {
      selectFromResult: ({ data }) => {
        if (category && nameParam) {
          return {
            productFilter: data?.ids.filter(
              (id) =>
                data?.entities[id].name === nameParam &&
                data?.entities[id].category === category
            ),
          };
        } else if (category) {
          return {
            productFilter: data?.ids.filter(
              (id) => data?.entities[id].category === category
            ),
          };
        } else {
          return { productFilter: data?.ids.map((id) => id) };
        }
      },
    }
  );
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
        <TabItem key={productId} productId={productId} />
      ))
    : (tabItem = (
        <span className="text-center m-auto col-span-4">Không có sản phẩm</span>
      ));
  return <div className={`grid ${gridCols} grid-cols-4 gap-4`}>{tabItem}</div>;
};

export default TabsList;
