import React from "react";
import { SelectDesign } from "./theme";
import Errors from "../Errors/Errors";

const Select = ({ children, name, register, onChange, error, ...props }) => {
  const { design } = props;
  return (
    <div className="w-full">
      <input
        className={`${SelectDesign[design]}`}
        {...(register ? { ...register(name) } : null)}
        onChange={onChange}
        {...props}
      />

      <Errors>{error}</Errors>
    </div>
  );
};

export default Select;
