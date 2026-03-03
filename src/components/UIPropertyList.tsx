import { type ReactNode } from "react";
import "./UIPropertyList.css";

interface Property {
  label: string;
  value: ReactNode;
}

interface PropertyListProps {
  items: Property[];
}

export function UIPropertyList({ items }: PropertyListProps) {
  return (
    <dl className="ui-property-list">
      {items.map((item, index) => (
        <div key={index} className="ui-property-list__item">
          <dt className="ui-property-list__label">{item.label}</dt>
          <dd className="ui-property-list__value">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
