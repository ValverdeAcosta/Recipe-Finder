import React, { createContext, useContext, useState } from "react";

import type { Recipe, RecipeContextProps } from "../types/recipe.types";
import {
  getRecipeDetailsById,
  getRecipesByName,
  fetchAllRecipes,
  fetchRecipesByPage,
} from "../services/api";

const RecipeContext = createContext<RecipeContextProps | undefined>(undefined);

export const RecipeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [favoriteStatus, setFavoritesChanged] = useState(false);

  const searchRecipes = async (query: string) => {
    const data = await getRecipesByName(query);
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

  const setFavoriteStatus = (isFav: boolean) => {
    setFavoritesChanged(isFav);
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        selectedRecipe,
        favoriteStatus,
        setSelectedRecipe,
        searchRecipes,
        getRecipeDetails,
        getAllRecipes,
        setFavoriteStatus,
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
