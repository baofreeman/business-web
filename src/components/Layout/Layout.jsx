import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../ui/Header/Header";

const Layout = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDark = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };
  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div
        style={{ height: "100vh" }}
        className="flex flex-col w-screen h-screen max-h-full my-0 mx-auto"
      >
        <Header darkMode={darkMode} toggleDark={toggleDark} />
        <main className="dark:bg-black dark:zz3d flex-1 min-h-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
