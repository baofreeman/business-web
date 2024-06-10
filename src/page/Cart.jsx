import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrToCart,
  deleteCart,
  selectCartItem,
} from "../api/cartSlice";
import Button from "../components/ui/Button/Button";
import { convertPrice } from "../config/convertPrice";
import { useState } from "react";

const Cart = () => {
  const [modal, setModal] = useState(false);
  const [productId, setProductId] = useState();
  const cart = useSelector(selectCartItem);
  const dispatch = useDispatch();

  //increment product
  const handleIncr = (i) => {
    dispatch(addToCart(i));
  };

  //decrement product
  const handleDecr = (i) => {
    dispatch(decrToCart(i));
  };

  //delete product
  const handleDeleteCart = () => {
    dispatch(deleteCart(productId));
    handleToggleModal();
  };

  const handleToggleModal = (i) => {
    setProductId(i);
    setModal((prev) => !prev);
  };

  return (
    <section className="w-full h-[100%]">
      {cart.length > 0 ? (
        <table className="w-full">
          <thead className="w-full uppercase">
            <tr>
              <th className="text-center px-2 py-4 w-[20%]">hình ảnh</th>
              <th className="text-center px-2 py-4 w-[20%]">tên sản phẩm</th>
              <th className="text-center px-2 py-4 w-[10%]">màu sắc</th>
              <th className="text-center px-2 py-4 w-[10%]">kích cỡ</th>
              <th className="text-center px-2 py-4 w-[20%]">số lượng</th>
              <th className="text-center px-2 py-4 w-[20%]">giá</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {cart?.map((i) => (
              <tr className="" key={i?.subCategory.model.skus._id}>
                <td
                  className="border px-2 text-center w-[20%] h-full py-4"
                  style={{ height: "100%" }}
                >
                  <img
                    src={i?.productImg[0].url}
                    width={"60%"}
                    height={"100%"}
                    alt={"No product"}
                    style={{ marginLeft: "auto", marginRight: "auto" }}
                  />
                </td>
                <td className="border px-2 text-center py-4 whitespace-wrap overflow-hidden w-[20%]">
                  <h1 className=" line-clamp-3">{i?.name}</h1>
                </td>
                <td className="border px-2 text-center py-4 w-[10%]">
                  {i?.subCategory?.model?.color}
                </td>
                <td className="border px-2 text-center py-4 w-[10%]">
                  {i?.subCategory?.model?.skus?.size}
                </td>
                <td className="border px-2 text-center py-4 w-[20%]">
                  <div className="flex gap-5 items-center justify-center select-none">
                    <div onClick={() => handleIncr(i)}>
                      <div className="border rounded p-3 rotate-180 cursor-pointer">
                        <svg
                          className="fill-silver hover:fill-white"
                          width="12"
                          height="7"
                          viewBox="0 0 12 7"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1.71429 0H0V1.71429H1.71429V3.42857H3.42857V5.14286H5.14286V6.85714H6.85714V5.14286H8.57143V3.42857H10.2857V1.71429H12V0H10.2857V1.71429H8.57143V3.42857H6.85714V5.14286H5.14286V3.42857H3.42857V1.71429H1.71429V0Z"></path>
                        </svg>
                      </div>
                    </div>
                    <h1 className="text-orange">{i?.qty}</h1>
                    <div
                      onClick={() => handleDecr(i)}
                      aria-disabled={i?.qty <= 1}
                    >
                      <div
                        className={
                          i?.qty <= 1
                            ? "border rounded p-3 cursor-not-allowed opacity-50"
                            : "border rounded p-3 cursor-pointer"
                        }
                      >
                        <svg
                          className="fill-silver hover:fill-white"
                          width="12"
                          height="7"
                          viewBox="0 0 12 7"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1.71429 0H0V1.71429H1.71429V3.42857H3.42857V5.14286H5.14286V6.85714H6.85714V5.14286H8.57143V3.42857H10.2857V1.71429H12V0H10.2857V1.71429H8.57143V3.42857H6.85714V5.14286H5.14286V3.42857H3.42857V1.71429H1.71429V0Z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="border px-2 text-center py-4 select-none w-[20%]">
                  {convertPrice(i?.subCategory.model.skus.price)}
                </td>
                <td
                  className="border px-2 text-center py-4 select-none w-[20%]"
                  onClick={() => handleToggleModal(i)}
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
                </td>
                {modal && (
                  <div className="w-full h-[100%] flex items-center justify-center absolute top-0 left-0 right-0 bottom-0">
                    <div
                      className="w-full h-[100%] bg-black opacity-80"
                      onClick={() => handleToggleModal(i)}
                    ></div>
                    <div className="bg-white flex items-center justify-center w-[300px] h-[150px] dark:bg-black border rounded-md absolute">
                      <div className="absolute top-3 right-3">
                        <Button
                          size="m"
                          design="basic"
                          onClick={() => handleToggleModal(i)}
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
                        </Button>
                      </div>
                      <div className="flex justify-center gap-4 flex-col">
                        <h1>Bạn muốn xóa sản phẩm khỏi giỏ hàng</h1>
                        <div className="flex justify-center gap-2">
                          <Button
                            size="s"
                            design="primary"
                            onClick={handleDeleteCart}
                          >
                            Xoá
                          </Button>
                          <Button
                            size="s"
                            design="basic"
                            onClick={() => handleToggleModal(i)}
                          >
                            Hủy bỏ
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="w-full flex flex-col justify-center items-center h-[100%]">
          <span>Chưa có sản phẩm nào được chọn</span>
          <Button size="m" design="link-primary" width="max" to={"/shop"}>
            Tiếp tục mua sắm
          </Button>
        </div>
      )}
    </section>
  );
};

export default Cart;
