import { User, Star, Search, Plus } from "lucide-react";
import ListPage from "./MangasPage";
import AddRecDialog from "../components/AddRecDialog";
import AddRecForm from "../components/AddRecForm";
import { useState, useEffect } from "react";
export default function RecPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [selectedManga, setSelectedManga] = useState({
    selected: false,
    manga: null,
  });

  const openDialog = () => {
    setIsDialogOpen(true);
  };
  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      {isDialogOpen === true &&
        //If we selected a manga through the addRecDialog, this form shows instead.
        (selectedManga.selected ? (
          <AddRecForm
            setSelectedManga={setSelectedManga}
            selectedManga={selectedManga}
            closeDialog={closeDialog}
          />
        ) : (
          <AddRecDialog
            closeDialog={closeDialog}
            setSelectedManga={setSelectedManga}
          />
        ))}
      <div className="mx-5 p-5 mt-4 h-35 flex content-center w-fill justify-between flex-col">
        {/* title & bio */}
        <div className="flex">
          <div className="">
            <h1 className="text-xl font-semibold">Community Reviews</h1>
            <h2 className="text-2xs text-gray-600">
              Discover manga reviewed by the community
            </h2>
          </div>

          <button
            onClick={openDialog}
            className="cursor-pointer h-8 w-40 flex bg-black text-white items-center justify-center text-xs rounded-sm px-2 font-medium ml-auto"
          >
            <Plus size={15} /> <div className="">Add Review</div>
          </button>
        </div>
        <div className="w-fill flex items-center rounded-bl-sm bg-gray-100 ">
          <Search size={15} className="mx-2 mr-2" />
          <input type="text" className=" w-xl py-1" />
        </div>
        <div className="pt-5 flex flex-col items-center">
          {/* what each card should look like :p */}
          <div className=" w-4/6 p-3 border-2 rounded-xl border-gray-300 flex flex-col rounded-lg">
            {/* name */}

            <div className="h-10 border-b-1 border-gray-300">
              <div className="flex items-center justify-center bg-purple-100 w-fit rounded-2xl px-2">
                <User size={15} className="" />
                <div>
                  <span className="font-normal text-gray-700 px-1">
                    Recommended by
                  </span>
                  <span className="font-semibold text-purple-700">trivial</span>
                </div>
              </div>
            </div>

            <div className="flex flex-row pt-3">
              <div className="flex flex-col gap-2">
                {/* book */}
                <div className="h-55 w-40 border-1 rounded-2xl"></div>
                <div className="">Attack on Titan</div>
                <div className="text-xs text-gray-500">by Hajima Isayama</div>
                <div className="text-xs text-gray-500">100 chapters</div>
                <div className="flex gap-2 text-xs [&_div]:p-0.5 [&_div]:rounded-2xl [&_div]:bg-amber-200">
                  <div className="">Dark fantasy</div>
                  <div className="">Horror</div>
                  <div className="">Smth</div>
                </div>
              </div>

              <div className="flex flex-col mx-10">
                {/* Stars */}
                <div className="flex">
                  <Star size={20} />
                  <Star size={20} />
                  <Star size={20} />
                  <Star size={20} />
                  <Star size={20} />
                </div>

                {/* Review */}
                <div>
                  The plot twists are insane! Every chapter leaves you wanting
                  more. The dark atmosphere and complex characters make this a
                  must-read. Isayama crafted one of the most intricate stories
                  in manga history. The way everything connects and the
                  revelations throughout the series will blow your mind. It's
                  not just action - it's a deep commentary on humanity, war, and
                  freedom.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
