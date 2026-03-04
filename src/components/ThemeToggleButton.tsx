import { Sun, Moon } from "lucide-react";
import { useTheme } from "../providers/theme";
import "./ThemeToggleButton.css";

export const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <button
      className="theme-toggle-button"
      onClick={toggleTheme}
      aria-label="Переключить тему"
    >
      {theme === "dark" ? (
        <Sun className="theme-toggle-button__icon" />
      ) : (
        <Moon className="theme-toggle-button__icon" />
      )}
    </button>
  );
};
