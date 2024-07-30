import { useSelector } from "react-redux";
import { useGetFilterProductsQuery } from "../../api/productsApiSlice";
import { useLocation } from "react-router-dom";
import ItemProduct from "./ItemProduct";
import { selectSidebarLeft, selectSidebarRight } from "../../api/toggleSlice";
import queryString from "query-string";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Loading } from "../ui/index";
import { useInView } from "react-intersection-observer";
import useScroll from "../../hook/useScroll";

const FilterProducts = () => {
  const location = useLocation();
  const search = queryString.parse(location.search);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    setPage(1);
  }, [location.search, location.pathname]);

  const [executeScroll, elRef] = useScroll();
  useEffect(() => {
    executeScroll();
  }, []);

  const { products } = useGetFilterProductsQuery(
    { search, page: page },
    {
      selectFromResult: ({ data }) => {
        return { products: data?.ids.map((id) => id) };
      },
      refetchOnMountOrArgChange: true,
    }
  );

  // console.log(products);
  // Toggle sidebar.
  const openSR = useSelector(selectSidebarRight);
  const openSL = useSelector(selectSidebarLeft);
  const { ref, inView } = useInView({
    trackVisibility: true,
    delay: 5000,
    root: null,
    threshold: 0,
  });

  useEffect(() => {
    (() => {
      setHasMore(products?.length > 0);
      setIsLoading(false);
    })();
  }, [products?.length, page]);

  const loadMore = useCallback(() => {
    setPage((page) => page + 1);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (inView && hasMore) {
      loadMore();
    }
  }, [inView, loadMore, hasMore]);

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
      <div ref={elRef} />
      <div className={`grid ${gridCols} gap-4 relative`}>{tabItem}</div>
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

export default FilterProducts;
