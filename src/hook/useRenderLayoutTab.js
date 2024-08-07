import { useEffect } from "react";

export const useRenderLayoutTab = () => {
  useEffect(() => {
    if (!openSidebarRight && !openSidebarLeft) {
      pageRef.current?.classList.add("page-tab-layout-nosb");
      srRef.current?.classList.add("hidden");
      slRef.current?.classList.add("hidden");
      pageRef.current?.classList.remove("page-tab-layout");
      pageRef.current?.classList.remove("page-tab-layout-left");
      pageRef.current?.classList.remove("page-tab-layout-right");
    } else if (!openSidebarRight && openSidebarLeft) {
      pageRef.current?.classList.add("page-tab-layout-right");
      srRef.current?.classList.add("hidden");
      slRef.current?.classList.remove("hidden");
      pageRef.current?.classList.remove("page-tab-layout");
      pageRef.current?.classList.remove("page-tab-layout-left");
      pageRef.current?.classList.remove("page-tab-layout-nosb");
    } else if (!openSidebarLeft && openSidebarRight) {
      pageRef.current?.classList.add("page-tab-layout-left");
      slRef.current?.classList.add("hidden");
      srRef.current?.classList.remove("hidden");
      pageRef.current?.classList.remove("page-tab-layout");
      pageRef.current?.classList.remove("page-tab-layout-nosb");
      pageRef.current?.classList.remove("page-tab-layout-right");
    } else {
      pageRef.current?.classList.add("page-tab-layout");
      srRef.current?.classList.remove("hidden");
      slRef.current?.classList.remove("hidden");
      pageRef.current?.classList.remove("page-tab-layout-nosb");
      pageRef.current?.classList.remove("page-tab-layout-left");
      pageRef.current?.classList.remove("page-tab-layout-right");
    }
  }, [openSidebarRight, openSidebarLeft]);
};
