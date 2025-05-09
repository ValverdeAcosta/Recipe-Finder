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
        setRecipes(data.meals);
      } else {
        setRecipes([]);
        setError("No recipes found.");
      }
    } catch (err) {
      setError("Error fetching recipes");
      setRecipes([]);
    } finally {
      setLoading(false);
      console.log("Recipes fetched:", recipes);
    }
  };

  return { recipes, loading, error, search };
};
