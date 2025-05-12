import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { useRecipeSearch } from "./useRecipeSearch";
import { BASE_URL } from "../services/api";

vi.mock("axios");

describe("useRecipeSearch", () => {
  const mockRecipeByTitle = {
    idMeal: "1",
    strMeal: "Spaghetti",
    strInstructions: "Cook pasta",
  };

  const mockRecipeByIngredient = {
    idMeal: "2",
    strMeal: "Carbonara",
    strInstructions: "Mix eggs and cheese",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns empty array for empty query", async () => {
    const { result } = renderHook(() => useRecipeSearch());

    await act(async () => {
      await result.current.search("");
    });

    expect(result.current.matchingRecipes).toEqual([]);
    expect(axios.get).not.toHaveBeenCalled();
  });

  it("searches by title and ingredient", async () => {
    vi.mocked(axios.get).mockImplementation((url) => {
      if (url === `${BASE_URL}/search.php?s=pasta`) {
        return Promise.resolve({ data: { meals: [mockRecipeByTitle] } });
      }
      if (url === `${BASE_URL}/filter.php?i=pasta`) {
        return Promise.resolve({ data: { meals: [{ idMeal: "2" }] } });
      }
      if (url === `${BASE_URL}/lookup.php?i=2`) {
        return Promise.resolve({ data: { meals: [mockRecipeByIngredient] } });
      }
      return Promise.reject(new Error("Invalid URL"));
    });

    const { result } = renderHook(() => useRecipeSearch());

    await act(async () => {
      await result.current.search("pasta");
    });

    expect(result.current.matchingRecipes).toHaveLength(2);
    expect(result.current.matchingRecipes).toEqual(
      expect.arrayContaining([mockRecipeByTitle, mockRecipeByIngredient])
    );
  });

  it("removes duplicate recipes", async () => {
    vi.mocked(axios.get).mockImplementation((url) => {
      if (url === `${BASE_URL}/search.php?s=pasta`) {
        return Promise.resolve({ data: { meals: [mockRecipeByTitle] } });
      }
      if (url === `${BASE_URL}/filter.php?i=pasta`) {
        return Promise.resolve({ data: { meals: [{ idMeal: "1" }] } });
      }
      if (url === `${BASE_URL}/lookup.php?i=1`) {
        return Promise.resolve({ data: { meals: [mockRecipeByTitle] } });
      }
      return Promise.reject(new Error("Invalid URL"));
    });

    const { result } = renderHook(() => useRecipeSearch());

    await act(async () => {
      await result.current.search("pasta");
    });

    expect(result.current.matchingRecipes).toHaveLength(1);
    expect(result.current.matchingRecipes[0]).toEqual(mockRecipeByTitle);
  });

  it("handles API errors gracefully", async () => {
    vi.mocked(axios.get).mockRejectedValue(new Error("API Error"));

    const { result } = renderHook(() => useRecipeSearch());
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    await act(async () => {
      await result.current.search("pasta");
    });

    expect(result.current.matchingRecipes).toEqual([]);
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it("handles null API responses", async () => {
    vi.mocked(axios.get).mockImplementation((url: string) => {
      return Promise.resolve({ data: { meals: null } });
    });

    const { result } = renderHook(() => useRecipeSearch());

    await act(async () => {
      await result.current.search("nonexistent");
    });

    expect(result.current.matchingRecipes).toEqual([]);
  });

  it("properly encodes query parameters", async () => {
    const { result } = renderHook(() => useRecipeSearch());

    await act(async () => {
      await result.current.search("tom & jerry");
    });

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining("tom%20%26%20jerry")
    );
  });
});
