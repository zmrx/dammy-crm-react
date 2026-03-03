import "./UISpinner.css";

interface SpinnerProps {
  size?: "sm" | "default" | "lg";
}

export function UISpinner({ size = "default" }: SpinnerProps) {
  return (
    <div
      className={`ui-spinner ${size !== "default" ? `ui-spinner--${size}` : ""}`}
    />
  );
}
