import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import { useGetFilterProductsQuery } from "../../api/productsApiSlice";
import { selectSidebarLeft, selectSidebarRight } from "../../api/sidebarSlice";

import ProductExtend from "./ProductExtend";
import useScroll from "../../hook/useScroll";

import queryString from "query-string";
import { Loading } from "../ui";

const ListFilterProducts = () => {
  const location = useLocation();
  const search = queryString.parse(location.search);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { category } = useParams();
  const resetPage = useCallback(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    resetPage();
  }, [location.pathname, location.search]);

  const { products } = useGetFilterProductsQuery(
    { category, search, page },
    {
      selectFromResult: ({ data }) => {
        return { products: data?.ids.map((id) => id) };
      },
      refetchOnMountOrArgChange: true,
    }
  );

  const [executeScroll, elRef] = useScroll();

  useEffect(() => {
    executeScroll();
  }, []);

  const { ref, inView } = useInView();

  useEffect(() => {
    setIsLoading(false);
  }, [page]);

  useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      setIsLoading(true);
    }
  }, [inView]);

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
        <ProductExtend key={productId} productId={productId} />
      ))
    : (tabItem = (
        <span className="text-center m-auto col-span-4">Không có sản phẩm</span>
      ));

  return (
    <>
      <div ref={elRef} />
      <div className={`grid ${gridCols} gap-4 relative`}>
        {/* {isFetching && (
          <div className="w-full col-span-4 m-auto flex items-center justify-center">
            <Loading />
          </div>
        )} */}
        {tabItem}
      </div>
      {products?.length > 0 && (
        <div
          ref={ref}
          className="w-full col-span-4 m-auto py-10 flex items-center justify-center"
        >
          {isLoading && <Loading />}
        </div>
      )}
    </>
  );
};

export default ListFilterProducts;
