import { MoveLeft, Pencil, Search, TextAlignStart, X } from "lucide-react";
import { useEffect } from "react";
import { useState, use } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

//ima move it to components later
export default function EditMangaListDialog({
  manga,
  setCurrentMangaBeingEdited,
  onSave,
}) {
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
