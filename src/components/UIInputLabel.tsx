import type { ReactNode } from "react";
import "./UIInputLabel.css";

export const UIInputLabel = ({ children, label }: { children: ReactNode; label: string }) => {
  return (
    <label className="ui-label">
      <span>{label}</span>

      {children}
    </label>
  );
};
