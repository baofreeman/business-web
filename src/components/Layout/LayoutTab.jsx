import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useGetProductsQuery } from "../../api/productsApiSlice";
import TabHeader from "../Layout/TabHeader";
import SidebarRight from "../SideBar/SidebarRight/SidebarRight";
import Footer from "../ui/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import SidebarLeft from "../SideBar/SideBarLeft/SidebarLeft";
import ModalDetail from "../Shop/ModalDetail";
import Loading from "../ui/Loading/Loading";
import {
  selectSidebarLeft,
  selectSidebarRight,
  setSidebarLeft,
  setSidebarRight,
} from "../../api/toggleSlice";

const LayoutTab = () => {
  // GET all product
  const { isLoading, isSuccess } = useGetProductsQuery("allProduct", {
    pollingInterval: 60000000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const location = useLocation();

  // set ref element
  const pageRef = useRef();
  const slRef = useRef();
  const srRef = useRef();
  const modelRef = useRef();

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [openSL, setOpenSL] = useState(true);
  const [openSR, setOpenSR] = useState(true);

  const openSidebarRight = useSelector(selectSidebarRight);
  const openSidebarLeft = useSelector(selectSidebarLeft);
  const dispatch = useDispatch();

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

  // Resize width and height, responsive mobile, tablet
  const mainRef = useCallback(
    (node) => {
      if (!node) return;
      const observer = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          setWidth(entry.contentRect.width);
          const heightMd = modelRef.current?.clientHeight;
          if (heightMd && location.pathname.includes("/shop")) {
            setHeight(entry.contentRect.height - heightMd);
          } else {
            setHeight(entry.contentRect.height);
          }
        });
      });
      if (mainRef) {
        return observer.observe(node);
      }
      return () => {
        observer.disconnect();
      };
    },
    [location.pathname]
  );

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
      console.log({
        mount: "dual",
        left: openSidebarLeft,
        right: openSidebarRight,
      });
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

  // Hidden sidebar right item detail on mobile
  const showSr =
    location.pathname.includes("/cart") ||
    location.pathname.includes("/checkout") ||
    location.search.includes("productId")
      ? `sm:block md:block`
      : `sm:hidden md:hidden`;

  // Hidden sidebar left item detail on mobile
  const showSl = location.search.includes("productId")
    ? `sm:hidden md:hidden`
    : `sm:block md:block`;

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
        <div
          id="HEADER_LAYOUT"
          className="w-full h-full bg-white dark:bg-black header-layout"
        >
          <TabHeader />
        </div>
        <div
          id="NONE_LEFT_LAYOUT"
          className="bg-white dark:bg-black none-left-layout md:hidden sm:hidden"
        ></div>
        <div
          id="NONE_RIGHT_LAYOUT"
          className="bg-white dark:bg-black none-right-layout md:hidden sm:hidden"
        ></div>
        <div
          className={`sidebar-left-layout ${showSl} sm:flex sm:items-center md:flex md:items-center md:justify-center sm:justify-center bg-white dark:bg-black overflow-auto no-scrollbar`}
          ref={slRef}
        >
          <div className="w-full p-[24px] sm:p-[0px] md:p-[12px]">
            <SidebarLeft />
          </div>
        </div>

        <div
          ref={mainRef}
          className="main-layout relative bg-white dark:bg-black"
        >
          {location.pathname.includes("/admin") ? null : (
            <>
              <button
                onClick={handleToggleSL}
                className="md:hidden sm:hidden flex absolute items-center border rounded-md justify-center top-[10px] w-[16px] h-[48px] bg-white dark:bg-black z-10"
                style={
                  openSidebarLeft
                    ? {
                        left: "-16px",
                        borderRight: "none",
                        borderTopRightRadius: "0px",
                        borderBottomRightRadius: "0px",
                      }
                    : {
                        left: "0px",
                        borderLeft: "none",
                        borderTopLeftRadius: "0px",
                        borderBottomLeftRadius: "0px",
                      }
                }
              >
                <div className="bg-white dark:bg-black">
                  <svg
                    width="12"
                    height="7"
                    viewBox="0 0 12 7"
                    fill="#929292"
                    xmlns="http://www.w3.org/2000/svg"
                    style={
                      openSidebarLeft
                        ? { rotate: "90deg" }
                        : { rotate: "-90deg" }
                    }
                  >
                    <path d="M1.71429 0H0V1.71429H1.71429V3.42857H3.42857V5.14286H5.14286V6.85714H6.85714V5.14286H8.57143V3.42857H10.2857V1.71429H12V0H10.2857V1.71429H8.57143V3.42857H6.85714V5.14286H5.14286V3.42857H3.42857V1.71429H1.71429V0Z"></path>
                  </svg>
                </div>
              </button>

              <button
                onClick={handleToggleSR}
                className="md:hidden sm:hidden flex absolute items-center border rounded-md justify-center top-[10px] w-[16px] h-[48px] bg-white dark:bg-black z-10"
                style={
                  openSidebarRight
                    ? {
                        right: "-16px",
                        borderLeft: "none",
                        borderTopLeftRadius: "0px",
                        borderBottomLeftRadius: "0px",
                      }
                    : {
                        right: "0px",
                        borderRight: "none",
                        borderTopRightRadius: "0px",
                        borderBottomRightRadius: "0px",
                      }
                }
              >
                <div className="bg-white dark:bg-black">
                  <svg
                    width="12"
                    height="7"
                    viewBox="0 0 12 7"
                    fill="#929292"
                    xmlns="http://www.w3.org/2000/svg"
                    style={
                      openSidebarRight
                        ? { rotate: "-90deg" }
                        : { rotate: "90deg" }
                    }
                  >
                    <path d="M1.71429 0H0V1.71429H1.71429V3.42857H3.42857V5.14286H5.14286V6.85714H6.85714V5.14286H8.57143V3.42857H10.2857V1.71429H12V0H10.2857V1.71429H8.57143V3.42857H6.85714V5.14286H5.14286V3.42857H3.42857V1.71429H1.71429V0Z"></path>
                  </svg>
                </div>
              </button>
            </>
          )}
          <div
            className="w-full justify-center flex relative flex-col overflow-y-hidden"
            style={{ height: "100%" }}
          >
            <div className="flex-1">
              <div className="w-full" style={{ height: "100%" }}>
                <div className="overflow-visible w-0 h-0">
                  <div
                    style={{ width: width, height: height }}
                    className={`overflow-auto p-[24px] sm:p-[12px] no-scrollbar`}
                  >
                    {<Outlet />}
                  </div>
                </div>
                {location.pathname.includes("/shop") ? (
                  <div
                    className="p-[12px] w-full h-[140px] border-t z-10"
                    ref={modelRef}
                  >
                    <ModalDetail />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        {location.pathname.includes("/admin") ? null : (
          <div
            className={`sidebar-right-layout bg-white dark:bg-black overflow-auto no-scrollbar ${showSr}`}
            ref={srRef}
          >
            <div
              className="p-[20px] sm:p-[6px] sm:relative"
              style={{ height: "100%" }}
            >
              <SidebarRight />
            </div>
          </div>
        )}
        <Footer />
      </div>
    ));
};

export default LayoutTab;
