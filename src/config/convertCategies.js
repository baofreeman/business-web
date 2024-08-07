import { OPTIONCATEGORY } from "../contants/option";

export const convertCategies = () => {
  let optionAll = ["tất cả"];
  const optionCatCustom = OPTIONCATEGORY.filter(
    (item) => !optionAll.includes(item)
  );
  return optionCatCustom.map((item) => (
    <option key={item} value={item} className="custom-option">
      {item}
    </option>
  ));
};
