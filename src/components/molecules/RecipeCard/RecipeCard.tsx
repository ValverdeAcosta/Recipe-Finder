import React from "react";
import styles from "./RecipeCard.module.scss";
import type { RecipeCardProps } from "../../../types/recipe.types";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useRecipeContext } from "../../../context/RecipeContext";

const RecipeCard: React.FC<RecipeCardProps> = ({
  id,
  title,
  image,
  description,
}) => {
  const { toggleFavorite, isFavorite, getRecipeDetails } = useRecipeContext();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(id);
  };

  const openFullDetails = () => {
    getRecipeDetails(id);
  };

  return (
    <div className={styles.card} onClick={openFullDetails}>
      <div>
        <img src={image} alt={title} className={styles.image} />
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
      <div className={styles.favorite}>
        {isFavorite(id) ? (
          <FaHeart onClick={handleFavoriteClick} />
        ) : (
          <FaRegHeart onClick={handleFavoriteClick} />
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
