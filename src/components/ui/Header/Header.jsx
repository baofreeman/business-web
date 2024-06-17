import { useState } from "react";
import Button from "../Button/Button";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hook/useAuth";
import { useSendLogOutMutation } from "../../../api/authApiSlice";
import Input from "../Input/Input";
import { useForm } from "react-hook-form";
import { useSeachProductQuery } from "../../../api/productsApiSlice";
import Logo from "../../../assets/icons/Logo";
import SearchIcon from "../../../assets/icons/SearchIcon";
import DeleteIcon from "../../../assets/icons/DeleteIcon";
import DarkIcon from "../../../assets/icons/DarkIcon";
import SunIcon from "../../../assets/icons/SunIcon";

const Header = ({ darkMode, toggleDark }) => {
  const navigate = useNavigate();
  const [showUser, setShowUser] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  const [key, setKey] = useState("");
  const { username, isAdmin } = useAuth();
  const [sendLogOut, { isLoading }] = useSendLogOutMutation();
  const [toggleModal, setToggleModal] = useState(false);

  const handleLogOut = async () => {
    await sendLogOut();
    navigate("/login");
    window.location.reload();
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
    const { productId } = item;
    if (productId) {
      navigate({
        pathname: "/shop",
        search: createSearchParams({
          productId: productId,
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
              <SearchIcon />
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
            <div className="px-2 absolute top-1 right-1 text-center py-2 select-none">
              <DeleteIcon handleToggleModal={turnOffModal} />
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
                          productId: item._id,
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
            <DarkIcon darkMode={darkMode} />
            <div
              className={`absolute bg-orange rounded-[999px] w-[20px] h-[20px] ${changeTheme}`}
            ></div>
            <SunIcon darkMode={!darkMode} />
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
