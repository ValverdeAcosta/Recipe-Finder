import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import {
  getRecipeDetailsById,
  fetchAllRecipes,
  fetchRecipesByPage,
  BASE_URL,
} from "./api";

vi.mock("axios");
global.fetch = vi.fn();

describe("API Service", () => {
  const mockRecipe = {
    idMeal: "1",
    strMeal: "Test Recipe",
    strInstructions: "Test Instructions",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getRecipeDetailsById", () => {
    it("returns recipe details when found", async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        json: () => Promise.resolve({ meals: [mockRecipe] }),
      });

      const result = await getRecipeDetailsById("1");
      expect(result).toEqual(mockRecipe);
      expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/lookup.php?i=1`);
    });

    it("returns null when recipe not found", async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        json: () => Promise.resolve({ meals: null }),
      });

      const result = await getRecipeDetailsById("999");
      expect(result).toBeUndefined();
    });

    it("handles fetch errors", async () => {
      global.fetch = vi.fn().mockRejectedValueOnce(new Error("Network error"));

      await expect(getRecipeDetailsById("1")).rejects.toThrow("Network error");
    });
  });

  describe("fetchAllRecipes", () => {
    it("fetches recipes for all alphabet letters", async () => {
      vi.mocked(axios.get).mockResolvedValue({
        data: { meals: [mockRecipe] },
      });

      const result = await fetchAllRecipes();

      expect(result).toHaveLength(26);
      expect(axios.get).toHaveBeenCalledTimes(26);
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringMatching(`${BASE_URL}/search.php\\?f=[a-z]`)
      );
    });

    it("handles empty responses", async () => {
      vi.mocked(axios.get).mockResolvedValue({
        data: { meals: null },
      });

      const result = await fetchAllRecipes();
      expect(result).toEqual([]);
    });

    it("handles API errors", async () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      vi.mocked(axios.get).mockRejectedValueOnce(new Error("API Error"));

      const result = await fetchAllRecipes();

      expect(result).toEqual([]);

      consoleSpy.mockRestore();
    });
  });

  describe("fetchRecipesByPage", () => {
    it("fetches recipes for a specific letter", async () => {
      vi.mocked(axios.get).mockResolvedValueOnce({
        data: { meals: [mockRecipe] },
      });

      const result = await fetchRecipesByPage("a");

      expect(result).toEqual([mockRecipe]);
      expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/search.php?f=a`);
    });

    it("returns empty array when no recipes found", async () => {
      vi.mocked(axios.get).mockResolvedValueOnce({
        data: { meals: null },
      });

      const result = await fetchRecipesByPage("x");
      expect(result).toEqual([]);
    });

    it("handles API errors", async () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      vi.mocked(axios.get).mockRejectedValueOnce(new Error("API Error"));

      const result = await fetchRecipesByPage("z");

      expect(result).toEqual([]);

      consoleSpy.mockRestore();
    });
  });
});
