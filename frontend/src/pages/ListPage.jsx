import { Plus, Search } from "lucide-react";

//fetching should be outside of the component
//we're gonna access our mangas endpoint to get all popular mangas to list.
import axios from "axios";
import { useEffect } from "react";
async function fetchPopularMangas() {
  const ENDPOINT = "http://localhost:3000/api/mangas";

  try {
    const res = await axios.get(ENDPOINT);
    const data = res.data;
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

export default function ListPage() {
  useEffect(() => {
    console.log(fetchPopularMangas());
  }, []);
  return (
    <div className="mx-5 p-5 mt-4 h-35 flex content-center w-fill justify-between flex-col">
      {/* title & bio */}
      <div className="flex">
        <div className="">
          <h1 className="text-lg font-medium">Browse Manga</h1>
          <h2 className="text-2xs text-gray-800">
            Discover and add manga to your list!
          </h2>
        </div>
      </div>
      <div className="w-fill flex items-center rounded-bl-sm bg-gray-100 ">
        <Search size={15} className="mx-2 mr-2" />
        <input type="text" className=" w-xl py-1" />
      </div>

      <div className="pt-6 grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {/* this the card */}

        {[1, 1, 1, 1, 1].map((x) => {
          return (
            <div className=" flex flex-col border rounded-xl border-gray-300">
              <div className="aspect-3/2 w-full h-60 border rounded-t-xl"></div>
              <div className="flex flex-col p-3 [&>div]:pb-2">
                {/* name of manga */}
                <div className="">Berserk</div>

                {/* author */}
                <div className="text-gray-500 text-sm">by idk i forgot</div>

                {/* description */}
                <div className="text-gray-500 text-sm">
                  Guts, a former mercenary now known as the Black Swordsman, is
                  out for revenge...
                </div>

                {/* rating (if the api has any) */}
                <div className="">
                  <span className="bg-gray-300/80 rounded-full w-min px-1 text-sm">
                    9.47
                  </span>

                  {/* pages */}
                  <span className="bg-gray-300/80 rounded-full w-min px-1 text-sm">
                    1000 ch
                  </span>
                </div>
                {/* genres */}
                <div className="">
                  <span className="text-sm">Thriller</span>
                </div>

                <button className="mt-2 p-2 bg-black text-white  rounded-full">
                  Add to List
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
