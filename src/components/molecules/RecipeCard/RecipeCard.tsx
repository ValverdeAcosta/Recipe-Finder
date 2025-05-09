import React from "react";
import styles from "./RecipeCard.module.scss";
import type { RecipeCardProps } from "../../../types/recipe.types";
import { useRecipeContext } from "../../../context/RecipeContext";

const RecipeCard: React.FC<RecipeCardProps> = ({
  title,
  image,
  description,
}) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default RecipeCard;
