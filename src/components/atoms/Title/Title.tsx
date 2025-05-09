import React from "react";
import styles from "./Title.module.scss";
import type { TitleProps } from "../../../types/recipe.types";

const Title: React.FC<TitleProps> = ({ text }) => {
  return <h1 className={styles.title}>{text}</h1>;
};

export default Title;
