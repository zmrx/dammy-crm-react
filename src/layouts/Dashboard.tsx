import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { Package, Users, Home, Menu, ShoppingCart } from "lucide-react";
import "./Dashboard.css";
import { AppSidebar } from "../components/AppSidebar";
import { ThemeToggleButton } from "../components/ThemeToggleButton";

const navigation = [
  { name: "Главная", href: "/", icon: Home },
  { name: "Продукты", href: "/products", icon: Package },
  { name: "Пользователи", href: "/users", icon: Users },
  { name: "Корзины", href: "/carts", icon: ShoppingCart },
];

export const Dashboard = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <div className="layout-dashboard">
      <header className="layout-dashboard__header">
        <button
          className="layout-dashboard__menu-btn"
          onClick={() => setSidebarOpen(true)}
          aria-label="Открыть меню"
        >
          <Menu
            width={20}
            height={20}
          />
        </button>

        <div className="layout-dashboard__logo">
          <Link
            to="/"
            className="sidebar__logo"
            onClick={() => setSidebarOpen(false)}
          >
            <Package className="sidebar__logo-icon" />
            <span>CRM</span>
          </Link>
        </div>

        <div className="layout-dashboard__header-actions">
          <ThemeToggleButton />
        </div>
      </header>

      <AppSidebar
        isOpen={sidebarOpen}
        onClose={setSidebarOpen}
      >
        <nav className="layout-dashboard__nav">
          <ul className="layout-dashboard__nav-list">
            {navigation.map((item) => (
              <li
                key={item.name}
                className="layout-dashboard__nav-item"
              >
                <Link
                  to={item.href}
                  className={`layout-dashboard__nav-link ${isActive(item.href) ? "layout-dashboard__nav-link--active" : ""}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="layout-dashboard__nav-icon" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </AppSidebar>

      <main className="layout-dashboard__main">
        <Outlet />
      </main>
    </div>
  );
};
