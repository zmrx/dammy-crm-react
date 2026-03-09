import type { TextareaHTMLAttributes } from "react";
import "./UITextarea.css";
import clsx from "clsx";

export const UITextarea = ({
  className = "",
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    className={clsx("ui-textarea", className)}
    {...props}
  />
);
