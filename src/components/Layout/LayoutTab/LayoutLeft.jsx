import { SidebarLeft } from "../../SideBar";
import { useLocation } from "react-router-dom";

const LayoutLeft = ({ slRef, id }) => {
  const { search } = useLocation();

  const showSl = search.includes("productId")
    ? `sm:hidden md:hidden`
    : `sm:block md:block`;

  return (
    <div
      id={id}
      className={`sidebar-left-layout ${showSl} sm:flex sm:items-center md:flex md:items-center md:justify-center sm:justify-center bg-white dark:bg-black overflow-auto no-scrollbar`}
      ref={slRef}
    >
      <div className="w-full p-[24px] sm:p-[0px] md:p-[12px]">
        <SidebarLeft />
      </div>
    </div>
  );
};

export default LayoutLeft;
