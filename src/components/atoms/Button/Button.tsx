import React from "react";
import styles from "./Button.module.scss";
import type { ButtonProps } from "../../../types/recipe.types";

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  ...props
}) => {
  return (
    <button className={`${styles.button} ${styles[variant]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
