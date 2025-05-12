import React, { useState } from "react";
import styles from "./RecipeFullDetailedModal.module.scss";
import { useRecipeContext } from "../../../context/RecipeContext";
import type {
  Recipe,
  RecipeFullDetailedProps,
} from "../../../types/recipe.types";
import Title from "../../atoms/Title";
import { LOCALES_MODAL } from "../../../locales/en";

const RecipeFullDetailedModal: React.FC<RecipeFullDetailedProps> = ({
  recipe,
  onClose,
}) => {
  const { isFavorite, toggleFavorite } = useRecipeContext();
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);

    onClose();
  };

  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const value = (recipe as Recipe)[`strIngredient${i}`];
      if (value && value.trim() !== "") {
        ingredients.push(value);
      }
    }
    return ingredients;
  };

  return (
    <div data-testid="overlay" className={styles.overlay} onClick={handleClose}>
      <div
        data-testid="modal"
        className={`${styles.modal} ${
          closing ? styles.fadeOut : styles.fadeIn
        }`}
      >
        <button className={styles.closeButton} onClick={handleClose}>
          {LOCALES_MODAL.buttons.close}
        </button>
        <Title text={recipe.strMeal} variant="secondary" />
        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
        <p>
          <strong>{LOCALES_MODAL.labels.category}</strong> {recipe.strCategory}
        </p>
        <p>
          <strong>{LOCALES_MODAL.labels.country}</strong> {recipe.strArea}
        </p>

        {getIngredients().length > 0 && (
          <div className={styles.ingredients}>
            <h3>{LOCALES_MODAL.labels.ingredients}</h3>
            <ul>
              {getIngredients().map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <p>
          <strong>{LOCALES_MODAL.labels.instructions}</strong>{" "}
          {recipe.strInstructions}
        </p>

        <button
          className={`${styles.favoriteButton} ${
            isFavorite(recipe.idMeal) ? styles.active : ""
          }`}
          onClick={() => toggleFavorite(recipe.idMeal)}
        >
          {isFavorite(recipe.idMeal)
            ? LOCALES_MODAL.buttons.removeFavorite
            : LOCALES_MODAL.buttons.addFavorite}
        </button>
      </div>
    </div>
  );
};

export default RecipeFullDetailedModal;
