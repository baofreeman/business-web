import React from "react";

const LayoutNone = ({ id }) => {
  const layout =
    id === "NONE_LEFT_LAYOUT" ? "none-left-layout" : "none-right-layout";
  return (
    <div
      id={id}
      className={`bg-white dark:bg-black ${layout} md:hidden sm:hidden`}
    ></div>
  );
};

export default LayoutNone;
