import { useState } from "react";
import axios from "axios";
import type { Recipe } from "../types/recipe.types";
import { BASE_URL } from "../services/api";

export const useRecipeSearch = () => {
  const [matchingRecipes, setRecipes] = useState<Recipe[]>([]);

  const search = async (query: string) => {
    if (!query.trim()) {
      setRecipes([]);
      return;
    }

    try {
      const byTitle = await axios.get(
        `${BASE_URL}/search.php?s=${encodeURIComponent(query)}`
      );
      const recipesByTitle = byTitle.data.meals || [];

      const byIngredient = await axios.get(
        `${BASE_URL}/filter.php?i=${encodeURIComponent(query)}`
      );

      const ingredientResults = byIngredient.data.meals || [];

      const detailPromises = ingredientResults.map((meal: any) =>
        axios.get(`${BASE_URL}/lookup.php?i=${meal.idMeal}`)
      );

      const detailResponses = await Promise.all(detailPromises);
      const fullRecipesByIngredient = detailResponses
        .map((res) => res.data.meals?.[0])
        .filter(Boolean);

      const all = [...recipesByTitle, ...fullRecipesByIngredient];
      const uniqueRecipes = Array.from(
        new Map(all.map((r: Recipe) => [r.idMeal, r])).values()
      );

      if (uniqueRecipes.length > 0) {
        setRecipes(uniqueRecipes);
        return uniqueRecipes;
      } else {
        setRecipes([]);
      }
    } catch (err) {
      setRecipes([]);
      console.error("Error fetching recipes.");
    }
  };

  return { matchingRecipes, search };
};
