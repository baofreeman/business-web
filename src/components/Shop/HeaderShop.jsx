import { useEffect, useState } from "react";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { optionCategory } from "../../services/option";
import Button from "../ui/Button/Button";

const HeaderShop = () => {
  const [category, setCategory] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());

  // SET category.
  const handleCategory = (e) => {
    const value = e.target.value;
    setCategory(value);
    searchParams.delete("productId");
    searchParams.delete("category");
    searchParams.delete("tag");
    searchParams.delete("color");
    searchParams.delete("size");
    setSearchParams(searchParams);
  };

  // Check category, if category navigate /shop/:category. if category == all then render all product.
  useEffect(() => {
    if (category !== "" && !Object.keys(params).length) {
      navigate({
        pathname: `/shop/${category}`,
      });
    } else {
      setCategory("");
      navigate({
        pathname: `/shop`,
        search: createSearchParams({
          ...params,
        }).toString(),
      });
    }
  }, [category, location.pathname]);

  return (
    <ul className="flex w-full dark:text-silver">
      {optionCategory.map((item) => (
        <li key={item}>
          <Button
            size="m"
            design={category === item ? `link-active` : "link-basic"}
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
