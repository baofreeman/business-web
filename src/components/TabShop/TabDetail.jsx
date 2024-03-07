import { createRef, useMemo } from "react";
import { useGetProductsQuery } from "../../api/productsApiSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import ModelDetail from "./ModelDetail";

const TabDetail = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");
  const navigate = useNavigate();
  console.log(productId);
  const { product } = useGetProductsQuery("allProduct", {
    selectFromResult: ({ data }) => ({
      product: data?.entities[productId],
    }),
  });

  const refs = product?.productImg;
  const childRefs = useMemo(
    () => refs?.map(() => createRef()),
    [refs?.join(",")]
  );
  let currentSlide = 0;

  const showSlide = (index) => {
    childRefs?.forEach((slide, i) => {
      const slideWidth = slide.current?.clientWidth;
      slide.current.style.transform = `translateX(-${index * slideWidth}px)`;
    });
  };

  const preSlide = () => {
    currentSlide = (currentSlide - 1 + childRefs?.length) % childRefs?.length;
    showSlide(currentSlide);
  };

  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % childRefs?.length;
    showSlide(currentSlide);
  };

  return (
    <div className="flex sm:h-[100%] md:h-[100%] flex-col gap-4 w-full uppercase p-[12px]">
      {product ? (
        <>
          <div
            className="w-full overflow-hidden overflow-scroll no-scrollbar relative flex items-center"
            style={{
              margin: "auto",
            }}
          >
            {product?.productImg.map((item, index) => (
              <div
                className="w-full flex items-center justify-center h-[100%]"
                key={item}
                style={{
                  flex: "0 0 100%",
                }}
                ref={childRefs[index]}
              >
                <img
                  src={`${REACT_APP_SERVER_URL}/uploads/products/${item}`}
                  alt="no product"
                  className="w-full object-cover"
                  style={{ height: "auto" }}
                />
              </div>
            ))}
            <a className="prev" onClick={preSlide}>
              <div className="p-3 rotate-90 cursor-pointer absolute left-0 select-none">
                <svg
                  className="fill-silver hover:fill-white"
                  width="24"
                  height="14"
                  viewBox="0 0 12 7"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1.71429 0H0V1.71429H1.71429V3.42857H3.42857V5.14286H5.14286V6.85714H6.85714V5.14286H8.57143V3.42857H10.2857V1.71429H12V0H10.2857V1.71429H8.57143V3.42857H6.85714V5.14286H5.14286V3.42857H3.42857V1.71429H1.71429V0Z"></path>
                </svg>
              </div>
            </a>
            <a className="next" onClick={nextSlide}>
              <div
                className="p-3 cursor-pointer absolute right-0 select-none"
                style={{ rotate: "-90deg" }}
              >
                <svg
                  className="fill-silver hover:fill-white"
                  width="24"
                  height="14"
                  viewBox="0 0 12 7"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1.71429 0H0V1.71429H1.71429V3.42857H3.42857V5.14286H5.14286V6.85714H6.85714V5.14286H8.57143V3.42857H10.2857V1.71429H12V0H10.2857V1.71429H8.57143V3.42857H6.85714V5.14286H5.14286V3.42857H3.42857V1.71429H1.71429V0Z"></path>
                </svg>
              </div>
            </a>
          </div>
          <div className="hidden sm:block md:block">
            <ModelDetail />
          </div>
        </>
      ) : (
        <div className="p-[12px]">
          <div className="w-full h-[300px] border rounded bg-gray opacity-50 flex flex-col items-center justify-center">
            <svg
              width="60%"
              height="60%"
              viewBox="0 0 16 15"
              fill="#929292"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.800551 0H0.8V0.8H0V0.800034H0.8V1.60003H0V12.8H0.8V13.6V13.6V14.4H0V14.4H16V0H15.9994V0.8H15.2003H15.1994H14.4003V0H1.60055V0.8H0.800551V0ZM14.4 1.6V12.8H1.6V1.6H14.4ZM9.6 4.8H8V6.4H6.4V8H4.8V9.6H3.2V11.2H4.8V9.6H6.4V8H8V6.4H9.6V8H11.2V9.6H12.8V8H11.2V6.4H9.6V4.8ZM4.8 3.2H3.2V4.8H4.8V3.2ZM15.1994 13.6V12.8H15.9994V13.6V13.6V14.4H15.2003H15.1994H14.4003V13.6H15.1994ZM1.60055 13.6H0.800551V14.4H1.60055V13.6ZM15.9994 0.800034H15.1994V1.60003H15.9994V0.800034Z"
              ></path>
            </svg>
            <h1>Chọn sản phẩm để xem chi tiết</h1>
          </div>
        </div>
      )}
    </div>
  );
};
export default TabDetail;
