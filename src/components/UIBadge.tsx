import { type ReactNode } from "react";
import "./UIBadge.css";

interface BadgeProps {
  children: ReactNode;
  variant?: "outline";
}

export const UIBadge = ({ children, variant = "outline" }: BadgeProps) => {
  return <span className={`ui-badge ui-badge--${variant}`}>{children}</span>;
}
