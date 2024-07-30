import {
  getFilterSelectors,
  useGetProductsCategoryQuery,
} from "../../api/productsApiSlice";
import { selectSidebarLeft, selectSidebarRight } from "../../api/toggleSlice";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ItemProduct from "./ItemProduct";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Loading } from "../ui/index";
import { useInView } from "react-intersection-observer";
import useScroll from "../../hook/useScroll";

const ListProduct = () => {
  // GET params.
  const { category } = useParams();
  const openSR = useSelector(selectSidebarRight);
  const openSL = useSelector(selectSidebarLeft);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const location = useLocation();

  const resetPage = useCallback(() => {
    setPage(1);
  }, []);

  useLayoutEffect(() => {
    resetPage();
  }, [category]);

  const { isFetching, isSuccess } = useGetProductsCategoryQuery(
    {
      category,
      page,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const { selectIds } = getFilterSelectors({
    category,
    page: page,
  });

  const products = useSelector(selectIds);

  const [executeScroll, elRef] = useScroll();
  useEffect(() => {
    executeScroll();
  }, []);

  const { ref, inView } = useInView({
    trackVisibility: true,
    delay: 500,
    root: null,
    rootMargin: "200px",
    threshold: 0,
  });

  // const loadMore = useCallback(() => {

  // }, []);

  useEffect(() => {
    (() => {
      setHasMore(products.length > 0);
      setLoading(false);
    })();
  }, [products.length, page]);

  useEffect(() => {
    if (inView && hasMore) {
      setPage((prev) => prev + 1);
      setLoading(true);
    }
  }, [inView, hasMore]);

  let gridCols =
    openSL && openSR
      ? "grid-cols-4 grid-auto"
      : !openSL && !openSR
      ? "grid-cols-8 grid-auto"
      : !openSL || !openSR
      ? "grid-cols-6 grid-auto"
      : null;
  let tabItem = null;
  tabItem =
    isSuccess && products?.length
      ? products.map((productId) => (
          <ItemProduct key={productId} productId={productId} />
        ))
      : (tabItem = (
          <span className="text-center m-auto col-span-4">
            Không có sản phẩm
          </span>
        ));
  return (
    <>
      <div ref={elRef} />
      <div className={`grid ${gridCols} gap-4 relative`}>
        {isFetching && (
          <div className="w-full col-span-4 m-auto flex items-center justify-center">
            <Loading />
          </div>
        )}
        {tabItem}
      </div>
      {products?.length > 0 && (
        <div
          ref={ref}
          className="w-full col-span-4 m-auto py-10 flex items-center justify-center"
        >
          {loading && <Loading />}
        </div>
      )}
    </>
  );
};

export default ListProduct;
