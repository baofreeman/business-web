import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../../api/productsApiSlice";
import EditForm from "../../form/editProductForm/EditForm";
import Loading from "../../ui/Loading/Loading";

const EditProduct = () => {
  const { productId } = useParams(); // GET param productId.

  const { product } = useGetProductsQuery("allProduct", {
    selectFromResult: ({ data }) => ({
      product: data?.entities[productId],
    }),
  }); // Get all products

  if (!product) return <Loading />;

  return (
    <div>
      <EditForm product={product} />
    </div>
  );
};

export default EditProduct;
