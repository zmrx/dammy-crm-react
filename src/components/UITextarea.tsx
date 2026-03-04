import type { TextareaHTMLAttributes } from "react";
import "./UITextarea.css";

export function UITextarea({ className = "", ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`ui-textarea ${className}`}
      {...props}
    />
  );
}
