import { BookOpen, Heart, Search } from "lucide-react";
import { Link } from "react-router";
import { useState, useContext } from "react";
import SignUpPage from "./SignUpPage";
import LogInPage from "./LogInPage";
import { AuthContext } from "../context/AuthContext";
import { use } from "react";
import { useEffect } from "react";
import icon from "../assets/ML.png";
import { useLocation } from "react-router";

export default function Navbar() {
  const [currentPage, setCurrentPage] = useState(null);
  const { pathname } = useLocation();

  const [selectedDialog, setSelectedDialog] = useState(null);
  const { user } = use(AuthContext);

  //on mount, we set this as current page.
  useEffect(() => {
    setCurrentPage(pathname);
    console.log(pathname);
  }, [pathname]);

  //if user logs in/signs up, we turn the dialogs off
  useEffect(() => {
    setSelectedDialog(null);
  }, [user]);
  //tells us which form user has opened

  const openForm = (type) => {
    // if its the same type, toggle it off (null)
    if (type === selectedDialog) {
      setSelectedDialog(null);
    } else {
      setSelectedDialog(type);
    }
  };

  const iconsize = 13;
  return (
    <>
      {selectedDialog &&
        (selectedDialog === "sign-up" ? <SignUpPage /> : <LogInPage />)}
      {/* nav */}
      <div className="flex justify-between h-15 items-center p-5 border-b-1 border-gray-300">
        {/* //title & logo */}
        <Link to="">
          <div className="flex gap-2 hover:cursor-pointer items-center">
            <img width={70} src={icon} />

            <div className="titleFont text-2xl">MangaList</div>
          </div>
        </Link>
        <ul className="flex gap-3  [&_button]:hover:cursor-pointer [&_button]:rounded-md [&_button]:font-medium [&_button]:px-2 [&_button]:py-2  [&_button]:text-xs [&_button]:justify-center">
          {/* //navigation links */}

          <li>
            <Link to="lists">
              <button
                className={`${
                  currentPage === "/lists"
                    ? "main"
                    : "bg-white text-black border border-gray-300"
                } text-amber-50 flex items-center min-w-20 `}
              >
                <BookOpen size={iconsize} className="mr-2" />
                My List
              </button>
            </Link>
          </li>
          <li>
            <Link to="mangas">
              <button
                className={`${
                  currentPage === "/mangas"
                    ? "main"
                    : "bg-white text-black border border-gray-300"
                } text-amber-50 flex items-center min-w-20 `}
              >
                <Search size={iconsize} className="mr-2" />
                Browse
              </button>
            </Link>
          </li>
          <li>
            <Link to="recs">
              <button
                className={`${
                  currentPage === "/recs"
                    ? "main"
                    : "bg-white text-black border border-gray-300"
                } text-amber-50 flex items-center min-w-20 `}
              >
                <Heart size={iconsize} className="mr-2" />
                Reviews
              </button>
            </Link>
          </li>

          {/* sign in and sign up */}

          {user.username === "Guest" ? (
            <div className="border-l border-l-gray-400/50 pl-3 flex gap-3">
              <li>
                <button
                  onClick={() => openForm("sign-in")}
                  className="border border-gray-300 text-black flex items-center min-w-20 "
                >
                  Sign In
                </button>
              </li>
              <li>
                <button
                  onClick={() => openForm("sign-up")}
                  className="main text-amber-50 flex items-center min-w-20 "
                >
                  Create an Account
                </button>
              </li>
            </div>
          ) : (
            <div className="border-l border-l-gray-400/50 pl-3 flex gap-3 items-center ">
              <p> {user.username} </p>
            </div>
          )}
        </ul>
      </div>
    </>
  );
}
