import React, { useState } from "react";
import styles from "./RecipeCard.module.scss";
import type { RecipeCardProps } from "../../../types/recipe.types";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavorites } from "../../../hooks/useFavorites";
import { useRecipeContext } from "../../../context/RecipeContext";

const RecipeCard: React.FC<RecipeCardProps> = ({
  id,
  title,
  image,
  description,
}) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { setFavoriteStatus } = useRecipeContext();
  const [isFav, setIsFav] = useState(isFavorite(id));

  const handleFavoriteClick = () => {
    toggleFavorite(id);
    setIsFav(!isFav);
    setFavoriteStatus(!isFav);
  };

  return (
    <div className={styles.card} key={id}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.favorite}>
        {isFav ? (
          <FaHeart onClick={handleFavoriteClick} />
        ) : (
          <FaRegHeart onClick={handleFavoriteClick} />
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
