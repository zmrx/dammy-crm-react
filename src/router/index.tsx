import { createBrowserRouter } from "react-router";
import { Dashboard } from "../layouts/Dashboard";
import { PageHome } from "../pages/PageHome";
import { PageError } from "../pages/PageError";
import { PageProduct } from "../pages/PageProduct";
import { PageProducts } from "../pages/PageProducts";
import { PageUser } from "../pages/PageUser";
import { PageUsers } from "../pages/PageUsers";
import { PageCart } from "../pages/PageCart";
import { PageCarts } from "../pages/PageCarts";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <PageError />,
  },
  {
    path: "/",
    Component: Dashboard,
    children: [
      {
        index: true,
        Component: PageHome,
      },
      {
        path: "/products",
        children: [
          { index: true, Component: PageProducts },
          {
            path: ":id",
            Component: PageProduct,
          },
        ],
      },
      {
        path: "/users",
        children: [
          { index: true, Component: PageUsers },
          {
            path: ":id",
            Component: PageUser,
          },
        ],
      },
      {
        path: "/carts",
        children: [
          { index: true, Component: PageCarts },
          {
            path: ":id",
            Component: PageCart,
          },
        ],
      },
    ],
  },
]);
