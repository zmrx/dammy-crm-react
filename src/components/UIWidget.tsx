import type { ReactNode } from "react";
import "./UIWidget.css";

export const UIWidgetList = ({ children }: { children: ReactNode }) => (
  <ul className="ui-widget__list">{children}</ul>
);

export const UIWidgetItem = ({ children }: { children: ReactNode }) => (
  <li className="ui-widget__item">{children}</li>
);
