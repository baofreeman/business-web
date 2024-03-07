import TabItem from "./TabItem";
import { useSelector } from "react-redux";
import { useGetProductsQuery } from "../../api/productsApiSlice";
import { selectSibarLeft, selectSibarRight } from "../../api/toggleSlice";
import { useSearchParams } from "react-router-dom";

const TabAllProduct = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const { products } = useGetProductsQuery("allProduct", {
    selectFromResult: ({ data }) => {
      if (name) {
        return {
          products: data?.ids.filter((id) => data.entities[id].name === name),
        };
      } else {
        return {
          products: data?.ids.map((id) => id),
        };
      }
    },
  });
  const openSR = useSelector(selectSibarRight);
  const openSL = useSelector(selectSibarLeft);

  let gridCols =
    openSL && openSR
      ? "grid-cols-4 grid-auto"
      : !openSL && !openSR
      ? "grid-cols-8 grid-auto"
      : !openSL || !openSR
      ? "grid-cols-6 grid-auto"
      : null;

  let tabItem = null;
  tabItem = products?.length
    ? products.map((productId) => (
        <TabItem key={productId} productId={productId} />
      ))
    : (tabItem = (
        <span className="text-center m-auto col-span-4">Không có sản phẩm</span>
      ));
  return (
    <>
      <div className={`grid ${gridCols} gap-4 relative`}>{tabItem}</div>
    </>
  );
};

export default TabAllProduct;
