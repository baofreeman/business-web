import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrToCart,
  deleteCart,
  selectCartItem,
} from "../../api/cartSlice";
import { convertPrice } from "../../config/convertPrice";
import Button from "../ui/Button/Button";
import Modal from "../ui/Modal/Modal";
import DeleteIcon from "../../assets/icons/DeleteIcon";
import ArrowIcon from "../../assets/icons/ArrowIcon";

const CartDetail = () => {
  const [product, setProduct] = useState();
  const [modal, setModal] = useState(false);
  const cart = useSelector(selectCartItem); // GET cart.
  const dispatch = useDispatch();

  // Increment product.
  const handleIncr = (item) => {
    dispatch(addToCart(item));
  };

  // Decrement product.
  const handleDecr = (item) => {
    dispatch(decrToCart(item));
  };

  // Delete product.
  const handleDeleteCart = () => {
    dispatch(deleteCart(product));
    setModal((prev) => !prev);
  };

  // Toggle modal.
  const handleToggleModal = (item) => {
    setProduct(item);
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
            {cart?.map((item) => (
              <tr className="" key={item?.subCategory.model.skus._id}>
                <td
                  className="border px-2 text-center w-[20%] h-full py-4"
                  style={{ height: "100%" }}
                >
                  <img
                    src={item?.productImg[0].url}
                    width={"60%"}
                    height={"100%"}
                    alt={"No product"}
                    style={{ marginLeft: "auto", marginRight: "auto" }}
                  />
                </td>
                <td className="border px-2 text-center py-4 whitespace-wrap overflow-hidden w-[20%]">
                  <h1 className=" line-clamp-3">{item?.name}</h1>
                </td>
                <td className="border px-2 text-center py-4 w-[10%]">
                  {item?.subCategory?.model?.color}
                </td>
                <td className="border px-2 text-center py-4 w-[10%]">
                  {item?.subCategory?.model?.skus?.size}
                </td>
                <td className="border px-2 text-center py-4 w-[20%]">
                  <div className="flex gap-5 items-center justify-center select-none">
                    <div onClick={() => handleIncr(item)}>
                      <div className="border rounded p-3 cursor-pointer">
                        <ArrowIcon width={12} height={7} rotate={"180deg"} />
                      </div>
                    </div>
                    <h1 className="text-orange">{item?.qty}</h1>
                    <div
                      onClick={() => handleDecr(item)}
                      aria-disabled={item?.qty <= 1}
                    >
                      <div
                        className={
                          item?.qty <= 1
                            ? "border rounded p-3 cursor-not-allowed opacity-50"
                            : "border rounded p-3 cursor-pointer"
                        }
                      >
                        <ArrowIcon width={12} height={7} rotate={"0deg"} />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="border px-2 text-center py-4 select-none w-[20%]">
                  {convertPrice(item?.subCategory.model.skus.price)}
                </td>
                <td className="border px-2 text-center py-4 select-none w-[20%]">
                  <DeleteIcon
                    handleToggleModal={() => handleToggleModal(item)}
                  />
                </td>
                {modal && (
                  <Modal
                    handleToggleModal={handleToggleModal}
                    callback={handleDeleteCart}
                    title={"Bạn muốn xóa sản phẩm khỏi giỏ hàng"}
                    data={product}
                  />
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

export default CartDetail;
