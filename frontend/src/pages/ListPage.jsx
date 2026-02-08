import { MoveLeft, Pencil, Search, TextAlignStart, X } from "lucide-react";
import { useEffect } from "react";
import { useState, use } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import EditMangaListDialog from "../components/EditMangaListDialog";

//deleting manga
async function deleteManga(user, mangaId) {
  const ENDPOINT = `https://manga-tracker-backend-al0s.onrender.com/userlist/${mangaId}`;
  const token = localStorage.getItem("accessToken");

  if (!token) {
    console.log("JWT missing. log in again.");
    return;
  }

  try {
    const response = await axios.delete(ENDPOINT, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
}

//for editing manga
async function editManga(user, mangaId, updatedFields) {
  const ENDPOINT = `https://manga-tracker-backend-al0s.onrender.com/userlist/${mangaId}`;
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

  const ENDPOINT = "https://manga-tracker-backend-al0s.onrender.com/userlist";
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
  const [filterX, setFilterX] = useState("0");

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

  async function onDelete(mangaId) {
    try {
      await deleteManga(user, mangaId);
      await getMangaList(user, setMangaList);
    } catch (err) {
      console.error("Failed to delete list.", err);
    }
  }

  function readingStatusColor(type) {
    switch (type) {
      case "reading":
        return "bg-blue-400";
      case "plan_to_read":
        return "bg-gray-400";
      case "completed":
        return "bg-green-400";
      case "on_hold":
        return "bg-yellow-400";
      case "dropped":
        return "bg-red-400";
    }
    return "";
  }

  function mangaStatusColor(type) {
    switch (type) {
      case "Finished":
        return "bg-cyan-500";
      case "Publishing":
        return "bg-lime-500";
      case "On Hiatus":
        return "bg-yellow-500";
    }
    return "";
  }

  return (
    <>
      {currentMangaBeingEdited && (
        <EditMangaListDialog
          manga={currentMangaBeingEdited}
          setCurrentMangaBeingEdited={setCurrentMangaBeingEdited}
          onSave={saveEdit}
          onDelete={onDelete}
        />
      )}
      <div className="mx-5 p-5 mt-4 h-25 flex content-center w-fill justify-between flex-col">
        {/* title & bio */}
        <div className="flex">
          <div className="">
            <h1 className="text-xl font-semibold">My Manga List</h1>
            <h2 className="text-2xs text-gray-600">
              Tracking {mangaList.length ? mangaList.length : 0} manga
            </h2>
          </div>
        </div>
      </div>

      {/*the bottom half (list)*/}
      <div className="mx-25">
        {/* filters + layout*/}
        <div>
          <div className="text-gray-400 z-1 relative [&_button]:hover:cursor-pointer [&_button]:px-4 [&_button]:font-bold [&_button]:transition-all duration-200  gap-3 flex bg-gray-100 py-1.5 px-5 w-max">
            <button
              onClick={() => {
                setFilterType("all");
                setFilterX("translate-x-[0px] ");
              }}
              className={`${filterType === "all" ? "text-white" : ""}`}
            >
              All
            </button>
            <button
              onClick={() => {
                setFilterType("reading");
                setFilterX("translate-x-[83px] scale-x-150");
              }}
              className={`${filterType === "reading" ? "text-white" : ""}`}
            >
              Reading
            </button>
            <button
              onClick={() => {
                setFilterType("plan_to_read");
                setFilterX("translate-x-[205px] scale-x-210 ");
              }}
              className={`${filterType === "plan_to_read" ? "text-white" : ""}`}
            >
              Plan To Read
            </button>
            <button
              onClick={() => {
                setFilterType("completed");
                setFilterX("translate-x-[339px] scale-x-190");
              }}
              className={`${filterType === "completed" ? "text-white" : ""}`}
            >
              Completed
            </button>
            <button
              onClick={() => {
                setFilterType("on_hold");
                setFilterX("translate-x-[457px] scale-x-145");
              }}
              className={`${filterType === "on_hold" ? "text-white" : ""}`}
            >
              On Hold
            </button>
            <button
              onClick={() => {
                setFilterType("re_reading");
                setFilterX("translate-x-[575px] scale-x-175");
              }}
              className={`${filterType === "re_reading" ? "text-white" : ""}`}
            >
              Re-Reading
            </button>
            <button
              onClick={() => {
                setFilterType("dropped");
                setFilterX("translate-x-[695px] scale-x-159");
              }}
              className={`${filterType === "dropped" ? "text-white" : ""}`}
            >
              Dropped
            </button>
            <div
              className={`self-center py-3.5 z-[-2] ${filterX}  transition-all duration-300 ease-in-out h-6 min-w-14 main absolute`}
            ></div>
          </div>
        </div>

        <div className="border-collapse table w-full mt-5">
          <tr className="border-[#2e51a280] border text-sm h-10 [&_th]:py-2 bg-[#E1E7F5]">
            <th className="min-w-0.5"> </th>
            <th> # </th>

            <th className="w-[600px] "> Manga </th>
            <th> Rating </th>
            <th> Chapters </th>
            <th> Review </th>
            <th> Edit </th>
          </tr>

          {mangaList.map((manga, index) => {
            if (filterType !== "all" && manga.reading_status !== filterType)
              return;
            return (
              <tr
                key={manga.manga_id}
                className="border-gray-300 border [&_th]:align-middle"
              >
                <th className={`${readingStatusColor(manga.reading_status)}`}>
                  <div className="w-full"></div>
                </th>
                <th className="">
                  <div className="text-center font-medium">{index + 1}</div>
                </th>

                <th>
                  <div className="flex py-2 ">
                    <img
                      src={manga.cover_image}
                      className=" h-20 mx-3 rounded-xl object-cover"
                    />
                    <div className="text-start flex flex-col ">
                      <div className="">
                        <span className="mr-2 font-semibold">
                          {manga.name}
                          <span className="relative">
                            <div className="left-2 top-[1.5px] absolute inline-flex ">
                              <div className="text-sm flex items-center content-center bg-gray-200 px-2 rounded">
                                <p
                                  className={`rounded w-1.5 h-1.5 mr-2 ${mangaStatusColor(
                                    manga.manga_status,
                                  )}`}
                                ></p>
                                <p className="font-normal w-max">
                                  {manga.manga_status}
                                </p>
                              </div>
                            </div>
                          </span>
                        </span>
                      </div>

                      <p className="font-light">
                        {manga.authors.map((author) => author)}
                      </p>
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
                </th>
                <th>
                  <p className="font-normal">
                    <span className="font-medium">{manga.chapters_read}</span>/
                    {manga.total_chapters}
                  </p>
                </th>
                <th className="bg-gray-50">
                  <div className="h-full flex justify-center items-center ">
                    <TextAlignStart className="h-5" />
                  </div>
                </th>
                <th className="bg-gray-50 ">
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
