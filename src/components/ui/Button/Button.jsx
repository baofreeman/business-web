import React from "react";
import { ButtonDesign, ButtonPostion, ButtonSize, ButtonWidth } from "./theme";
import { Link } from "react-router-dom";

const Button = ({ to, href, children, ...props }) => {
  let Comp = "button";
  const { size, design, width, position } = props;
  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = "a";
  }
  return (
    <div className={`${ButtonWidth[width]} ${ButtonPostion[position]}`}>
      <Comp
        className={`${ButtonSize[size]} ${ButtonDesign[design]}`}
        {...props}
      >
        {children}
      </Comp>
    </div>
  );
};

export default Button;
