import { Search } from "lucide-react";
import { useEffect } from "react";
import { useState, use } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

async function getMangaList(user, setMangaList) {
  if (!user || !user.id) {
    console.log("Please login to add manga to your list");
    return;
  }

  const ENDPOINT = "http://localhost:3000/userlist";
  const token = localStorage.getItem("accessToken");

  if (!token) {
    console.log("JWT missing. log in again.");
    return;
  }

  try {
    const response = await axios.get(ENDPOINT, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const mangasFromUserList = response.data;
    setMangaList(mangasFromUserList);
  } catch (err) {
    console.log(err);
  }
}

export default function ListPage() {
  const [mangaList, setMangaList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = use(AuthContext);

  //on mount + if user is logged in, it should fetch user's mangaLists.
  useEffect(() => {
    if (user && user.id) {
      getMangaList(user, setMangaList);
    }
  }, [user]);

  //for debugging
  useEffect(() => {
    console.log("Manga List Updated:", mangaList);
  }, [mangaList]);

  return (
    <>
      <div className="mx-5 p-5 mt-4 h-35 flex content-center w-fill justify-between flex-col">
        {/* title & bio */}
        <div className="flex">
          <div className="">
            <h1 className="text-lg font-medium">My Manga List</h1>
            <h2 className="text-2xs text-gray-800">Tracking 0 manga</h2>
          </div>
        </div>
        <div className="w-fill flex items-center rounded-bl-sm bg-gray-100 ">
          <Search size={15} className="mx-2 mr-2" />
          <input type="text" className=" w-xl py-1" />
        </div>
      </div>

      {/*the bottom half (list)*/}
      <div>
        {/* filters + layout*/}
        <div>
          <div className="flex gap-3">
            <button>All</button>
            <button>Reading</button>
            <button>Plan To Read</button>
            <button>Completed</button>
            <button>On Hold</button>
            <button>Re-Reading</button>
            <button>Dropped</button>
          </div>

          <div className="flex">
            <p> 0 Titles</p>
            <div className="ml-auto">
              <button>(long)</button>
              <button>(squares)</button>
              <button>(grid)</button>
            </div>
          </div>
        </div>

        <div className="grid gap-3">
          {mangaList.map((manga) => {
            return (
              <div className="flex h-40 bg-gray-200">
                <img
                  src={manga.cover_image}
                  className="mx-3 rounded-xl object-cover"
                />
                <p className="font-semibold">{manga.name}</p>
                <p className="">{manga.authors}</p>

                <p> {manga.user_rating === null ? "-" : manga.rating} </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
