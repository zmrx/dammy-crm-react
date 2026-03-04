import { type InputHTMLAttributes } from "react";
import "./UIInput.css";

export const UIInput = ({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  const propClass = `ui-input ${className ? className : ""}`.trim();

  return (
    <input
      className={propClass}
      {...props}
    />
  );
};
