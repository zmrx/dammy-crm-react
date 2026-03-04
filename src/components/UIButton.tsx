import { type ReactNode, type ButtonHTMLAttributes } from "react";
import "./UIButton.css";

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
}: ButtonProps) => {
  const classes = [
    "ui-button",
    variant !== "primary" && `ui-button--${variant}`,
    size !== "default" && `ui-button--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
};
