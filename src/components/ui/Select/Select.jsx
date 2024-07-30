import { SelectDesign } from "./theme";
import Errors from "../Errors/Errors";

const Select = ({
  children,
  name,
  label,
  register,
  onChange,
  error,
  ...props
}) => {
  const { design } = props;
  return (
    <div className="w-full">
      <select
        className={`${SelectDesign[design]}`}
        {...(register ? { ...register(name) } : null)}
        onChange={onChange}
        {...props}
      >
        <option value={""}>{`${label}`}</option>
        {children}
      </select>
      {error && <Errors>{error}</Errors>}
    </div>
  );
};

export default Select;
