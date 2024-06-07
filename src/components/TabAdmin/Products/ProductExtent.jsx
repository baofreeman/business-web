import React, { memo } from "react";
import { useGetProductsQuery } from "../../../api/productsApiSlice";
import { Link } from "react-router-dom";

const ProductExtent = ({ productId }) => {
  const { product } = useGetProductsQuery("allProduct", {
    selectFromResult: ({ data }) => ({
      product: data?.entities[productId],
    }),
  });
  console.log(product);
  return (
    <tr>
      <td className="border px-8 py-4">
        <img
          src={`${process.env.REACT_APP_SERVER_URL}/uploads/products/${product?.productImg[0]}`}
          width={"60px"}
        />
      </td>
      <td className="border px-8 py-4">{product?.name}</td>
      <td className="border px-8 py-4">
        <p className="line-clamp-3">{product?.description}</p>
      </td>
      <td className="border px-8 py-4">{product?.category}</td>
      <td className="border px-8 py-4">
        <Link to={`/admin/products/edit-product/${productId}`}>
          <svg
            className="fill-silver hover:fill-white cursor-pointer"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="3.81787"
              y="3.81787"
              width="2.54545"
              height="2.54545"
              transform="rotate(180 3.81787 3.81787)"
            ></rect>
            <rect
              x="3.81787"
              y="2.96973"
              width="1.69697"
              height="1.69697"
              transform="rotate(180 3.81787 2.96973)"
            ></rect>
            <rect
              x="3.81787"
              y="12.7266"
              width="2.54545"
              height="2.54545"
              transform="rotate(180 3.81787 12.7266)"
            ></rect>
            <rect
              x="3.81787"
              y="11.8779"
              width="1.69697"
              height="1.69697"
              transform="rotate(180 3.81787 11.8779)"
            ></rect>
            <rect
              x="12.7271"
              y="3.81787"
              width="2.54545"
              height="2.54545"
              transform="rotate(180 12.7271 3.81787)"
            ></rect>
            <rect
              x="12.7271"
              y="2.96973"
              width="1.69697"
              height="1.69697"
              transform="rotate(180 12.7271 2.96973)"
            ></rect>
            <rect
              x="12.7271"
              y="12.7266"
              width="2.54545"
              height="2.54545"
              transform="rotate(180 12.7271 12.7266)"
            ></rect>
            <rect
              x="12.7271"
              y="11.8779"
              width="1.69697"
              height="1.69697"
              transform="rotate(180 12.7271 11.8779)"
            ></rect>
            <rect
              x="4.45459"
              y="4.45361"
              width="1.90909"
              height="1.90909"
              transform="rotate(180 4.45459 4.45361)"
            ></rect>
            <rect
              x="4.45459"
              y="3.81738"
              width="1.27273"
              height="1.27273"
              transform="rotate(180 4.45459 3.81738)"
            ></rect>
            <rect
              x="4.45459"
              y="3.81738"
              width="1.27273"
              height="1.27273"
              transform="rotate(180 4.45459 3.81738)"
            ></rect>
            <rect
              x="6.57593"
              y="2.54541"
              width="2.54545"
              height="1.69697"
              transform="rotate(-90 6.57593 2.54541)"
            ></rect>
            <rect
              x="5.72729"
              y="2.54541"
              width="2.54545"
              height="1.69697"
              transform="rotate(-90 5.72729 2.54541)"
            ></rect>
            <rect
              x="6.36353"
              y="11.4536"
              width="1.90909"
              height="5.09091"
              transform="rotate(-90 6.36353 11.4536)"
            ></rect>
            <rect
              x="3.81812"
              y="11.4536"
              width="1.90909"
              height="5.09091"
              transform="rotate(-90 3.81812 11.4536)"
            ></rect>
            <rect
              x="5.93945"
              y="4.45361"
              width="1.90909"
              height="4.24242"
              transform="rotate(-90 5.93945 4.45361)"
            ></rect>
            <rect
              x="3.81812"
              y="4.45361"
              width="1.90909"
              height="4.24242"
              transform="rotate(-90 3.81812 4.45361)"
            ></rect>
            <rect
              x="2.54541"
              y="6.15137"
              width="1.90909"
              height="4.66667"
            ></rect>
            <rect
              x="2.54541"
              y="3.81787"
              width="1.90909"
              height="4.66667"
            ></rect>
            <rect
              x="4.45459"
              y="4.87842"
              width="1.27273"
              height="0.848485"
            ></rect>
            <rect
              x="4.45459"
              y="4.4541"
              width="1.27273"
              height="0.848485"
            ></rect>
            <rect
              x="8.27295"
              y="4.87842"
              width="1.27273"
              height="0.848485"
            ></rect>
            <rect
              x="8.27295"
              y="4.4541"
              width="1.27273"
              height="0.848485"
            ></rect>
            <rect
              x="8.27295"
              y="8.69678"
              width="1.27273"
              height="0.848485"
            ></rect>
            <rect
              x="8.27295"
              y="8.27246"
              width="1.27273"
              height="0.848485"
            ></rect>
            <rect
              x="4.45459"
              y="8.69678"
              width="1.27273"
              height="0.848485"
            ></rect>
            <rect
              x="4.45459"
              y="8.27246"
              width="1.27273"
              height="0.848485"
            ></rect>
            <rect
              x="9.54541"
              y="5.93945"
              width="1.90909"
              height="4.24242"
            ></rect>
            <rect
              x="9.54541"
              y="3.81787"
              width="1.90909"
              height="4.24242"
            ></rect>
            <rect
              x="7.42407"
              y="11.4541"
              width="2.54545"
              height="1.69697"
              transform="rotate(90 7.42407 11.4541)"
            ></rect>
            <rect
              x="8.27271"
              y="11.4541"
              width="2.54545"
              height="1.69697"
              transform="rotate(90 8.27271 11.4541)"
            ></rect>
            <rect y="6.36377" width="2.54545" height="1.27273"></rect>
            <rect y="5.72705" width="2.54545" height="0.636364"></rect>
            <rect
              x="13.3635"
              y="6.99951"
              width="2.54545"
              height="1.27273"
              transform="rotate(-180 13.3635 6.99951)"
            ></rect>
            <rect
              x="13.3635"
              y="7.63574"
              width="2.54545"
              height="0.636364"
              transform="rotate(-180 13.3635 7.63574)"
            ></rect>
            <rect
              x="11.4546"
              y="6.57568"
              width="2.54545"
              height="1.69697"
            ></rect>
            <rect
              x="11.4546"
              y="5.72705"
              width="2.54545"
              height="1.69697"
            ></rect>
            <rect
              x="2.54541"
              y="7.42383"
              width="2.54545"
              height="1.69697"
              transform="rotate(-180 2.54541 7.42383)"
            ></rect>
            <rect
              x="2.54541"
              y="8.27246"
              width="2.54545"
              height="1.69697"
              transform="rotate(-180 2.54541 8.27246)"
            ></rect>
          </svg>
        </Link>
      </td>
      <td className="border px-8 py-4">
        <Link to={`/admin/products/edit-product/${productId}`}>
          <svg
            className="fill-silver hover:fill-white cursor-pointer"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0H1.71429V1.71429H0V0ZM3.42857 3.42857H1.71429V1.71429H3.42857V3.42857ZM5.14286 5.14286H3.42857V3.42857H5.14286V5.14286ZM6.85714 5.14286H5.14286V6.85714H3.42857V8.57143H1.71429V10.2857H0V12H1.71429V10.2857H3.42857V8.57143H5.14286V6.85714H6.85714V8.57143H8.57143V10.2857H10.2857V12H12V10.2857H10.2857V8.57143H8.57143V6.85714H6.85714V5.14286ZM8.57143 3.42857V5.14286H6.85714V3.42857H8.57143ZM10.2857 1.71429V3.42857H8.57143V1.71429H10.2857ZM10.2857 1.71429V0H12V1.71429H10.2857Z"></path>
          </svg>
        </Link>
      </td>
    </tr>
  );
};
const memoizedProduct = memo(ProductExtent);
export default memoizedProduct;
