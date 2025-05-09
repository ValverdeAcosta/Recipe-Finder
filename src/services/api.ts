import type { Recipe } from "../types/recipe.types";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const getRecipesByName = async (query: string): Promise<Recipe[]> => {
  const res = await fetch(`${BASE_URL}/search.php?s=${query}`);
  const json = await res.json();
  return json.meals || [];
};

export const getRecipeDetailsById = async (
  id: string
): Promise<Recipe | null> => {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  const json = await res.json();
  return json.meals ? json.meals[0] : null;
};
