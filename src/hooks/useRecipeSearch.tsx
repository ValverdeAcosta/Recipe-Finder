import { useState } from "react";
import axios from "axios";
import type { Recipe } from "../types/recipe.types";

export const useRecipeSearch = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const search = async (query: string) => {
    if (!query.trim()) {
      setRecipes([]);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
          query
        )}`
      );
      const data = response.data;
      if (data.meals) {
        const formatted = data.meals.map((meal: any) => ({
          id: meal.idMeal,
          name: meal.strMeal,
          thumbnail: meal.strMealThumb,
          description: meal.strInstructions.slice(0, 120) + "...",
          ingredients: [],
        }));
        setRecipes(formatted);
      } else {
        setRecipes([]);
        setError("No recipes found.");
      }
    } catch (err) {
      setError("Error fetching recipes");
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  return { recipes, loading, error, search };
};
