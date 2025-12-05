import { MoveLeft, Pencil, Search, TextAlignStart, X } from "lucide-react";
import { useEffect } from "react";
import { useState, use } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import EditMangaListDialog from "../components/EditMangaListDialog";

//for editing manga
async function editManga(user, mangaId, updatedFields) {
  const ENDPOINT = `http://localhost:3000/userlist/${mangaId}`;
  const token = localStorage.getItem("accessToken");

  if (!token) {
    console.log("JWT missing. log in again.");
    return;
  }

  try {
    const response = await axios.put(ENDPOINT, updatedFields, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
}

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
  const [currentMangaBeingEdited, setCurrentMangaBeingEdited] = useState(null);
  const { user } = use(AuthContext);
  const [filterType, setFilterType] = useState("all");

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

  //for edit form
  async function saveEdit(mangaId, formData) {
    console.log(formData);
    const reqBody = {
      reading_status: formData.readingStatus,
      chapters_read: formData.chaptersRead,
      user_rating: formData.userRating,
      notes: formData.notes,
    };

    try {
      await editManga(user, mangaId, reqBody);
      await getMangaList(user, setMangaList);
    } catch (err) {
      console.error("Failed to save list.", err);
    }
  }

  return (
    <>
      {currentMangaBeingEdited && (
        <EditMangaListDialog
          manga={currentMangaBeingEdited}
          setCurrentMangaBeingEdited={setCurrentMangaBeingEdited}
          onSave={saveEdit}
        />
      )}
      <div className="mx-5 p-5 mt-4 h-25 flex content-center w-fill justify-between flex-col">
        {/* title & bio */}
        <div className="flex">
          <div className="">
            <h1 className="text-lg font-medium">My Manga List</h1>
            <h2 className="text-2xs text-gray-800">
              Tracking {mangaList.length ? mangaList.length : 0} manga
            </h2>
          </div>
        </div>
      </div>

      {/*the bottom half (list)*/}
      <div className="mx-25">
        {/* filters + layout*/}
        <div>
          <div className="flex gap-3 ">
            <button onClick={() => setFilterType("all")}>All</button>
            <button onClick={() => setFilterType("reading")}>Reading</button>
            <button onClick={() => setFilterType("plan_to_read")}>
              Plan To Read
            </button>
            <button onClick={() => setFilterType("completed")}>
              Completed
            </button>
            <button onClick={() => setFilterType("on_hold")}>On Hold</button>
            <button onClick={() => setFilterType("re_reading")}>
              Re-Reading
            </button>
            <button onClick={() => setFilterType("dropped")}>Dropped</button>
          </div>
        </div>

        <div className="table w-full">
          <tr className="text-sm ">
            <th> # </th>
            <th className="w-6.5/10 "> Manga </th>
            <th> Rating </th>
            <th> Chapters </th>
            <th> Review </th>
            <th> Edit </th>
          </tr>

          {mangaList.map((manga, index) => {
            if (filterType !== "all" && manga.reading_status !== filterType)
              return;
            return (
              <tr key={manga.manga_id} className="[&_th]:align-middle">
                <th className="">
                  <div className="text-center">{index + 1}</div>
                </th>
                <th>
                  <div className="flex py-2 bg-gray-200">
                    <img
                      src={manga.cover_image}
                      className=" h-20 mx-3 rounded-xl object-cover"
                    />
                    <div className="text-start flex flex-col ">
                      <div className="flex gap-2">
                        <p className="font-semibold">{manga.name}</p>
                        <p className="font-normal">{manga.reading_status}</p>
                        <p className="font-normal">{manga.manga_status}</p>
                      </div>
                      <p className="font-light">{manga.authors}</p>
                      <p className="font-light text-sm whitespace-pre-line">
                        {manga.notes || " "}
                      </p>
                    </div>
                  </div>
                </th>
                <th>
                  <span>
                    {manga.user_rating == null ? "-" : manga.user_rating}{" "}
                  </span>
                  /10
                </th>
                <th>
                  {manga.chapters_read}/{manga.total_chapters}
                </th>
                <th>
                  <div className="h-full flex justify-center items-center">
                    <TextAlignStart className="h-5" />
                  </div>
                </th>
                <th className="">
                  <div className="h-full flex justify-center items-center">
                    <Pencil
                      onClick={() => {
                        setCurrentMangaBeingEdited(manga);
                        console.log(manga.manga_id);
                      }}
                      className="h-5"
                    />
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
