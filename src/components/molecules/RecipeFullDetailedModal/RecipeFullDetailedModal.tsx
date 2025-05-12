import React, { useState } from "react";
import styles from "./RecipeFullDetailedModal.module.scss";
import { useRecipeContext } from "../../../context/RecipeContext";
import type { RecipeFullDetailedProps } from "../../../types/recipe.types";

const RecipeFullDetailedModal: React.FC<RecipeFullDetailedProps> = ({
  recipe,
  onClose,
}) => {
  const { isFavorite, toggleFavorite } = useRecipeContext();
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const value = (recipe as any)[`strIngredient${i}`];
      if (value && value.trim() !== "") {
        ingredients.push(value);
      }
    }
    return ingredients;
  };

  return (
    <div className={styles.overlay}>
      <div
        className={`${styles.modal} ${
          closing ? styles.fadeOut : styles.fadeIn
        }`}
      >
        <button className={styles.closeButton} onClick={handleClose}>
          ❌
        </button>
        <h2>{recipe.strMeal}</h2>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
        <p>
          <strong>Category:</strong> {recipe.strCategory}
        </p>
        <p>
          <strong>Country:</strong> {recipe.strArea}
        </p>

        {getIngredients().length > 0 && (
          <div className={styles.ingredients}>
            <h3>🧾 Ingredients</h3>
            <ul>
              {getIngredients().map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <p>
          <strong>Instructions:</strong> {recipe.strInstructions}
        </p>

        <button
          className={`${styles.favoriteButton} ${
            isFavorite(recipe.idMeal) ? styles.active : ""
          }`}
          onClick={() => toggleFavorite(recipe.idMeal)}
        >
          {isFavorite(recipe.idMeal)
            ? "💔 Remove Favorite"
            : "❤️ Add to Favorites"}
        </button>
      </div>
    </div>
  );
};

export default RecipeFullDetailedModal;
