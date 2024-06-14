import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../../api/productsApiSlice";
import EditForm from "../../form/editProductForm/EditForm";

const EditProduct = () => {
  const { productId } = useParams();
  const { product } = useGetProductsQuery("allProduct", {
    selectFromResult: ({ data }) => ({
      product: data?.entities[productId],
    }),
  });
  if (!product) return <p>Loading...</p>;
  return (
    <div>
      <EditForm product={product} />
    </div>
  );
};

export default EditProduct;
