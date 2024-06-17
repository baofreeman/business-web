import React, { memo, useState } from "react";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../../api/productsApiSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "../../ui/Modal/Modal";
import EditIcon from "../../../assets/icons/EditIcon";
import DeleteIcon from "../../../assets/icons/DeleteIcon";

const ProductExtent = ({ productId }) => {
  const { product } = useGetProductsQuery("allProduct", {
    selectFromResult: ({ data }) => ({
      product: data?.entities[productId],
    }),
  });
  const [modal, setModal] = useState(false);

  const [deleteProduct] = useDeleteProductMutation();
  const handleToggleModal = () => {
    setModal((prev) => !prev);
  };

  const handleDelete = async (productId) => {
    try {
      const res = await deleteProduct({ productId });
      if (res.data) {
        toast.success(res.data.message);
      }
    } catch (error) {
      return toast.error(error.message);
    }
  };

  return (
    <tr>
      <td className="border px-8 py-4">
        <img src={product?.productImg[0].url} width={"60px"} />
      </td>
      <td className="border px-8 py-4">{product?.name}</td>
      <td className="border px-8 py-4">
        <p className="line-clamp-3">{product?.description}</p>
      </td>
      <td className="border px-8 py-4">{product?.category}</td>
      <td className="border px-8 py-4">
        <Link to={`/admin/products/edit-product/${productId}`}>
          <EditIcon />
        </Link>
      </td>
      <td className="border px-8 py-4">
        <DeleteIcon handleToggleModal={handleToggleModal} />
      </td>
      {modal && (
        <Modal
          handleToggleModal={handleToggleModal}
          callback={handleDelete}
          data={productId}
          title={"Bạn muốn xóa sản phẩm"}
        />
      )}
    </tr>
  );
};
const memoizedProduct = memo(ProductExtent);
export default memoizedProduct;
