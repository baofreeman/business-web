import { useForm } from "react-hook-form";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useLazySeachProductQuery } from "../../api/productsApiSlice";

import { Input, Button, Loading, Errors } from "../ui";
import DeleteIcon from "../../assets/icons/DeleteIcon";
import SearchIcon from "../../assets/icons/SearchIcon";

const Search = ({ toggleModal, setToggleModal }) => {
  const navigate = useNavigate();

  const {
    register,
    resetField,
    formState: { errors },
  } = useForm();
  const [trigger, result] = useLazySeachProductQuery();
  const { data, isLoading, isError, error } = result;
  const handleSearch = (e) => {
    setToggleModal(true);
    let key = e.target.value;
    trigger(key);
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

  return (
    <div
      className={`flex h-[36px] relative justify-center items-center flex-1 sm:hidden`}
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
        <div className="px-2 absolute top-2.5 right-1 text-center py-2 select-none">
          <DeleteIcon handleToggleModal={turnOffModal} />
        </div>
      )}
      {toggleModal && (
        <div className="border rounded w-full h-[150px] absolute top-[35px] bg-black z-50 left-0 overflow-hidden">
          <div
            className="px-[20px] py-[10px] overflow-scroll no-scrollbar"
            style={{ height: "100%" }}
          >
            {isLoading && <Loading />}
            {data?.length > 0 ? (
              data?.map((item) => (
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
              <h1 className="mb-2 w-full text-center cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis">
                Không có sản phẩm tìm kiếm
              </h1>
            )}
          </div>
          {isError && <Errors>{error.message}</Errors>}
        </div>
      )}
    </div>
  );
};

export default Search;
