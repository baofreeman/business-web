import { useSelector } from "react-redux";
import { useGetProductsQuery } from "../../api/productsApiSlice";
import { useSearchParams } from "react-router-dom";
import ItemProduct from "./ItemProduct";
import { selectSidebarLeft, selectSidebarRight } from "../../api/toggleSlice";

const AllProduct = () => {
  const [searchParams] = useSearchParams();
  const tagParam = searchParams.get("tag");
  const categoryParam = searchParams.get("category");
  const colorParam = searchParams.get("color");
  const sizeParam = searchParams.get("size");

  const { products } = useGetProductsQuery(
    {
      category: categoryParam,
      tag: tagParam,
      color: colorParam,
      size: sizeParam,
    },
    {
      selectFromResult: ({ data }) => {
        return { products: data?.ids.map((id) => id) };
      },
    }
  );
  const openSR = useSelector(selectSidebarRight);
  const openSL = useSelector(selectSidebarLeft);

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
        <ItemProduct key={productId} productId={productId} />
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

export default AllProduct;
