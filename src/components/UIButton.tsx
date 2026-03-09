import { type ReactNode, type ButtonHTMLAttributes } from "react";
import "./UIButton.css";
import { clsx } from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "default" | "sm" | "icon";
  children: ReactNode;
}

export const UIButton = ({
  variant = "primary",
  size = "default",
  className = "",
  children,
  ...props
}: ButtonProps) => (
  <button
    className={clsx([
      "ui-button",
      variant !== "primary" && `ui-button--${variant}`,
      size !== "default" && `ui-button--${size}`,
      className,
    ])}
    {...props}
  >
    {children}
  </button>
);
