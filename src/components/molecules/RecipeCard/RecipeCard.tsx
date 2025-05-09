import React from "react";
import styles from "./RecipeCard.module.scss";
import type { RecipeCardProps } from "../../../types/recipe.types";

const RecipeCard: React.FC<RecipeCardProps> = ({
  title,
  image,
  description,
  onClick,
}) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default RecipeCard;
