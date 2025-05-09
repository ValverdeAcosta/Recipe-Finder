import React from "react";
import styles from "./Input.module.scss";
import type { InputProps } from "../../../types/recipe.types";

const Input: React.FC<InputProps> = (props) => {
  return <input className={styles.input} {...props} />;
};

export default Input;
