import React, { memo, useState } from "react";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../../api/productsApiSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "../../ui/Modal";
import EditIcon from "../../../assets/icons/EditIcon";
import DeleteIcon from "../../../assets/icons/DeleteIcon";

const ProductExtent = ({ productId }) => {
  const [modal, setModal] = useState(false);

  const { product } = useGetProductsQuery("getProducts", {
    selectFromResult: ({ data }) => ({
      product: data?.entities[productId],
    }),
    refetchOnMountOrArgChange: true,
  }); // GET product based on productId.

  const [deleteProduct] = useDeleteProductMutation(); // Delete mutation.

  //Toggle modal.
  const handleToggleModal = () => {
    setModal((prev) => !prev);
  };

  // Delete product based on productId.
  const handleDelete = async (productId) => {
    try {
      const res = await deleteProduct({ productId });
      if (res.data) {
        toast.success(res.data.message);
        window.location.reload();
      }
      handleToggleModal();
    } catch (error) {
      toast.error(error.message);
      return error;
    }
  };

  return (
    <>
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
      </tr>
      {modal && (
        <Modal
          handleToggleModal={handleToggleModal}
          callback={handleDelete}
          data={productId}
          title={"Bạn muốn xóa sản phẩm"}
        />
      )}
    </>
  );
};
const memoizedProduct = memo(ProductExtent);
export default memoizedProduct;
