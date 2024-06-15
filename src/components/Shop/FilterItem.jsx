import React, { useEffect, useState } from "react";
import {
  color,
  optionCategory,
  size,
  subCategory,
} from "../../services/option";
import Select from "../ui/Select/Select";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Button from "../ui/Button/Button";
const FilterItem = () => {
  const navigate = useNavigate();
  //Set params
  const [catQuery, setCatQuery] = useState("");
  const [tagQuery, setTagQuery] = useState("");
  const [colorQuery, setColorQuery] = useState("");
  const [sizeQuery, setSizeQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { category } = useParams();
  const params = Object.fromEntries(searchParams.entries());
  searchParams.delete("productId");

  const subCategoryOption = subCategory.find(
    (item) => item.category === catQuery
  ); // filter category

  const optionCategies = () => {
    let optionAll = ["tất cả"];
    const optionCatCustom = optionCategory.filter(
      (item) => !optionAll.includes(item)
    );
    return optionCatCustom.map((item) => (
      <option key={item} value={item}>
        {item}
      </option>
    ));
  };

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

  //check tagQuery

  useEffect(() => {
    if (catQuery !== "") {
      navigate({
        pathname: `/shop`,
        search: createSearchParams({
          ...params,
          category: catQuery,
        }).toString(),
      });
    }
    return () => {};
  }, [catQuery]);

  useEffect(() => {
    if (tagQuery !== "") {
      navigate({
        pathname: `/shop`,
        search: createSearchParams({
          ...params,
          tag: tagQuery,
        }).toString(),
      });
    }
    return () => {};
  }, [tagQuery]);

  //check colorQuery
  useEffect(() => {
    if (colorQuery !== "") {
      navigate({
        pathname: `/shop`,
        search: createSearchParams({
          ...params,
          color: colorQuery,
        }).toString(),
      });
    }
    return () => {};
  }, [colorQuery]);

  //check sizeQuery
  useEffect(() => {
    if (sizeQuery !== "") {
      navigate({
        pathname: `/shop`,
        search: createSearchParams({
          ...params,
          size: sizeQuery,
        }).toString(),
      });
    }
    return () => {};
  }, [sizeQuery]);

  const handleCategory = (e) => {
    const value = e.target.value;
    if (value === "") {
      console.log("mount");
      searchParams.delete("category");
      setSearchParams(searchParams);
    } else {
      setCatQuery(value);
    }
    console.log(value);
  };

  const handleQuery = (e) => {
    setTagQuery(e.target.value);
  };
  const handleColor = (e) => {
    setColorQuery(e.target.value);
  };
  const handleSize = (e) => {
    setSizeQuery(e.target.value);
  };

  const resetQuery = () => {
    setCatQuery("");
    setTagQuery("");
    setColorQuery("");
    setSizeQuery("");
  };

  const handleReset = () => {
    resetQuery();
    searchParams.delete("category");
    searchParams.delete("tag");
    searchParams.delete("color");
    searchParams.delete("size");
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (category && catQuery) {
      resetQuery();
    }
  }, [category, catQuery]);

  const tagCss = tagQuery
    ? "text-active drop-shadow-md bg-gray rounded px-3 py-2"
    : "text-silver px-3 py-2";
  const sizeCss = sizeQuery
    ? "text-active drop-shadow-md bg-gray rounded px-3 py-2"
    : "text-silver px-3 py-2";
  const colorCss = colorQuery
    ? "text-active drop-shadow-md bg-gray rounded px-3 py-2"
    : "text-silver px-3 py-2";
  return (
    <div className="w-full h-max flex flex-col gap-4 relative md:flex-row sm:flex-row md:justify-between sm:justify-between sm:px-4">
      <h1 className="text-base sm:hidden md:hidden">Lọc</h1>
      <section className="text-md w-full flex flex-col gap-8 md:flex-row md:justify-between sm:flex-row md:gap-4 sm:gap-2 sm:justify-between sm:items-center">
        <div className="flex flex-col gap-3 md:flex-row sm:gap-1">
          <h1 className={`sm:text-sm sm:px-3 sm:hidden ${tagCss}`}>Danh mục</h1>
          <Select
            design="basic"
            value={catQuery}
            onChange={(e) => handleCategory(e)}
            label={"Danh mục"}
          >
            {optionCategies()}
          </Select>
        </div>
        <div className="flex flex-col gap-3 md:flex-row sm:gap-1">
          <h1 className={`sm:text-sm sm:px-3 sm:hidden ${tagCss}`}>
            Kiểu dáng
          </h1>
          <Select
            design="basic"
            value={tagQuery}
            onChange={(e) => handleQuery(e)}
            disabled={!catQuery}
            label={"Kiểu dáng"}
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
            value={colorQuery}
            onChange={(e) => handleColor(e)}
            label={"Màu sắc"}
          >
            {colorOption}
          </Select>
        </div>
        <div className="flex flex-col gap-3 md:flex-row sm:gap-1">
          <h1 className={`sm:text-sm sm:px-3 sm:hidden ${sizeCss}`}>Size</h1>
          <Select
            design="basic"
            value={sizeQuery}
            onChange={(e) => handleSize(e)}
            label={"Kích cỡ"}
          >
            {sizeOption}
          </Select>
        </div>

        <div className="flex flex-col gap-3 md:flex-row sm:gap-1">
          <Button
            design={
              tagQuery || catQuery || colorQuery || sizeQuery
                ? "basic"
                : "disable"
            }
            onClick={handleReset}
            size="s"
            disabled={!tagQuery && !catQuery && !colorQuery && !sizeQuery}
          >
            reset
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FilterItem;
