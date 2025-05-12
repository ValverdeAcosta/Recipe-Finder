import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import type { ReactNode } from "react";
import { RecipeProvider, useRecipeContext } from "./RecipeContext";
import * as api from "../services/api";
import { useRecipeSearch } from "../hooks/useRecipeSearch";
import { mockRecipe } from "../mocks/recipes.mock";

// Mock the API and useRecipeSearch hook
vi.mock("../services/api");
vi.mock("../hooks/useRecipeSearch");

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

// Wrapper component for testing hooks
const wrapper = ({ children }: { children: ReactNode }) => (
  <RecipeProvider>{children}</RecipeProvider>
);

describe("RecipeContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
    vi.mocked(useRecipeSearch).mockReturnValue({
      search: vi.fn().mockResolvedValue([mockRecipe]),
      matchingRecipes: [],
    });
  });

  describe("Provider initialization", () => {
    it("loads favorites from localStorage on mount", () => {
      mockLocalStorage.getItem.mockReturnValue('["1", "2"]');

      const { result } = renderHook(() => useRecipeContext(), { wrapper });

      expect(result.current.favorites).toEqual(["1", "2"]);
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith("favorites");
    });

    it("handles localStorage errors gracefully", () => {
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error("Storage error");
      });

      const { result } = renderHook(() => useRecipeContext(), { wrapper });

      expect(result.current.favorites).toEqual([]);
    });
  });

  describe("Recipe operations", () => {
    it("searches recipes", async () => {
      const { result } = renderHook(() => useRecipeContext(), { wrapper });

      await act(async () => {
        await result.current.searchRecipes("test");
      });

      expect(result.current.recipes).toEqual([mockRecipe]);
    });

    it("gets recipe details", async () => {
      vi.mocked(api.getRecipeDetailsById).mockResolvedValue(mockRecipe);
      const { result } = renderHook(() => useRecipeContext(), { wrapper });

      await act(async () => {
        await result.current.getRecipeDetails("1");
      });

      expect(result.current.selectedRecipe).toEqual(mockRecipe);
    });

    it("loads all recipes", async () => {
      vi.mocked(api.fetchAllRecipes).mockResolvedValue([mockRecipe]);
      const { result } = renderHook(() => useRecipeContext(), { wrapper });

      await act(async () => {
        await result.current.getAllRecipes();
      });

      expect(result.current.recipes).toEqual([mockRecipe]);
    });

    it("loads recipes by page", async () => {
      vi.mocked(api.fetchRecipesByPage).mockResolvedValue([mockRecipe]);
      const { result } = renderHook(() => useRecipeContext(), { wrapper });

      await act(async () => {
        await result.current.loadRecipesByPage("a");
      });

      expect(result.current.recipes).toEqual([mockRecipe]);
    });
  });

  describe("Favorite operations", () => {
    it("toggles favorites", () => {
      const { result } = renderHook(() => useRecipeContext(), { wrapper });

      act(() => {
        result.current.toggleFavorite("1");
      });

      expect(result.current.favorites).toContain("1");
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "favorites",
        JSON.stringify(["1"])
      );

      act(() => {
        result.current.toggleFavorite("1");
      });

      expect(result.current.favorites).not.toContain("1");
    });

    it("checks if recipe is favorite", () => {
      const { result } = renderHook(() => useRecipeContext(), { wrapper });

      act(() => {
        result.current.toggleFavorite("1");
      });

      expect(result.current.isFavorite("1")).toBe(true);
      expect(result.current.isFavorite("2")).toBe(false);
    });
  });

  it("handles API errors gracefully", async () => {
    vi.mocked(api.getRecipeDetailsById).mockRejectedValue(
      new Error("API Error")
    );
    const { result } = renderHook(() => useRecipeContext(), { wrapper });

    await act(async () => {
      await result.current.getRecipeDetails("1");
    });

    expect(result.current.selectedRecipe).toBeNull();
  });
});
