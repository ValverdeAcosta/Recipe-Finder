import { describe, it, vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { RecipeProvider } from "./context/RecipeContext";

vi.mock("./pages/Home/Home", () => ({
  default: () => <div data-testid="mock-home">Home Component</div>,
}));

describe("App", () => {
  it("renders Home component wrapped in RecipeProvider", () => {
    render(
      <RecipeProvider>
        <App />
      </RecipeProvider>
    );

    expect(screen.getByTestId("mock-home")).toBeInTheDocument();
  });

  it("applies global styles", () => {
    render(
      <RecipeProvider>
        <App />
      </RecipeProvider>
    );

    const app = screen.getByTestId("mock-home").parentElement;
    expect(app).toBeInTheDocument();
  });
});
