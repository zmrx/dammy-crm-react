import { createBrowserRouter } from "react-router";
import { Dashboard } from "../layouts/Dashboard";
import { PageHome } from "../pages/Home";
import { ProductsList, ProductsDetail } from "../pages/products";
import { UsersList, UsersDetail } from "../pages/users";

export const router = createBrowserRouter([
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
        Component: ProductsList,
        children: [{ index: true, Component: ProductsDetail }],
      },
      {
        path: "/users",
        Component: UsersList,
        children: [{ index: true, Component: UsersDetail }],
      },
    ],
  },
]);
