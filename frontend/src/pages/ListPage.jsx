import { MoveLeft, Pencil, Search, TextAlignStart, X } from "lucide-react";
import { useEffect } from "react";
import { useState, use } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

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

//ima move it to components later
function EditMangaListDialog({ manga, setCurrentMangaBeingEdited, onSave }) {
  //if pressed submit on form, send a update request
  //if "delete", send delete request
  const [formData, setFormData] = useState({
    readingStatus: manga.reading_status || "reading",
    chaptersRead: manga.chapters_read || 0,
    userRating: manga.user_rating === null ? "" : manga.user_rating,
    notes: manga.notes || "",
  });

  const maxChapters = manga.total_chapters || 99999;

  function handleChange(e) {
    let { name, value } = e.target;
    let newValue = value;
    const { max } = e.target;
    console.log(max);
    switch (name) {
      case "userRating":
        if (value < 0) newValue = 0;
        if (value > 10) newValue = 10;
        break;
      case "chaptersRead":
        if (value < 0) newValue = 0;
        if (value > max) newValue = max;
        break;
    }
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-100 rounded-xl p-3 bg-white fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10">
        <div className="flex b border-b-gray-500 border-b">
          <h1>Edit Manga: </h1>
          <button
            className="hover:cursor-pointer flex items-center justify-center gap-2 ml-auto"
            onClick={() => setCurrentMangaBeingEdited(null)}
          >
            <X size={15} />
          </button>
        </div>

        <div className="mt-2 flex">
          <img className="h-40" src={manga.cover_image} />
          <div className="ml-2 flex flex-col">
            <h1 className="text-md font-semibold">{manga.name}</h1>
            <h1 className="text-sm flex gap-1">
              {manga.authors.map((author) => {
                return <span>{author}</span>;
              })}
            </h1>
            <h1>{manga.global_rating}</h1>
          </div>
        </div>

        <form className="[&_input]:rounded [&_input]:bg-gray-200 [&_label]:mt-2 [&_label]:font-semibold flex flex-col">
          <label>Status:</label>
          <select
            onChange={(e) => handleChange(e)}
            value={formData.readingStatus}
            name="readingStatus"
            className=" bg-gray-200 rounded-md"
          >
            <option value="reading">Reading</option>
            <option value="completed">Completed</option>
            <option value="plan_to_read">Plan To Read</option>
            <option value="on_hold">On Hold</option>
            <option value="dropped">Dropped</option>
          </select>
          <label>Chapters Read</label>
          <div className="rounded-md ">
            <input
              name="chaptersRead"
              defaultValue={manga.chapters_read}
              type="number"
              min="0"
              max={maxChapters}
              onChange={(e) => handleChange(e)}
              value={formData.chaptersRead}
            />
            <span>/ {manga.total_chapters}</span>
          </div>
          <label>Your Score (1-10)</label>
          <div className="rounded-md">
            <input
              defaultValue={manga.user_rating || 0}
              type="number"
              min="0"
              max="10"
              name="userRating"
              onChange={(e) => handleChange(e)}
              value={formData.userRating}
            />
          </div>

          <label>Your Note</label>
          <textarea
            name="notes"
            onChange={(e) => handleChange(e)}
            value={formData.notes}
            defaultValue={manga.notes}
            className=" bg-gray-200 rounded"
          />

          <div className="mt-2 flex gap-2 ml-auto ">
            <button
              className=" rounded-md px-2 py-1 bg-gray-300"
              onClick={(e) => {
                e.preventDefault();
                setCurrentMangaBeingEdited(null);
              }}
            >
              Delete
            </button>
            <button
              className="rounded-md px-2 py-1 bg-black text-white"
              onClick={async (e) => {
                e.preventDefault();
                const tempFormData = {
                  ...formData,
                  chaptersRead: Number(formData.chaptersRead),
                  userRating:
                    formData.userRating === ""
                      ? null
                      : Number(formData.userRating),
                };
                await onSave(manga.manga_id, tempFormData);
                setCurrentMangaBeingEdited(null);
              }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ListPage() {
  const [mangaList, setMangaList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentMangaBeingEdited, setCurrentMangaBeingEdited] = useState(null);
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
          <tr className="text-sm ">
            <th> # </th>
            <th className="w-6.5/10 "> Manga </th>
            <th> Rating </th>
            <th> Chapters </th>
            <th> Review </th>
            <th> Edit </th>
          </tr>

          {mangaList.map((manga, index) => {
            return (
              <tr key={manga.manga_id} className="[&_th]:align-middle">
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
                        <p className="font-normal">{manga.manga_status}</p>
                      </div>
                      <p className="font-light">{manga.authors}</p>
                      <p className="font-light text-sm">{manga.notes || " "}</p>
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
