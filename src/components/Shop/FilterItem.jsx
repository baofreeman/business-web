import { useEffect, useState } from "react";
import { color, size, subCategory } from "../../services/option";
import Select from "../ui/Select/Select";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Button } from "../ui/index";
import { optionCategiesCustom } from "../../utils/convert";
import queryString from "query-string";

const FilterItem = () => {
  const navigate = useNavigate();

  // Set query params.
  const [catQuery, setCatQuery] = useState("");
  const [tagQuery, setTagQuery] = useState("");
  const [colorQuery, setColorQuery] = useState("");
  const [sizeQuery, setSizeQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { category } = useParams();
  const location = useLocation();

  const search = queryString.parse(location.search);
  searchParams.delete("productId");

  // Filter category.
  const subCategoryOption = subCategory.find(
    (item) => item.category === catQuery
  );

  const optionCategies = optionCategiesCustom;

  // Filter tag.
  const optionSub = subCategoryOption?.data?.map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ));

  // Filter color.
  const colorOption = color.map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ));

  // Filter size.
  const sizeOption = size.map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ));

  useEffect(() => {
    searchParams.delete("tag");
    setSearchParams(searchParams);
    //
  }, [catQuery]);

  const handleCategory = (e) => {
    searchParams.delete("tag");
    setSearchParams(searchParams);
    const value = e.target.value;
    setCatQuery(value);
    if (value !== "") {
      navigate({
        pathname: `/shop/filter`,
        search: createSearchParams({
          ...search,
          category: value,
        }).toString(),
      });
    } else {
      searchParams.delete("category");
      setSearchParams(searchParams);
    }
  };

  // Select tag.
  const handleTag = (e) => {
    const value = e.target.value;
    setTagQuery(e.target.value);

    if (value !== "") {
      navigate({
        pathname: `/shop/filter`,
        search: createSearchParams({
          ...search,
          tag: value,
        }).toString(),
      });
    } else {
      searchParams.delete("tag");
      setSearchParams(searchParams);
    }
  };

  // Select color.
  const handleColor = (e) => {
    const value = e.target.value;
    setColorQuery(e.target.value);
    if (value !== "") {
      navigate({
        pathname: `/shop/filter`,
        search: createSearchParams({
          ...search,
          color: value,
        }).toString(),
      });
    } else {
      searchParams.delete("color");
      setSearchParams(searchParams);
    }
  };

  // Select size.
  const handleSize = (e) => {
    const value = e.target.value;
    setSizeQuery(e.target.value);
    if (value !== "") {
      navigate({
        pathname: `/shop/filter`,
        search: createSearchParams({
          ...search,
          size: value,
        }).toString(),
      });
    } else {
      searchParams.delete("size");
      setSearchParams(searchParams);
    }
  };

  // Reset all query.
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

  // If path /shop/:category && catgory query => reset query, rediect /shop/:category.
  useEffect(() => {
    if (category && catQuery) {
      resetQuery();
    }
  }, [category, catQuery]);

  // Css selected query.
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
            onChange={(e) => handleTag(e)}
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
