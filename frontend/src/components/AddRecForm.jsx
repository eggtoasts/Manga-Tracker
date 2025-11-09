import { Angry, Frown, Laugh, Meh, MoveLeft, Smile, Star } from "lucide-react";
import { useState } from "react";

export default function AddRecForm({
  closeDialog,
  selectedManga,
  setSelectedManga,
}) {
  const [emotion, setEmotion] = useState("Peak Fiction");
  const manga = selectedManga.manga;
  console.log(selectedManga);

  //   OMG How could I forget. We need a review title.
  //oooh i got some ideas
  // -recomended, NOT recomended, mixed

  //how many chapters read (finished, dropped)
  // - favorite character section
  return (
    <>
      {/* form of the selected manga*/}

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="w-190 rounded p-3 bg-white fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10">
          {/* header */}
          <div>
            <div className="flex text-lg font-semibold pb-1 border-b-1 border-gray-300">
              <p>Add Your Review</p>
              <button
                className="hover:cursor-pointer flex items-center justify-center gap-2 ml-auto"
                onClick={() =>
                  setSelectedManga({ selected: false, object: {} })
                }
              >
                <MoveLeft size={10} />{" "}
                <p className=" font-medium text-xs justify-centerflex items-center ">
                  Go back
                </p>
              </button>
            </div>
          </div>

          {/* the manga chosen */}
          <div className="flex pt-3">
            <img
              className="mx-3 rounded-xl w-36 h-54 object-cover"
              src={manga.image}
            ></img>

            <div className="px-5 w-full flex flex-col [&>h1]:pb-1">
              {/* manga title */}
              <h1 className="text-xl font-bold">{manga.name}</h1>

              {/* emotions felt */}
              <h1 className="text-sm font-bold">Would you recommend this?</h1>
              <div className="text-xs flex gap-2">
                <button className="border rounded-4xl px-[3px] py-[2px]  flex items-center justify-center gap-1">
                  <Laugh size={15} /> <p className="w-max">Peak Fiction</p>
                </button>
                <button className="flex items-center gap-1">
                  <Smile size={15} /> <p className="w-max">Recommended</p>
                </button>

                <button className=" flex items-center gap-1">
                  <Meh size={15} /> <p className="w-max">Mixed Feelings</p>
                </button>

                <button className="flex items-center justify-center gap-1">
                  <Frown size={15} /> <p className="w-max">Not Recommended</p>
                </button>
              </div>

              {/* star rating */}
              <h1 className="text-sm font-bold">Overall Rating</h1>
              <div className="flex">
                {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((a) => (
                  <Star size={20} />
                ))}
              </div>

              {/* spoiler warning */}
              <h1 className="text-sm font-bold">Spoiler Warning</h1>
              <div className="inline text-sm">
                <label className="">
                  yes
                  <input className="ml-1" type="radio" name="r" />
                </label>

                <label className="ml-2">
                  no
                  <input
                    className="ml-1"
                    type="radio"
                    name="r"
                    defaultChecked
                  />
                </label>
              </div>

              <textarea
                placeholder="Review Title"
                className="font-bold focus:outline-none border-gray-300 border rounded mb-2 text-sm p-2 h-10 w-full resize-none mt-2"
              />

              <textarea
                placeholder="Add a review..."
                className="focus:outline-none border-gray-300 border rounded mb-2 text-sm p-2 h-40 w-full resize-none mt-2"
              />
            </div>
          </div>

          <div className="w-full bg-gray-200">
            <button className="ml-auto hover:cursor-pointer rounded-md font-medium p-2 text-xs justify-center bg-black text-amber-50 flex items-center min-w-20">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

//other style i might use tbh
function OtherStyle({ closeDialog, selectedManga, setSelectedManga }) {
  const [emotion, setEmotion] = useState("Peak Fiction");
  const manga = selectedManga.manga;
  console.log(selectedManga);

  //   OMG How could I forget. We need a review title.
  //oooh i got some ideas
  // -recomended, NOT recomended, mixed

  //how many chapters read (finished, dropped)
  // - favorite character section
  return (
    <>
      {/* form of the selected manga*/}

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="w-190 rounded p-3 bg-white fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10">
          {/* header */}
          <div>
            <div className="flex text-lg font-semibold pb-1 border-b-1 border-gray-300">
              <p>Add Your Review</p>
              <button
                className="hover:cursor-pointer flex items-center justify-center gap-2 ml-auto"
                onClick={() =>
                  setSelectedManga({ selected: false, object: {} })
                }
              >
                <MoveLeft size={10} />{" "}
                <p className=" font-medium text-xs justify-centerflex items-center ">
                  Go back
                </p>
              </button>
            </div>
          </div>

          {/* the manga chosen */}
          <div className="flex pt-3">
            <div className="min-w-max">
              <img
                className="mx-3 rounded-xl w-36 h-54 object-cover"
                src={manga.image}
              ></img>
              <p className="text-sm text-gray-400">
                by {manga.authors.map((author) => author + " ")}
              </p>
            </div>

            <div className="px-5 w-full flex flex-col [&>h1]:pb-1">
              {/* manga title */}
              <h1 className="text-xl font-bold">{manga.name}</h1>

              <textarea
                placeholder="Review Title"
                className="font-bold focus:outline-none border-gray-300 border rounded mb-2 text-sm p-2 h-10 w-full resize-none mt-2"
              />

              <textarea
                placeholder="Add a review..."
                className="focus:outline-none border-gray-300 border rounded mb-2 text-sm p-2 h-90 w-full resize-none "
              />

              {/* emotions felt */}
            </div>

            <div>
              <h1 className="text-sm font-bold">Would you recommend this?</h1>
              <div className="text-xs flex flex-col gap-2">
                <button className=" flex items-center  gap-1">
                  <Laugh size={15} /> <p className="w-max">Peak Fiction</p>
                </button>
                <button className="flex items-center gap-1">
                  <Smile size={15} /> <p className="w-max">Recommended</p>
                </button>

                <button className=" flex items-center gap-1">
                  <Meh size={15} /> <p className="w-max">Mixed Feelings</p>
                </button>

                <button className="flex items-center  gap-1">
                  <Frown size={15} /> <p className="w-max">Not Recommended</p>
                </button>
              </div>

              {/* star rating */}
              <h1 className="text-sm font-bold">Overall Rating</h1>
              <div className="flex">
                {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((a) => (
                  <Star size={20} />
                ))}
              </div>

              {/* spoiler warning */}
              <h1 className="text-sm font-bold">Spoiler Warning</h1>
              <div className="inline text-sm">
                <label className="">
                  yes
                  <input className="ml-1" type="radio" name="r" />
                </label>

                <label className="ml-2">
                  no
                  <input
                    className="ml-1"
                    type="radio"
                    name="r"
                    defaultChecked
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="w-full bg-gray-200">
            <button className="ml-auto hover:cursor-pointer rounded-md font-medium p-2 text-xs justify-center bg-black text-amber-50 flex items-center min-w-20">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
