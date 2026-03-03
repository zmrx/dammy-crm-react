import { type ReactNode } from "react";
import "./UIBadge.css";

interface BadgeProps {
  children: ReactNode;
  variant?: "outline";
}

export function UIBadge({ children, variant = "outline" }: BadgeProps) {
  return <span className={`ui-badge ui-badge--${variant}`}>{children}</span>;
}
