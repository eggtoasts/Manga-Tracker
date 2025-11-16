import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import "./index.css";
import ListPage from "./pages/MangasPage";
import RecPage from "./pages/RecPage";
import { useState } from "react";
import { AuthProvider } from "./context/AuthProvider";

function App() {
  const [currentPage, setCurrentPage] = useState(null);
  const [user, setUser] = useState({ username: "Guest", color: "Gray" });

  return (
    <>
      <AuthProvider user={user} setUser={setUser}>
        <Navbar />
        <Outlet />
      </AuthProvider>
    </>
  );
}

export default App;
