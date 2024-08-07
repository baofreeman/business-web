import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import clsx from "clsx";

import { useGetProductsQuery } from "../../../api/productsApiSlice";
import {
  selectSidebarLeft,
  selectSidebarRight,
  setSidebarLeft,
  setSidebarRight,
} from "../../../api/sidebarSlice";

import useResize from "../../../hook/useResize";

import LayoutLeft from "./LayoutLeft";
import LayoutRight from "./LayoutRight";
import LayoutContent from "./LayoutContent";
import LayoutNone from "./LayoutNone";
import LayoutHeader from "./LayoutHeader";
import { Footer, Loading } from "../../ui";

const LayoutTab = () => {
  // GET all product
  const { pathname, search } = useLocation();
  const dispatch = useDispatch();

  const { isLoading, isSuccess } = useGetProductsQuery({});
  const { mainRef, modelRef, width, height } = useResize();

  const openSidebarRight = useSelector(selectSidebarRight);
  const openSidebarLeft = useSelector(selectSidebarLeft);

  useEffect(() => {
    dispatch(setSidebarLeft(openSidebarLeft));
  }, []);

  useEffect(() => {
    dispatch(setSidebarRight(openSidebarRight));
  }, []);

  let content = null;

  // Layout mobile custom
  const cartAndCheckoutOnMobile =
    pathname.includes("/cart") || pathname.includes("/checkout");
  const productOnMobile = search.includes("productId");
  const shopOnMobile =
    pathname.includes("/shop") || pathname.includes("/shop/");
  const adminLayout = pathname.includes("admin");

  if (isLoading) return (content = <Loading />);
  if (isSuccess)
    return (content = (
      <div
        className={clsx("bg-silver dark:bg-gray", {
          "page-tab-layout":
            openSidebarRight && openSidebarLeft && !adminLayout,
          "page-tab-layout-left":
            !openSidebarLeft && openSidebarRight && !adminLayout,
          "page-tab-layout-right":
            openSidebarLeft && !openSidebarRight && !adminLayout,
          "page-tab-layout-nosb":
            !openSidebarLeft && !openSidebarRight && !adminLayout,
          "sm:page-tab-layout-md-cart md:page-tab-layout-md-cart":
            cartAndCheckoutOnMobile && !adminLayout,
          "sm:page-tab-layout-md-shop-detail md:page-tab-layout-md-shop-detail":
            productOnMobile && !adminLayout,
          "sm:page-tab-layout-md md:page-tab-layout-md": shopOnMobile,
          "page-tab-layout-admin": adminLayout,
        })}
      >
        <LayoutHeader id="HEADER_LAYOUT" />
        <LayoutNone id="NONE_LEFT_LAYOUT" />
        <LayoutNone id="NONE_RIGHT_LAYOUT" />
        <LayoutLeft id="SIDEBAR_LEFT_LAYOUT" />
        <LayoutContent
          id="MAIN_LAYOUT"
          mainRef={mainRef}
          width={width}
          height={height}
          modelRef={modelRef}
        />
        <LayoutRight id="SIDEBAR_RIGHT_LAYOUT" />
        <Footer id="FOOTER_LAYOUT" />
      </div>
    ));
};

export default LayoutTab;
