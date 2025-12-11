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
      <div className="w-full max-w-md rounded-xl p-4 bg-white shadow-lg">
        <div className="flex border-b border-b-gray-300 pb-2">
          <h1 className="text-lg font-semibold">Edit Manga: </h1>
          <button
            className="hover:cursor-pointer flex items-center justify-center gap-2 ml-auto text-gray-500 hover:text-black"
            onClick={() => setCurrentMangaBeingEdited(null)}
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-3 flex gap-3">
          <img
            className="h-40 w-28 object-cover rounded-md"
            src={manga.cover_image}
          />
          <div className="flex flex-col">
            <h1 className="text-md font-semibold leading-tight">
              {manga.name}
            </h1>
            <h1 className="text-sm text-gray-600 flex gap-1 flex-wrap">
              {manga.authors.map((author) => {
                return <span>{author}</span>;
              })}
            </h1>
            <h1 className="text-sm font-medium text-gray-700">
              Global Rating: {manga.global_rating}
            </h1>
          </div>
        </div>

        <form className="[&_input]:rounded [&_input]:bg-gray-200 [&_input]:p-1 [&_label]:mt-3 [&_label]:font-semibold [&_select]:p-1 flex flex-col">
          <label>Status:</label>
          <select
            onChange={(e) => handleChange(e)}
            value={formData.readingStatus}
            name="readingStatus"
            className="bg-gray-200 rounded-md p-2"
          >
            <option value="reading">Reading</option>
            <option value="completed">Completed</option>
            <option value="plan_to_read">Plan To Read</option>
            <option value="on_hold">On Hold</option>
            <option value="dropped">Dropped</option>
          </select>

          <label>Chapters Read</label>
          <div className="flex items-center gap-1 bg-gray-200 rounded-md p-1">
            <input
              name="chaptersRead"
              defaultValue={manga.chapters_read}
              type="number"
              min="0"
              max={maxChapters}
              onChange={(e) => handleChange(e)}
              value={formData.chaptersRead}
              className="bg-transparent flex-1"
            />
            <span className="text-sm text-gray-600">
              / {manga.total_chapters}
            </span>
          </div>

          <label>Your Score (1-10)</label>
          <div className="rounded-md p-1 bg-gray-200">
            <input
              defaultValue={manga.user_rating || 0}
              type="number"
              min="0"
              max="10"
              name="userRating"
              onChange={(e) => handleChange(e)}
              value={formData.userRating}
              className="bg-transparent w-full"
            />
          </div>

          <label>Your Note</label>
          <textarea
            name="notes"
            onChange={(e) => handleChange(e)}
            value={formData.notes}
            defaultValue={manga.notes}
            className="bg-gray-200 rounded p-2 min-h-[80px]"
          />

          <div className="mt-4 flex gap-2 ml-auto">
            <button
              className="rounded-md px-3 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
              onClick={(e) => {
                e.preventDefault();
                setCurrentMangaBeingEdited(null);
              }}
            >
              Delete
            </button>
            <button
              className="rounded-md px-3 py-1 main text-white hover:opacity-90 transition"
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
