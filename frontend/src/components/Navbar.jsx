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
        (selectedDialog === "sign-up" ? (
          <SignUpPage />
        ) : (
          <LogInPage setSelectedDialog={setSelectedDialog} />
        ))}
      {/* nav */}
      <div className="bg-white flex justify-between h-20 items-center p-5 border-b-1 border-gray-300">
        {/* //title & logo */}
        <Link to="">
          <div className="w-14 flex gap-2 hover:cursor-pointer items-center">
            <img src={icon} />

            <div className="titleFont text-2xl">MangaList</div>
          </div>
        </Link>
        <ul className="flex gap-3  [&_button]:hover:cursor-pointer  [&_button]:font-medium [&_button]:px-2 [&_button]:py-2  [&_button]:text-xs [&_button]:justify-center">
          {/* //navigation links */}

          <li>
            <Link to="lists">
              <button
                className={`${
                  currentPage === "/lists"
                    ? " main "
                    : " bg-white text-black border border-gray-300"
                } text-amber-50 flex items-center min-w-20 `}
              >
                <BookOpen size={iconsize} className="mr-2" />
                <p className="navFont text-sm">My List</p>
              </button>
            </Link>
          </li>
          <li>
            <Link to="mangas">
              <button
                className={`${
                  currentPage === "/mangas"
                    ? " main"
                    : " bg-white text-black border border-gray-300"
                } text-amber-50 flex items-center min-w-20 `}
              >
                <Search size={iconsize} className="mr-2" />
                <p className="navFont text-sm">Browse</p>
              </button>
            </Link>
          </li>
          <li>
            {/* Future feature (reviews) */}
            {/* <Link to="recs">
              <button
                className={`${
                  currentPage === "/recs"
                    ? " main"
                    : " bg-white text-black border border-gray-300"
                } text-amber-50 flex items-center min-w-20 `}
              >
                <Heart size={iconsize} className="mr-2" />
                <p className="navFont text-sm">Reviews</p>
              </button>
            </Link> */}
          </li>

          {/* sign in and sign up */}

          {user.username === "Guest" ? (
            <div className="border-l border-l-gray-400/50 pl-3 flex gap-3 items-center justify-center">
              <li>
                <button
                  onClick={() => openForm("sign-in")}
                  className="navFont border border-gray-300 text-black flex items-center min-w-20 "
                >
                  <p className="text-sm">Sign In</p>
                </button>
              </li>
              <li>
                <button
                  onClick={() => openForm("sign-up")}
                  className="navFont main text-amber-50 flex items-center min-w-20 "
                >
                  <p className="text-sm">Create an Account</p>
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
