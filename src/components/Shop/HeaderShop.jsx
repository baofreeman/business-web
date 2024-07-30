import { useEffect, useState } from "react";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { optionCategory } from "../../services/option";
import queryString from "query-string";
import { Button } from "../ui/index";

const HeaderShop = () => {
  const [category, setCategory] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const search = queryString.parse(location.search);

  const resetSearch = () => {
    searchParams.delete("productId");
    searchParams.delete("category");
    searchParams.delete("tag");
    searchParams.delete("color");
    searchParams.delete("size");
    setSearchParams(searchParams);
  };

  const handleCategory = (e) => {
    resetSearch();
    const value = e.target.value;
    setCategory(value);
  };

  useEffect(() => {
    if (category !== "" && Object.keys(search).length === 0) {
      navigate({
        pathname: `/shop/${category}`,
      });
    }
    if (Object.keys(search).length > 0 && !search.productId) {
      console.log(category);

      navigate({
        pathname: `/shop/filter`,
        search: createSearchParams({
          ...search,
        }).toString(),
      });
    }
  }, [location.pathname, category, navigate]);

  return (
    <ul className="flex w-full dark:text-silver">
      {optionCategory.map((item) => (
        <li key={item}>
          <Button
            size="m"
            design={true ? `link-active` : "link-basic"}
            value={item}
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
