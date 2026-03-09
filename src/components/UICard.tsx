import { type ReactNode } from "react";
import "./UICard.css";
import clsx from "clsx";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function UICard({ children, className = "" }: CardProps) {
  return <div className={clsx("ui-card", className)}>{children}</div>;
}

interface CardHeaderProps {
  children: ReactNode;
}

export function UICardHeader({ children }: CardHeaderProps) {
  return <div className="ui-card__header">{children}</div>;
}

interface CardTitleProps {
  children: ReactNode;
}

export function UICardTitle({ children }: CardTitleProps) {
  return <h3 className="ui-card__title">{children}</h3>;
}

interface CardContentProps {
  children: ReactNode;
}

export function UICardContent({ children }: CardContentProps) {
  return <div className="ui-card__content">{children}</div>;
}

interface CardsGridProps {
  children: ReactNode;
  columns?: 2;
}

export function UICardsGrid({ children, columns = 2 }: CardsGridProps) {
  return <div className={`ui-cards-grid ui-cards-grid--${columns}`}>{children}</div>;
}
