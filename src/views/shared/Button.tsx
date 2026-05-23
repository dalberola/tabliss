import React, { FC } from "react";

type Props = Omit<JSX.IntrinsicElements["button"], "ref"> & {
  primary?: boolean;
};

const Button: FC<Props> = ({ className, children, primary, ...props }) => (
  <button
    className={`button ${primary ? "button--primary" : ""} ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
