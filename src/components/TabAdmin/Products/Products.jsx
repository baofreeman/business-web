import React from "react";
import { useGetProductsQuery } from "../../../api/productsApiSlice";
import ProductExtent from "./ProductExtent";

const Products = () => {
  const { products } = useGetProductsQuery("allProduct", {
    selectFromResult: ({ data }) => ({
      products: data?.ids.map((id) => id),
    }),
  });
  let content;

  content = products.length
    ? products.map((productId) => (
        <ProductExtent key={productId} productId={productId} />
      ))
    : (content = (
        <div className="text-center m-auto">
          <h1>Không có sản phẩm</h1>
        </div>
      ));
  return (
    <div className="p-10 w-full">
      <section className="w-full">
        {products && products.length ? (
          <table className="w-full uppercase">
            <thead>
              <tr>
                <th className="text-left px-8 py-4">Hình ảnh</th>
                <th className="text-left px-8 py-4">tên</th>
                <th className="text-left px-8 py-4">mô tả</th>
                <th className="text-left px-8 py-4">danh mục</th>
                <th className="text-left px-8 py-4"></th>
                <th className="text-left px-8 py-4"></th>
              </tr>
            </thead>
            <tbody>{content}</tbody>
          </table>
        ) : (
          <div className="text-center m-auto">
            <h1>Không có sản phẩm</h1>
          </div>
        )}
      </section>
    </div>
  );
};

export default Products;
