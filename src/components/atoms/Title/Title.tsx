import React from "react";
import styles from "./Title.module.scss";
import type { TitleProps } from "../../../types/recipe.types";

const Title: React.FC<TitleProps> = ({ text, variant = "primary" }) => {
  return <h1 className={`${styles.title} ${styles[variant]}`}>{text}</h1>;
};

export default Title;
