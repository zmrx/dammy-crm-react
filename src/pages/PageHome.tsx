import { type FC } from "react";
import { WidgetProductLowStock } from "../components/WidgetProductLowStock";
import { WidgetCartRecent } from "../components/WidgetCartRecent";
import { WidgetUserNew } from "../components/WidgetUserNew";
import { WidgetProductLowRated } from "../components/WidgetProductLowRated";
import "./PageHome.css";

export const PageHome: FC = () => {
  return (
    <div className="page-home">
      <div className="page-home__header">
        <h1 className="page-home__title">Дашборд</h1>
      </div>

      <div className="widgets-grid">
        <WidgetCartRecent />
        <WidgetUserNew />
        <WidgetProductLowStock />
        <WidgetProductLowRated />
      </div>
    </div>
  );
};
