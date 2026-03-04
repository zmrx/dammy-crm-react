import "./UIFormGrid.css";

interface FormGridProps {
  children: React.ReactNode;
  columns?: 2 | 3;
}

export function UIFormGrid({ children, columns = 2 }: FormGridProps) {
  return <div className={`ui-form-grid ui-form-grid--${columns}`}>{children}</div>;
}
