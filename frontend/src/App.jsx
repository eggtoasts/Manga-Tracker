import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import "./index.css";
import ListPage from "./pages/MangasPage";
import RecPage from "./pages/RecPage";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
