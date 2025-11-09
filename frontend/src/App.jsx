import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import "./index.css";
import ListPage from "./pages/MangasPage";
import RecPage from "./pages/RecPage";
import { useState } from "react";

function App() {
  const [currentPage, setCurrentPage] = useState(null);
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
