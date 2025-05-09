import React from "react";
import RecipeCard from "../../molecules/RecipeCard";
import styles from "./RecipeList.module.scss";

import type { RecipeListProps } from "../../../types/recipe.types";

const RecipeList: React.FC<RecipeListProps> = ({ recipes, onSelect }) => {
  return (
    <div className={styles.grid}>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.idMeal}
          title={recipe.strMeal}
          image={recipe.strMealThumb}
          description={
            recipe.strInstructions.length > 100
              ? recipe.strInstructions.slice(0, 100) + "..."
              : recipe.strInstructions
          }
          onClick={() => onSelect(recipe)}
        />
      ))}
    </div>
  );
};

export default RecipeList;
