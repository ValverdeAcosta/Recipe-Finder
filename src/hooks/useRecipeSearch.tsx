import { useState } from "react";
import axios from "axios";
import type { Recipe } from "../types/recipe.types";

export const useRecipeSearch = () => {
  const [matchingRecipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const search = async (query: string) => {
    if (!query.trim()) {
      setRecipes([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const byTitle = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
          query
        )}`
      );
      const recipesByTitle = byTitle.data.meals || [];

      const byIngredient = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(
          query
        )}`
      );

      const ingredientResults = byIngredient.data.meals || [];

      const detailPromises = ingredientResults.map((meal: any) =>
        axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
        )
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
        setError("No recipes found.");
      }
    } catch (err) {
      setRecipes([]);
      setError("Error fetching recipes.");
    } finally {
      setLoading(false);
    }
  };

  return { matchingRecipes, loading, error, search };
};
