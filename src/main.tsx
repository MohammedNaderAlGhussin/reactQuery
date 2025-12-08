import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Main from "./layouts/Main";
import Home from "./pages/Home";
import Info from "./pages/Info";
// import Create from "./pages/Create";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      // {
      //   path: "/create",
      //   element: <Create />,
      // },
      {
        path: "/info",
        element: <Info />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
