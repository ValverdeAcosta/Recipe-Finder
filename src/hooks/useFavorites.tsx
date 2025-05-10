import { useCallback, useEffect } from "react";

export const useFavorites = () => {
  let stored = localStorage.getItem("favorites");

  useEffect(() => {
    stored = localStorage.getItem("favorites");
  }, []);

  const getFavorites = (): string[] => {
    try {
      const stored = localStorage.getItem("favorites");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error getting favorites:", error);
      return [];
    }
  };

  const saveFavorites = (favorites: string[]) => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  };

  const toggleFavorite = useCallback((recipeId: string) => {
    const currentFavorites = getFavorites();
    const isAlreadyFavorite = currentFavorites.includes(recipeId);
    const updatedFavorites = isAlreadyFavorite
      ? currentFavorites.filter((id) => id !== recipeId)
      : [...currentFavorites, recipeId];

    saveFavorites(updatedFavorites);
  }, []);

  const isFavorite = useCallback((recipeId: string): boolean => {
    return getFavorites().includes(recipeId);
  }, []);

  return { toggleFavorite, stored, isFavorite };
};
