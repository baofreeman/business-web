import { ModalDetail } from "../../Shop";
import { Outlet, useLocation } from "react-router-dom";
import ButtonSidebar from "./ButtonSidebar";

const LayoutContent = ({ mainRef, width, height, modelRef, id }) => {
  const { pathname } = useLocation();
  const isShowSidebarButton = pathname.includes("/admin");

  return (
    <div
      id={id}
      ref={mainRef}
      className="main-layout relative bg-white dark:bg-black"
    >
      {!isShowSidebarButton && (
        <>
          <ButtonSidebar design={"left"} />
          <ButtonSidebar design={"right"} />
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
            {pathname.includes("/shop") && (
              <div
                className="p-[12px] w-full h-[140px] border-t z-10"
                ref={modelRef}
              >
                <ModalDetail />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutContent;
