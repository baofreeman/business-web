import { useState } from "react";
import Button from "../Button/Button";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import useAuth from "../../../hook/useAuth";
import { useSendLogOutMutation } from "../../../api/authApiSlice";
import Input from "../Input/Input";
import { useForm } from "react-hook-form";
import { useSeachProductQuery } from "../../../api/productsApiSlice";

const Header = ({ darkMode, toggleDark }) => {
  const navigate = useNavigate();
  const [showUser, setShowUser] = useState(false);
  const location = useLocation();
  const { category } = useParams();
  const pathname = location.pathname;
  const [key, setKey] = useState("");
  const { username, isAdmin } = useAuth();
  const [sendLogOut, { isLoading }] = useSendLogOutMutation();
  const [toggleModal, setToggleModal] = useState(false);
  const handleLogOut = () => {
    sendLogOut();
    navigate("/login");
  };
  const {
    register,
    resetField,
    formState: { errors },
  } = useForm();
  let buttonLogOut = (
    <Button
      size="s-link"
      design="link-primary"
      width="full"
      onClick={handleLogOut}
    >
      Log out
    </Button>
  );
  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else {
    content = (
      <div className="absolute top-[20px] border p-[10px] bg-black z-10 rounded-md">
        {buttonLogOut}
      </div>
    );
  }
  const { data: products } = useSeachProductQuery(key || undefined);
  const handleSearch = (e) => {
    setToggleModal(true);
    let key = e.target.value;
    if (key) setKey(key);
  };
  const handleLink = (item) => {
    const { name, checkCategory } = item;
    if (name) {
      navigate({
        pathname:
          category && category === checkCategory
            ? `/shop/${category}`
            : `/shop/${checkCategory}` || "/shop",
        search: createSearchParams({
          name: name,
        }).toString(),
      });
    }
    resetField("search");
    setToggleModal(false);
  };

  const turnOffModal = () => {
    resetField("search");
    setToggleModal(false);
  };
  const showSearch =
    location.pathname === "/" ||
    location.pathname.includes("/register") ||
    location.pathname.includes("/login")
      ? `sm:hidden`
      : `sm-flex`;

  const showLogo = location.pathname !== "/" ? `sm:hidden` : `sm-flex`;
  const showModalUser = () => {
    setShowUser((prev) => !prev);
  };

  const changeTheme = darkMode ? `right-1` : `left-1`;
  return (
    <header className="w-full flex h-[62px] sm:h-[48px] sm:px-[10px] px-[24px] my-0 mx-auto z-1 dark:bg-black border-b">
      <nav className="w-full flex text-silver my-0 mx-auto items-center justify-between sm:gap-2">
        <div
          className={`flex gap-16 sm:gap-1 items-center sm:justify-start flex-1 sm:flex-none`}
        >
          <div className={`${showLogo}`}>
            <Button size="m" to={"/"}>
              <svg
                className="fill-gray hover:fill-orange dark:fill-silver dark:hover:fill-white"
                width="44"
                height="44"
                viewBox="0 0 44 44"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2.38643 27.4402C1.40218 26.4557 0.742112 25.3189 0.406218 24.0298C0.0781357 22.7328 0.0781355 21.4358 0.406218 20.1389C0.742112 18.8341 1.39827 17.6934 2.37471 16.7168C3.36676 15.7245 4.51115 15.0643 5.80786 14.7362C7.10457 14.408 8.40128 14.408 9.69799 14.7362C10.9947 15.0643 12.1352 15.7206 13.1194 16.7051L15.5566 19.1427L19.1655 15.5331L16.7283 13.0954C15.744 12.111 15.084 10.9742 14.7481 9.68502C14.42 8.38805 14.4161 7.095 14.7364 5.80585C15.0645 4.50888 15.7246 3.36427 16.7166 2.37201C17.7009 1.38757 18.8413 0.73128 20.138 0.403133C21.4347 0.0749851 22.7275 0.0788809 24.0164 0.414841C25.3131 0.742989 26.4536 1.3993 27.4379 2.38374C28.4221 3.36818 29.0783 4.50888 29.4064 5.80585C29.7423 7.095 29.7461 8.38805 29.4181 9.68502C29.0978 10.9898 28.4455 12.1344 27.4613 13.1189L25.0358 15.5448L28.633 19.1427L31.0585 16.7168C32.0427 15.7323 33.1793 15.0721 34.4682 14.7362C35.7649 14.408 37.0577 14.4119 38.3466 14.7479C39.6433 15.076 40.7877 15.7362 41.7798 16.7285C42.764 17.7129 43.4202 18.8536 43.7482 20.1506C44.0841 21.4398 44.0841 22.7289 43.7482 24.0181C43.4202 25.315 42.764 26.4557 41.7798 27.4402C40.7877 28.4324 39.6433 29.0926 38.3466 29.4208C37.0577 29.7411 35.7649 29.7372 34.4682 29.409C33.1871 29.0809 32.0544 28.4246 31.0702 27.4402L28.6447 25.0142L25.0358 28.6238L27.4613 31.0498C28.4455 32.0342 29.0978 33.171 29.4181 34.4602C29.7461 35.7572 29.7461 37.0541 29.4181 38.3511C29.09 39.6481 28.4299 40.7926 27.4379 41.7849C26.4615 42.7615 25.3209 43.4178 24.0164 43.7538C22.7197 44.0819 21.423 44.0819 20.1263 43.7538C18.8452 43.4257 17.7125 42.7693 16.7283 41.7849C15.7362 40.7926 15.0723 39.6519 14.7364 38.3628C14.4083 37.0658 14.4083 35.7689 14.7364 34.4719C15.0801 33.1749 15.7402 32.0381 16.7166 31.0615L19.1655 28.6121L15.5683 25.0142L13.1194 27.4636C12.143 28.4402 10.9986 29.0926 9.68626 29.4208C8.38955 29.7489 7.09286 29.7489 5.79616 29.4208C4.50726 29.0848 3.37068 28.4246 2.38643 27.4402ZM5.31573 24.5103C5.76098 24.9556 6.27654 25.2525 6.86241 25.401C7.45608 25.5572 8.04585 25.5611 8.63172 25.4127C9.21758 25.2642 9.73314 24.9673 10.1784 24.522L12.6273 22.0726L10.1901 19.6349C9.74485 19.1896 9.22539 18.8966 8.63172 18.756C8.04585 18.6075 7.46 18.6075 6.87413 18.756C6.28827 18.9044 5.7688 19.2052 5.31573 19.6584C4.87047 20.1037 4.56974 20.6155 4.41351 21.1936C4.2651 21.7796 4.2651 22.3656 4.41351 22.9516C4.56974 23.5454 4.87047 24.0649 5.31573 24.5103ZM19.6576 10.1655L22.0948 12.6032L24.5203 10.1772C24.9733 9.72409 25.2702 9.20843 25.4108 8.63026C25.5592 8.04429 25.5553 7.45439 25.3991 6.8606C25.2507 6.27462 24.9538 5.75896 24.5085 5.31362C24.0633 4.86828 23.5477 4.57138 22.9619 4.42293C22.376 4.27449 21.7902 4.27449 21.2043 4.42293C20.6263 4.56357 20.1107 4.86046 19.6576 5.31362C19.2124 5.75896 18.9077 6.27462 18.7437 6.8606C18.5953 7.44658 18.5953 8.03256 18.7437 8.61853C18.9077 9.20451 19.2124 9.72017 19.6576 10.1655ZM30.8878 22.0843L33.3133 24.5103C33.7585 24.9556 34.2702 25.2564 34.8483 25.4127C35.4341 25.5611 36.7023 25.5572 37.2804 25.401C37.8662 25.2525 38.3857 24.9517 38.8387 24.4986C39.2918 24.0454 39.5886 23.5297 39.7293 22.9516C39.8855 22.3734 39.8894 21.7913 39.741 21.2054C39.5926 20.6194 39.2957 20.1037 38.8505 19.6584C38.3974 19.2052 37.8779 18.9044 37.292 18.756C36.7062 18.6075 35.4341 18.6075 34.8483 18.756C34.278 18.9044 33.7663 19.2052 33.3133 19.6584L30.8878 22.0843ZM19.6576 38.855C20.1029 39.3004 20.6185 39.5973 21.2043 39.7457C21.7902 39.8942 22.3721 39.8902 22.9502 39.734C23.536 39.5855 24.0516 39.2886 24.4968 38.8433C24.9499 38.3901 25.2507 37.8706 25.3991 37.2846C25.5553 36.7064 25.5592 36.1244 25.4108 35.5384C25.2702 34.9446 24.9773 34.425 24.532 33.9797L22.1065 31.5537L19.6576 34.0031C19.2124 34.4485 18.9116 34.9602 18.7554 35.5384C18.607 36.1244 18.607 36.7103 18.7554 37.2963C18.9038 37.8823 19.2046 38.4019 19.6576 38.855ZM18.4976 22.0843L22.0948 25.6822L25.7037 22.0726L22.1065 18.4747L18.4976 22.0843Z"></path>
              </svg>
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
            {isAdmin && (
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
        <div
          className={`flex h-[36px] relative justify-center items-center flex-1 sm:hidden ${showSearch}`}
        >
          <div
            className="top-0 left-[12px] h-full flex absolute items-center justify-center"
            style={{ height: "100%" }}
          >
            <div className="w-[36px] sm:w-[24px]">
              <svg
                className="fill-silver cursor-none"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3.2 0H9.6V1.6H3.2V0ZM1.6 3.2V1.6H3.2V3.2H1.6ZM1.6 9.6H0V3.2H1.6V9.6ZM3.2 11.2H1.6V9.6H3.2V11.2ZM9.6 11.2V12.8H3.2V11.2H9.6ZM11.2 9.6H9.6V11.2H11.2V12.8H12.8V14.4H14.4V16H16V14.4H14.4V12.8H12.8V11.2H11.2V9.6ZM11.2 3.2H12.8V9.6H11.2V3.2ZM11.2 3.2V1.6H9.6V3.2H11.2Z"></path>
              </svg>
            </div>
          </div>
          <Input
            placeholder="Tìm kiếm (Nhập tên sản phẩm...)"
            size="m"
            design="basic"
            name={"search"}
            register={register}
            style={{ paddingLeft: "50px" }}
            onChange={(e) => handleSearch(e)}
            error={errors.search && errors.search?.message}
          />
          {toggleModal && (
            <div
              onClick={turnOffModal}
              className="px-2 absolute top-1 right-1 text-center py-2 select-none"
            >
              <svg
                className="fill-silver hover:fill-white cursor-pointer"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0H1.71429V1.71429H0V0ZM3.42857 3.42857H1.71429V1.71429H3.42857V3.42857ZM5.14286 5.14286H3.42857V3.42857H5.14286V5.14286ZM6.85714 5.14286H5.14286V6.85714H3.42857V8.57143H1.71429V10.2857H0V12H1.71429V10.2857H3.42857V8.57143H5.14286V6.85714H6.85714V8.57143H8.57143V10.2857H10.2857V12H12V10.2857H10.2857V8.57143H8.57143V6.85714H6.85714V5.14286ZM8.57143 3.42857V5.14286H6.85714V3.42857H8.57143ZM10.2857 1.71429V3.42857H8.57143V1.71429H10.2857ZM10.2857 1.71429V0H12V1.71429H10.2857Z"></path>
              </svg>
            </div>
          )}
          {toggleModal && (
            <div className="border rounded w-full h-[150px] absolute top-[35px] bg-black z-50 left-0 overflow-hidden">
              <div
                className="px-[20px] py-[10px] overflow-scroll no-scrollbar"
                style={{ height: "100%" }}
              >
                {products?.length > 0 ? (
                  products?.map((item) => (
                    <Button
                      key={item._id}
                      size="s-link"
                      design="link-basic"
                      onClick={() =>
                        handleLink({
                          name: item.name,
                          checkCategory: item.category,
                        })
                      }
                    >
                      <div
                        className="flex border-b-1 mb-2 justify-start items-center text-center w-[100%] h-full"
                        style={{ height: "100%" }}
                      >
                        <div className="w-[20%]">
                          <img
                            src={item?.productImg[0].url}
                            width={"60%"}
                            height={"100%"}
                            alt={"No product"}
                            style={{
                              marginLeft: "auto",
                              marginRight: "auto",
                              marginBottom: "4px",
                            }}
                          />
                        </div>
                        <h1 className="mb-2 w-full cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis">
                          {item.name}
                        </h1>
                      </div>
                    </Button>
                  ))
                ) : (
                  <h1 className="mb-2 w-full cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis">
                    No product
                  </h1>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-1 sm:flex-none gap-2 items-center justify-end">
          <div
            onClick={toggleDark}
            className="flex relative items-center justify-center gap-2 rounded-[20px] w-[48px] h-[24px] border border-orange p-1 cursor-pointer hover:opacity-90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={darkMode ? "white" : "currentColor"}
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
            <div
              className={`absolute bg-orange rounded-[999px] w-[20px] h-[20px] ${changeTheme}`}
            ></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={!darkMode ? "black" : "currentColor"}
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          </div>
          {username ? (
            <div className="w-[100px] sm:w-max text-center">
              <div
                className="relative w-full sm:w-[60px] flex justify-center cursor-pointer"
                onClick={showModalUser}
              >
                <h1 className="text-md hover:text-orange dark:hover:text-white select-none whitespace-nowrap overflow-hidden text-ellipsis">
                  {username}
                </h1>
                {showUser ? content : null}
              </div>
            </div>
          ) : (
            <>
              <Button size="m" design="link-primary" to={"/login"}>
                đăng nhập
              </Button>
              <Button size="m" design="link-primary" to={"/register"}>
                đăng ký
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
