import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { optionCategory } from "../../services/option";
import Button from "../ui/Button/Button";

const HeaderShop = () => {
  const [category, setCategory] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // SET category
  const handleCategory = (e) => {
    const value = e.target.value;
    setCategory(value);
  };

  // Check category, if category navigate /shop/category. if category == all then render all product
  useEffect(() => {
    if (category !== "") {
      navigate({
        pathname: `/shop/${category}`,
      });
    }
    if (category == "tất cả") {
      navigate("/shop");
    }
  }, [category]);

  useEffect(() => {
    if (location.pathname === "/shop") {
      setCategory("tất cả");
    }
  }, [location]);

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
