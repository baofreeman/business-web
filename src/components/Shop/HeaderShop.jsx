import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { OPTIONCATEGORY } from "../../contants/option";
import { Button } from "../ui";

const HeaderShop = () => {
  const { category } = useParams();
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
      {OPTIONCATEGORY.map((item) => (
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
