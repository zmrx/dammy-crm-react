import { NavLink } from "react-router";
import './AppHeader.css'

export const AppHeader = () => (
  <header className="AppHeader">
    <nav>
      <ul className="AppHeader__list">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/products">Products</NavLink></li>
        <li><NavLink to="/users">users</NavLink></li>
      </ul>
    </nav>
  </header>
);
