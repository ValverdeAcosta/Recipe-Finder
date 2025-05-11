import React from "react";
import RecipeCard from "../../molecules/RecipeCard";
import styles from "./RecipeList.module.scss";
import type { Recipe, RecipeListProps } from "../../../types/recipe.types";

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  const getDescription = (recipe: Recipe) => {
    if (recipe.strInstructions) {
      return recipe.strInstructions.length > 100
        ? `${recipe.strInstructions.slice(0, 100)}...`
        : recipe.strInstructions;
    }

    return `${recipe.strCategory || ""} dish${
      recipe.strArea ? ` from ${recipe.strArea}` : ""
    }`;
  };

  return (
    <div className={styles.grid}>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.idMeal}
          id={recipe.idMeal}
          title={recipe.strMeal}
          image={recipe.strMealThumb}
          description={getDescription(recipe)}
        />
      ))}
    </div>
  );
};

export default RecipeList;
