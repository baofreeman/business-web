import { useState } from "react";
import Button from "../ui/Button/Button";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLazySeachProductQuery } from "../../api/productsApiSlice";
import Logo from "../../assets/icons/Logo";
import DarkIcon from "../../assets/icons/DarkIcon";
import SunIcon from "../../assets/icons/SunIcon";
import Profile from "./Profile";
import Search from "./Search";

const Header = ({ darkMode, toggleDark }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const [toggleModal, setToggleModal] = useState(false);

  const showLogo = location.pathname !== "/" ? `sm:hidden` : `sm-flex`;

  const changeTheme = darkMode ? `right-1` : `left-1`;
  return (
    <header className="w-full flex h-[62px] sm:h-[48px] sm:px-[10px] px-[24px] my-0 mx-auto z-1 border-b">
      <nav className="w-full flex text-silver my-0 mx-auto items-center justify-between sm:gap-2">
        <div
          className={`flex gap-16 sm:gap-1 items-center sm:justify-start flex-1 sm:flex-none`}
        >
          <div className={`${showLogo}`}>
            <Button size="m" to={"/"}>
              <Logo />
            </Button>
          </div>

          <ul className="flex gap-2 items-center">
            <li>
              <Button
                size={"l"}
                design={
                  pathname.includes("/shop") ? "link-primary" : "link-basic"
                }
                width="max"
                to={`/shop`}
              >
                Shop
              </Button>
            </li>
            {false && (
              <li>
                <Button
                  size={"l"}
                  design={
                    pathname.includes("/admin") ? "link-primary" : "link-basic"
                  }
                  width="max"
                  to={`/admin`}
                >
                  Admin
                </Button>
              </li>
            )}
          </ul>
        </div>

        {/* Search input */}
        <Search toggleModal={toggleModal} setToggleModal={setToggleModal} />

        <div className="flex flex-1 sm:flex-none gap-2 items-center justify-end">
          <div
            onClick={toggleDark}
            className="flex relative items-center justify-center gap-2 rounded-[20px] w-[48px] h-[24px] border border-orange p-1 cursor-pointer hover:opacity-90"
          >
            <DarkIcon darkMode={darkMode} />
            <div
              className={`absolute bg-orange rounded-[999px] w-[20px] h-[20px] ${changeTheme}`}
            ></div>
            <SunIcon darkMode={!darkMode} />
          </div>
          <Profile />
        </div>
      </nav>
    </header>
  );
};

export default Header;
