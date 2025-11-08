import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ListPage from "./pages/ListPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import RecPage from "./pages/RecPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/mangas",
        element: <ListPage />,
      },
      {
        path: "/recs",
        element: <RecPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
