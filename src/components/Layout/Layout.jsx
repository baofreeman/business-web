import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../ui/Header/Header";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  const [darkMode, setDarkMode] = useState(true);

  // Toggle light or dark screen
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
        <ToastContainer
          toastClassName={() =>
            `${
              darkMode ? "bg-black text-silver" : "bg-silver text-black"
            } relative flex p-1 min-h-20 border rounded-md justify-between overflow-hidden cursor-pointer`
          }
          bodyClassName={() => "flex items-center text-sm p-3"}
          autoClose={3000}
        />
      </div>
    </div>
  );
};

export default Layout;
