import { Outlet } from "react-router";
import { AppHeader } from "../components/AppHeader";
import "./Dashboard.css";
// interface DashboardProps {}

export const Dashboard = () => (
  <div className="dashboard-layout">
    <AppHeader />

    <main>
      <Outlet />
    </main>
  </div>
);
