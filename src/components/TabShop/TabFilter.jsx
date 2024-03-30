import React, { useEffect, useState } from "react";
import { color, size, subCategory } from "../../services/option";
import Select from "../ui/Select/Select";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
const TabFilter = () => {
  const navigate = useNavigate();
  const { category } = useParams();

  //Set params
  const [queryTag, setQueryTag] = useState(undefined);
  const [queryColor, setQueryColor] = useState(undefined);
  const [querySize, setQuerySize] = useState(undefined);
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());

  const subCategoryOption = subCategory.find(
    (item) => item.category === category
  ); // filter category

  const optionSub = subCategoryOption?.data?.map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  )); // filter tag

  const colorOption = color.map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  )); // filter color

  const sizeOption = size.map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  )); // filter size

  //check queryTag
  useEffect(() => {
    if (category && queryTag !== undefined) {
      navigate({
        pathname: `/shop/${category}`,
        search: createSearchParams({
          ...params,
          tag: queryTag,
        }).toString(),
      });
    }
    return () => {};
  }, [queryTag]);

  //check querycolor
  useEffect(() => {
    if (queryColor !== undefined) {
      navigate({
        pathname: `/shop/${category}`,
        search: createSearchParams({
          ...params,
          color: queryColor,
        }).toString(),
      });
    }
    return () => {};
  }, [queryColor]);

  //check querySize
  useEffect(() => {
    if (querySize !== undefined) {
      navigate({
        pathname: `/shop/${category}`,
        search: createSearchParams({
          ...params,
          size: querySize,
        }).toString(),
      });
    }
    return () => {};
  }, [querySize]);

  const handleQuery = (e) => {
    setQueryTag(e.target.value);
  };
  const handleColor = (e) => {
    setQueryColor(e.target.value);
  };
  const handleSize = (e) => {
    setQuerySize(e.target.value);
  };

  const tagCss = queryTag
    ? "text-active drop-shadow-md bg-gray rounded px-3 py-2"
    : "text-silver px-3 py-2";
  const sizeCss = querySize
    ? "text-active drop-shadow-md bg-gray rounded px-3 py-2"
    : "text-silver px-3 py-2";
  const colorCss = queryColor
    ? "text-active drop-shadow-md bg-gray rounded px-3 py-2"
    : "text-silver px-3 py-2";
  return (
    <div className="w-full h-max flex flex-col gap-4 relative md:flex-row sm:flex-row md:justify-between sm:justify-between sm:px-4">
      <h1 className="text-base sm:hidden md:hidden">Lọc</h1>
      <section className="text-md w-full flex flex-col gap-8 md:flex-row md:justify-between sm:flex-row md:gap-4 sm:gap-2 sm:justify-between sm:items-center">
        <div className="flex flex-col gap-3 md:flex-row sm:gap-1">
          <h1 className={`sm:text-sm sm:px-3 sm:hidden ${tagCss}`}>
            Kiểu dáng
          </h1>
          <Select
            design="basic"
            onChange={(e) => handleQuery(e)}
            disabled={!category}
            label={"kiểu dáng"}
          >
            {optionSub}
          </Select>
        </div>
        <div className="flex flex-col gap-3 md:flex-row sm:gap-1">
          <h1 className={`sm:text-sm sm:px-3 sm:hidden ${colorCss}`}>
            Màu sắc
          </h1>
          <Select
            design="basic"
            onChange={(e) => handleColor(e)}
            disabled={!category}
            label={"màu sắc"}
          >
            {colorOption}
          </Select>
        </div>
        <div className="flex flex-col gap-3 md:flex-row sm:gap-1">
          <h1 className={`sm:text-sm sm:px-3 sm:hidden ${sizeCss}`}>Size</h1>
          <Select
            design="basic"
            onChange={(e) => handleSize(e)}
            disabled={!category}
            label={"kích cỡ"}
          >
            {sizeOption}
          </Select>
        </div>
      </section>
    </div>
  );
};

export default TabFilter;
