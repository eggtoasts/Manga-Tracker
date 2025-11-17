import { Pencil, Search, TextAlignStart } from "lucide-react";
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
            <p> {mangaList.length} Titles</p>
            <div className="ml-auto">
              <button>(long)</button>
              <button>(squares)</button>
              <button>(grid)</button>
            </div>
          </div>
        </div>

        <div className="table w-full">
          <tr>
            <th> # </th>
            <th className="w-6.5/10"> Manga </th>
            <th> Rating </th>
            <th> Review </th>
            <th> Edit </th>
          </tr>

          {mangaList.map((manga, index) => {
            return (
              <tr className="[&_th]:align-middle">
                <th className="">
                  <div className="text-center">{index + 1}</div>
                </th>
                <th>
                  <div className="flex  bg-gray-200">
                    <img
                      src={manga.cover_image}
                      className=" h-20 mx-3 rounded-xl object-cover"
                    />
                    <div className="text-start flex flex-col ">
                      <div className="flex gap-2">
                        <p className="font-semibold">{manga.name}</p>
                        <p className="font-normal">{manga.reading_status}</p>
                      </div>
                      <p className="font-light">{manga.authors}</p>
                      <p className="font-light text-sm">Add a note</p>
                    </div>
                  </div>
                </th>
                <th>
                  <span>
                    {manga.user_rating === null ? "-" : manga.rating}{" "}
                  </span>
                  /10
                </th>
                <th>
                  <div className="h-full flex justify-center items-center">
                    <TextAlignStart className="h-5" />
                  </div>
                </th>
                <th className="">
                  <div className="h-full flex justify-center items-center">
                    <Pencil className="h-5" />
                  </div>
                </th>
              </tr>
            );
          })}
        </div>
      </div>
    </>
  );
}
