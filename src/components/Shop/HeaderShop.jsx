import { useCallback, useEffect, useState } from "react";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { optionCategory } from "../../services/option";
import queryString from "query-string";
import { Button } from "../ui/index";

const HeaderShop = () => {
  const { category } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const resetSearch = () => {
    searchParams.delete("tag");
    searchParams.delete("color");
    searchParams.delete("size");
    setSearchParams(searchParams);
  };

  const handleCategory = (e) => {
    resetSearch();
    const value = e.target.value;
    value === "tất cả" || "" ? navigate("/shop") : navigate(`/shop/${value}`);
  };

  return (
    <ul className="flex w-full dark:text-silver">
      {optionCategory.map((item) => (
        <li key={item}>
          <Button
            size="m"
            design={category === item ? `link-active` : "link-basic"}
            value={item || ""}
            onClick={(e) => handleCategory(e)}
          >
            {item}
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default HeaderShop;
