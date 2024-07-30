import { optionCategory } from "../services/option";

export const optionCategiesCustom = () => {
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
