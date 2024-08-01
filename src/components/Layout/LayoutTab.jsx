import { useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetProductsQuery } from "../../api/productsApiSlice";
import {
  selectSidebarLeft,
  selectSidebarRight,
  setSidebarLeft,
  setSidebarRight,
} from "../../api/toggleSlice";
import { Footer, Loading } from "../ui/index";
import { useDispatch, useSelector } from "react-redux";
import LayoutLeft from "./LayoutTab/LayoutLeft";
import LayoutRight from "./LayoutTab/LayoutRight";
import useResize from "../../hook/useResize";
import LayoutContent from "./LayoutTab/LayoutContent";
import LayoutNone from "./LayoutTab/LayoutNone";
import LayoutHeader from "./LayoutTab/LayoutHeader";

const LayoutTab = () => {
  // GET all product
  const { isLoading, isSuccess } = useGetProductsQuery({});
  const location = useLocation();
  const dispatch = useDispatch();

  const pageRef = useRef();
  const slRef = useRef();
  const srRef = useRef();

  const [openSL, setOpenSL] = useState(true);
  const [openSR, setOpenSR] = useState(true);

  const openSidebarRight = useSelector(selectSidebarRight);
  const openSidebarLeft = useSelector(selectSidebarLeft);

  const { mainRef, modelRef, width, height } = useResize();

  // toggle sidebar left
  const handleToggleSL = () => {
    setOpenSL((prev) => !prev);
  };

  // toggle sidebar right
  const handleToggleSR = () => {
    setOpenSR((prev) => !prev);
  };

  useLayoutEffect(() => {
    dispatch(setSidebarLeft(openSL));
  }, [openSL]);

  useLayoutEffect(() => {
    dispatch(setSidebarRight(openSR));
  }, [openSR]);

  // Check sidebar Right and Left =>  render layout responsive
  useLayoutEffect(() => {
    if (!openSidebarRight && !openSidebarLeft) {
      console.log({
        mount: "dual",
        left: openSidebarLeft,
        right: openSidebarRight,
      });
      pageRef.current?.classList.add("page-tab-layout-nosb");
      srRef.current?.classList.add("hidden");
      slRef.current?.classList.add("hidden");
      pageRef.current?.classList.remove("page-tab-layout");
      pageRef.current?.classList.remove("page-tab-layout-left");
      pageRef.current?.classList.remove("page-tab-layout-right");
    } else if (!openSidebarRight && openSidebarLeft) {
      console.log({
        mount: "right",
        left: openSidebarLeft,
        right: openSidebarRight,
      });
      pageRef.current?.classList.add("page-tab-layout-right");
      srRef.current?.classList.add("hidden");
      slRef.current?.classList.remove("hidden");
      pageRef.current?.classList.remove("page-tab-layout");
      pageRef.current?.classList.remove("page-tab-layout-left");
      pageRef.current?.classList.remove("page-tab-layout-nosb");
    } else if (!openSidebarLeft && openSidebarRight) {
      console.log({
        mount: "left",
        left: openSidebarLeft,
        right: openSidebarRight,
      });
      pageRef.current?.classList.add("page-tab-layout-left");
      slRef.current?.classList.add("hidden");
      srRef.current?.classList.remove("hidden");
      pageRef.current?.classList.remove("page-tab-layout");
      pageRef.current?.classList.remove("page-tab-layout-nosb");
      pageRef.current?.classList.remove("page-tab-layout-right");
    } else {
      // console.log({
      //   mount: "dual",
      //   left: openSidebarLeft,
      //   right: openSidebarRight,
      // });
      pageRef.current?.classList.add("page-tab-layout");
      srRef.current?.classList.remove("hidden");
      slRef.current?.classList.remove("hidden");
      pageRef.current?.classList.remove("page-tab-layout-nosb");
      pageRef.current?.classList.remove("page-tab-layout-left");
      pageRef.current?.classList.remove("page-tab-layout-right");
    }
  }, [openSidebarRight, openSidebarLeft]);

  let content = null;
  // Layout mobile custom
  const tabMobile =
    location.pathname.includes("/cart") ||
    location.pathname.includes("/checkout")
      ? `sm:page-tab-layout-md-cart md:page-tab-layout-md-cart`
      : location.search.includes("productId")
      ? `sm:page-tab-layout-md-shop-detail md:page-tab-layout-md-shop-detail`
      : location.pathname.includes("/shop") ||
        location.pathname.includes("/shop/")
      ? `sm:page-tab-layout-md md:page-tab-layout-md`
      : `sm:page-tab-layout-md md:page-tab-layout-md`;

  // Set layout /admin
  const layout = location.pathname.includes("/admin")
    ? "page-tab-layout-admin"
    : "page-tab-layout";

  if (isLoading) return (content = <Loading />);
  if (isSuccess)
    return (content = (
      <div
        className={`${layout} ${tabMobile} bg-silver dark:bg-gray`}
        ref={pageRef}
      >
        <LayoutHeader id="HEADER_LAYOUT" />
        <LayoutNone id="NONE_LEFT_LAYOUT" />
        <LayoutNone id="NONE_RIGHT_LAYOUT" />
        <LayoutLeft id="SIDEBAR_LEFT_LAYOUT" slRef={slRef} />
        <LayoutContent
          id="MAIN_LAYOUT"
          handleToggleSL={handleToggleSL}
          handleToggleSR={handleToggleSR}
          mainRef={mainRef}
          width={width}
          height={height}
          modelRef={modelRef}
        />
        <LayoutRight id="SIDEBAR_RIGHT_LAYOUT" srRef={srRef} />
        <Footer id="FOOTER_LAYOUT" />
      </div>
    ));
};

export default LayoutTab;
