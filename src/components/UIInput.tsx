import { type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import "./UIInput.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hasIcon?: boolean;
}

export function UIInput({
  label,
  hasIcon,
  className = "",
  ...props
}: InputProps) {
  const inputClasses =
    `ui-input ${hasIcon ? "ui-input--with-icon" : ""} ${className}`.trim();

  if (label) {
    return (
      <div className="ui-form-group">
        <label className="ui-label" htmlFor={props.id}>
          {label}
        </label>
        <input className={inputClasses} {...props} />
      </div>
    );
  }

  return <input className={inputClasses} {...props} />;
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function UITextarea({ label, className = "", ...props }: TextareaProps) {
  if (label) {
    return (
      <div className="ui-form-group">
        <label className="ui-label" htmlFor={props.id}>
          {label}
        </label>
        <textarea className={`ui-textarea ${className}`} {...props} />
      </div>
    );
  }

  return <textarea className={`ui-textarea ${className}`} {...props} />;
}

interface FormGridProps {
  children: React.ReactNode;
  columns?: 2 | 3;
}

export function UIFormGrid({ children, columns = 2 }: FormGridProps) {
  return <div className={`ui-form-grid ui-form-grid--${columns}`}>{children}</div>;
}
