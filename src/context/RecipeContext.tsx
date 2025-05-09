import React, { createContext, useContext, useState } from "react";

import type { Recipe, RecipeContextProps } from "../types/recipe.types";
import { getRecipeDetailsById, getRecipesByName } from "../services/api";

const RecipeContext = createContext<RecipeContextProps | undefined>(undefined);

export const RecipeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const searchRecipes = async (query: string) => {
    const data = await getRecipesByName(query);
    setRecipes(data || []);
  };

  const getRecipeDetails = async (id: string) => {
    const data = await getRecipeDetailsById(id);
    setSelectedRecipe(data || null);
  };

  return (
    <RecipeContext.Provider
      value={{ recipes, selectedRecipe, searchRecipes, getRecipeDetails }}
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
