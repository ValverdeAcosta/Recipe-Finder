import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Input from "./Input";
import styles from "./Input.module.scss";

describe("Input", () => {
  it("renders input element", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("applies default className", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass(styles.input);
  });

  it("passes through placeholder text", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("handles onChange events", async () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    const input = screen.getByRole("textbox");

    await userEvent.type(input, "test");
    expect(handleChange).toHaveBeenCalled();
  });

  it("can be disabled", () => {
    render(<Input disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("accepts different input types", () => {
    render(<Input type="password" />);
    const input = screen.getByDisplayValue("");
    expect(input).toHaveAttribute("type", "password");
  });

  it("updates value when typed", async () => {
    render(<Input />);
    const input = screen.getByRole("textbox");

    await userEvent.type(input, "hello");
    expect(input).toHaveValue("hello");
  });
});
