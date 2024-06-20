import { useSelector } from "react-redux";
import { useGetProductsQuery } from "../../api/productsApiSlice";
import { useSearchParams } from "react-router-dom";
import ItemProduct from "./ItemProduct";
import { selectSidebarLeft, selectSidebarRight } from "../../api/toggleSlice";

const AllProduct = () => {
  const [searchParams] = useSearchParams();

  // GET query params.
  const tagQuery = searchParams.get("tag");
  const catQuery = searchParams.get("category");
  const colorQuery = searchParams.get("color");
  const sizeQuery = searchParams.get("size");

  // GET product based on query
  const { products } = useGetProductsQuery(
    {
      category: catQuery,
      tag: tagQuery,
      color: colorQuery,
      size: sizeQuery,
    },
    {
      selectFromResult: ({ data }) => {
        return { products: data?.ids.map((id) => id) };
      },
    }
  );

  // Toggle sidebar.
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
