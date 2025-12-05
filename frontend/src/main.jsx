import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import MangasPage from "./pages/MangasPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import RecPage from "./pages/RecPage.jsx";
import ListPage from "./pages/ListPage.jsx";
import Manga from "./pages/Manga.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/mangas",
        element: <MangasPage />,
      },
      {
        path: "/mangas/:mangaId",
        element: <Manga />,
      },
      {
        path: "/recs",
        element: <RecPage />,
      },
      {
        path: "/lists",
        element: <ListPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
