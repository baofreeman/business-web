import React, { createRef, useLayoutEffect, useMemo, useRef } from "react";
import {
  ao,
  giay,
  image1,
  image2,
  image3,
  image4,
  non,
  quan,
  thatlung,
} from "../../assets/img";
import Button from "../ui/Button/Button";
import { useNavigate } from "react-router-dom";
const Public = () => {
  const pageRef = useRef();
  const imageCatalog = [
    { category: "áo", image: image1, link: "/shop/áo" },
    { category: "quần", image: image2, link: "/shop/quần" },
    { category: "nón", image: image3, link: "/shop/nón" },
  ];
  const refs = imageCatalog;
  const childRefs = useMemo(
    () => refs?.map(() => createRef()),
    [refs?.join(",")]
  );
  let currentSlide = 0;
  useLayoutEffect(() => {
    const scrollPage = (index) => {
      childRefs?.forEach((slide, i) => {
        const slideHeight = slide.current?.clientHeight;
        slide.current.style.transform = `translateY(-${index * slideHeight}px)`;
      });
    };
    const wheelListener = (e) => {
      if (e.deltaY > 0) {
        currentSlide =
          (currentSlide + 1 + childRefs?.length) % childRefs?.length;
        scrollPage(currentSlide);
      } else {
        currentSlide =
          (currentSlide - 1 + childRefs?.length) % childRefs?.length;
        scrollPage(currentSlide);
      }
    };
    document.addEventListener("wheel", wheelListener);
    return () => {
      document.removeEventListener("wheel", wheelListener);
    };
  }, []);
  const navigate = useNavigate();
  const handleLink = (e) => {
    navigate(e);
  };
  const imageList = [
    { category: "áo", image: ao, link: "/shop/áo" },
    { category: "quần", image: quan, link: "/shop/quần" },
    { category: "thắt lưng", image: thatlung, link: "/shop/thắt%20lưng" },
    { category: "giày", image: giay, link: "/shop/giày" },
    { category: "nón", image: non, link: "/shop/nón" },
  ];
  return (
    <div className="w-full relative dark:bg-black" style={{ height: "100%" }}>
      <div className="w-full overflow-hidden" style={{ height: "100%" }}>
        <div
          ref={pageRef}
          className="w-screen h-screen"
          style={{ height: "100vh" }}
        >
          {imageCatalog.map((item, index) => (
            <div
              key={item.image}
              className="w-full cursor-pointer duration-700"
              ref={childRefs[index]}
              onClick={() => handleLink(item.link)}
              style={{ height: "100%" }}
            >
              <img
                src={item.image}
                className=""
                style={{ height: "100%", objectFit: "cover", width: "100%" }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 w-full px-[40px] h-[200px] sm:h-[100px] sm:px-[10px]">
        <div
          className="w-full relative flex gap-8 sm:gap-4 pb-[20px]"
          style={{ height: "100%" }}
        >
          {imageList.map((item) => (
            <div key={item.image} className="w-full flex items-center h-[100%]">
              <div
                className={`rounded-lg h-[100%] relative cursor-pointer gap-8 sm:gap-4 flex items-end justify-center w-full`}
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  backgroundSize: "contain",
                }}
                onClick={() => handleLink(item.link)}
              >
                <div className="absolute bottom-0 px-[50%]">
                  <Button
                    size="s-link"
                    design="link-basic"
                    width="full"
                    to={`${item.link}`}
                  >
                    {item.category}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Public;
