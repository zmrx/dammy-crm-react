import { Link, type LinkProps } from "react-router";
import clsx from "clsx";
import "./UILink.css";

export const UILink = ({ className, children, ...props }: LinkProps) => (
  <Link
    {...props}
    className={clsx("UILink", className)}
  >
    {children}
  </Link>
);
