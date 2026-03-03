import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { Package, Users, Home, Menu, X, Sun, Moon } from "lucide-react";
import "./Dashboard.css";
import { useTheme } from "../providers/theme";

const navigation = [
  { name: "Главная", href: "/", icon: Home },
  { name: "Продукты", href: "/products", icon: Package },
  { name: "Пользователи", href: "/users", icon: Users },
];

export const Dashboard = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <div className="layout">
      {/* Mobile Header */}
      <header className="header">
        <button
          className="header__menu-btn"
          onClick={() => setSidebarOpen(true)}
          aria-label="Открыть меню"
        >
          <Menu
            width={20}
            height={20}
          />
        </button>
        <span className="header__title">CRM</span>
        <div className="header__actions">
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
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "sidebar--open" : ""}`}>
        <div className="sidebar__header">
          <Link
            to="/"
            className="sidebar__logo"
            onClick={() => setSidebarOpen(false)}
          >
            <Package className="sidebar__logo-icon" />
            <span>CRM</span>
          </Link>
          <button
            className="sidebar__close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Закрыть меню"
          >
            <X
              width={20}
              height={20}
            />
          </button>
        </div>

        <nav className="sidebar__nav">
          <ul className="sidebar__nav-list">
            {navigation.map((item) => (
              <li
                key={item.name}
                className="sidebar__nav-item"
              >
                <Link
                  to={item.href}
                  className={`sidebar__nav-link ${isActive(item.href) ? "sidebar__nav-link--active" : ""}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="sidebar__nav-icon" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar__footer">
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
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};
