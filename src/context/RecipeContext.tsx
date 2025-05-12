import React, { createContext, useCallback, useContext, useState } from "react";
import type { Recipe, RecipeContextProps } from "../types/recipe.types";
import {
  getRecipeDetailsById,
  fetchAllRecipes,
  fetchRecipesByPage,
} from "../services/api";
import { useRecipeSearch } from "../hooks/useRecipeSearch";

const RecipeContext = createContext<RecipeContextProps | undefined>(undefined);

export const RecipeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem("favorites");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const { search } = useRecipeSearch();

  const searchRecipes = async (query: string) => {
    const data = await search(query);
    setRecipes(data || []);
  };

  const getRecipeDetails = async (id: string) => {
    const data = await getRecipeDetailsById(id);
    setSelectedRecipe(data || null);
  };

  const getAllRecipes = async () => {
    const data = await fetchAllRecipes();
    setRecipes(data || []);
  };

  const loadRecipesByPage = async (page: string) => {
    const data = await fetchRecipesByPage(page);
    setRecipes(data || []);
  };

  const isFavorite = useCallback(
    (recipeId: string): boolean => {
      return favorites.includes(recipeId);
    },
    [favorites]
  );

  const toggleFavorite = useCallback((recipeId: string) => {
    setFavorites((current) => {
      const updated = current.includes(recipeId)
        ? current.filter((id) => id !== recipeId)
        : [...current, recipeId];

      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        selectedRecipe,
        favorites,
        isFavorite,
        toggleFavorite,
        setSelectedRecipe,
        searchRecipes,
        getRecipeDetails,
        getAllRecipes,
        loadRecipesByPage,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipeContext = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipeContext must be used within a RecipeProvider");
  }
  return context;
};
