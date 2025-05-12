import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Title from "./Title";
import styles from "./Title.module.scss";

describe("Title", () => {
  it("renders with text content", () => {
    render(<Title text="Hello World" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Hello World"
    );
  });

  it("applies default variant class", () => {
    render(<Title text="Hello" />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveClass(styles.title, styles.primary);
  });

  it("applies custom variant class", () => {
    render(<Title text="Hello" variant="secondary" />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveClass(styles.title, styles.secondary);
  });

  it("renders with correct semantic heading", () => {
    render(<Title text="Test Heading" />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });
});
