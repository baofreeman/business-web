import { ModalDetail } from "../../Shop";
import { Outlet, useLocation } from "react-router-dom";
import ArrowIcon from "../../../assets/icons/ArrowIcon";
import { useSelector } from "react-redux";
import {
  selectSidebarLeft,
  selectSidebarRight,
} from "../../../api/toggleSlice";

const LayoutContent = ({
  handleToggleSL,
  handleToggleSR,
  mainRef,
  width,
  height,
  modelRef,
  id,
}) => {
  const { pathname } = useLocation();
  const openSidebarRight = useSelector(selectSidebarRight);
  const openSidebarLeft = useSelector(selectSidebarLeft);

  return (
    <div
      id={id}
      ref={mainRef}
      className="main-layout relative bg-white dark:bg-black"
    >
      {pathname.includes("/admin") ? null : (
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
              <ArrowIcon
                width={12}
                height={7}
                rotate={openSidebarLeft ? "90deg" : "-90deg"}
              />
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
              <ArrowIcon
                width={12}
                height={7}
                rotate={openSidebarRight ? "-90deg" : "90deg"}
              />
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
            {pathname.includes("/shop") ? (
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
  );
};

export default LayoutContent;
