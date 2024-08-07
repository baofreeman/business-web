import { useDispatch, useSelector } from "react-redux";
import {
  selectSidebarLeft,
  selectSidebarRight,
  setSidebarLeft,
  setSidebarRight,
} from "../../../api/sidebarSlice";
import ArrowIcon from "../../../assets/icons/ArrowIcon";
import { memo } from "react";

const ButtonSidebar = ({ design }) => {
  const openSidebarLeft = useSelector(selectSidebarLeft);
  const openSidebarRight = useSelector(selectSidebarRight);
  const dispatch = useDispatch();

  let sidebar = null;
  let arrow = null;

  // toggle sidebar left
  const handleOpenOrCloseSidebar = () => {
    if (design === "left") {
      dispatch(setSidebarLeft(!openSidebarLeft));
    }
    if (design === "right") {
      dispatch(setSidebarRight(!openSidebarRight));
    }
  };

  if (design === "left") {
    sidebar = openSidebarLeft
      ? "left-[-16px] border-r-0 rounded-tr-[0px] rounded-br-[0px]"
      : "left-[0px] border-l-0 rounded-tl-[0px] rounded-bl-[0px]";
    arrow = openSidebarLeft ? "90deg" : "-90deg";
  }

  if (design === "right") {
    sidebar = openSidebarRight
      ? "right-[-16px] border-l-0 rounded-tl-[0px] rounded-bl-[0px]"
      : "right-[0px] border-r-0 rounded-tr-[0px] rounded-br-[0px]";
    arrow = openSidebarRight ? "-90deg" : "90deg";
  }

  return (
    <button
      className={`${sidebar} md:hidden sm:hidden flex absolute items-center border rounded-md justify-center top-[16px] w-[16px] h-[48px] bg-white dark:bg-black z-50 cursor-pointer`}
      onClick={handleOpenOrCloseSidebar}
    >
      <div className="bg-white dark:bg-black">
        <ArrowIcon width={12} height={7} rotate={`${arrow}`} />
      </div>
    </button>
  );
};

export default memo(ButtonSidebar);
