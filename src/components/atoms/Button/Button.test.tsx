import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("Button", () => {
  it("renders with default props", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button.className).toContain("primary");
  });

  it("renders with custom variant", () => {
    render(<Button variant="keycaps">Click me</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("keycaps");
  });

  it("applies custom className", () => {
    render(<Button className="search">Click me</Button>);
    const button = screen.getByRole("button");

    expect(button.className).toContain("search");
  });

  it("handles click events", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("can be disabled", () => {
    render(<Button disabled>Click me</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("renders children correctly", () => {
    render(<Button>Test Content</Button>);
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });
});
