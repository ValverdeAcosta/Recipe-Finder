import axios from "axios";
import type { Recipe } from "../types/recipe.types";

export const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const getRecipeDetailsById = async (
  id: string
): Promise<Recipe | null> => {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  const json = await res.json();
  return json.meals ? json.meals[0] : null;
};

export const fetchAllRecipes = async (): Promise<Recipe[]> => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  const requests = alphabet.map((letter) =>
    axios
      .get(`${BASE_URL}/search.php?f=${letter}`)
      .then((res) => res.data.meals || [])
      .catch(() => [])
  );

  try {
    const results = await Promise.all(requests);
    return results.flat();
  } catch (error) {
    console.error("Error fetching all recipes by alphabet:", error);
    return [];
  }
};

export const fetchRecipesByPage = async (query: string): Promise<Recipe[]> => {
  const request = axios
    .get(`${BASE_URL}/search.php?f=${query}`)
    .then((res) => res.data.meals || [])
    .catch(() => []);

  try {
    const meals = await request;
    return meals;
  } catch (error) {
    console.error("Error fetching all recipes by page:", error);
    return [];
  }
};
