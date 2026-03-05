import { Package, X } from "lucide-react";
import { Link } from "react-router";
import "./AppSidebar.css";
import { useEffect, useRef, type ReactNode } from "react";

export const AppSidebar = ({
  children,
  isOpen,
  onClose,
}: {
  children: ReactNode;
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
}) => {
  const AppSidebarLogoRef = useRef(null);

  useEffect(() => {
    if (isOpen && AppSidebarLogoRef.current) (AppSidebarLogoRef.current as HTMLElement).focus();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style = "overflow:hidden";
    } else {
      document.body.style = "overflow:auto";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);
  return (
    <>
      <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
        <div className="sidebar__header">
          <Link
            to="/"
            className="sidebar__logo"
            onClick={() => onClose(false)}
            ref={AppSidebarLogoRef}
          >
            <Package className="sidebar__logo-icon" />
            <span>CRM</span>
          </Link>
          <button
            className="sidebar__close"
            onClick={() => onClose(false)}
            aria-label="Закрыть меню"
          >
            <X
              width={20}
              height={20}
            />
          </button>
        </div>

        {children}

        {/* <div className="sidebar__footer">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Переключить тему"
          >
            {theme === "dark" ? (
              <Sun className="theme-toggle__icon" />
            ) : (
              <Moon className="theme-toggle__icon" />
            )}
          </button>
        </div> */}
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="sidebar__overlay"
          onClick={() => onClose(false)}
        />
      )}
    </>
  );
};
