import { Plus, Search, Star } from "lucide-react";

//fetching should be outside of the component
//we're gonna access our mangas endpoint to get all popular mangas to list.
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
async function fetchPopularMangas() {
  const ENDPOINT = "http://localhost:3000/api/mangas";

  try {
    const res = await axios.get(ENDPOINT);
    const data = res.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default function ListPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [popularMangas, setPopularMangas] = useState([]);

  //create a function tht checks genre index and decides if we show (+)

  function showGenrePlus(index) {
    if (index === 3) {
      return true;
    } else {
      return false;
    }
  }

  // by mount it should display popular mangas
  useEffect(() => {
    const getPopularMangas = async () => {
      try {
        setLoading(true);
        const arr = await fetchPopularMangas();
        setPopularMangas(arr);
        console.log(popularMangas);
        setError(null);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getPopularMangas();
  }, []);
  return (
    <>
      <div className="mx-10 p-5 mt-4 h-35 flex content-center w-fill justify-between flex-col">
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

        {loading ? (
          <span>Loading</span>
        ) : (
          <div className="pt-6 grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {/* this the card */}

            {popularMangas.map((manga) => {
              return (
                <div className=" flex flex-col border rounded-xl border-gray-300">
                  <div className="rounded-xl aspect-3/4 overflow-hidden cursor-pointer">
                    <img
                      src={manga.image}
                      className="object-cover hover:scale-105 transition-transform durection-300 w-full h-full rounded-t-xl"
                    ></img>
                  </div>
                  <div className="flex flex-col p-3 [&>div]:pb-2">
                    <div className="[&:last-child]:pb-6 flex-1 ">
                      {/* name of manga */}
                      <h3 className="line-clamp-1 mb-2 cursor-pointer hover:text-primary">
                        {manga.name}
                      </h3>

                      {/* description */}
                      <p className="line-clamp-3 mb-3 text-gray-500 text-sm">
                        {manga.description}
                      </p>

                      {/* rating (if the api has any) */}
                      <div className="flex gap-2 ">
                        <span className="h-min w-max flex items-center gap-1 bg-gray-300/80 rounded-full w-min px-1 text-sm">
                          <Star size={10} />
                          {manga.score}
                        </span>

                        {/* pages */}
                        <span className="h-min bg-gray-300/80 rounded-full w-max px-1 text-sm">
                          1000 ch
                        </span>
                      </div>
                      {/* genres */}
                      <div className="flex gap-1">
                        {manga.genres
                          .slice(0, 4)
                          .map((g, index) =>
                            !showGenrePlus(index) ? (
                              <span className=" px-1 bg-gray-200/20 rounded-2xl text-sm font-light">
                                {g}
                              </span>
                            ) : (
                              <span className="px-1 bg-gray-200/20 rounded-2xl text-sm font-light">
                                {`+${manga.genres.length - 3}`}
                              </span>
                            )
                          )}
                      </div>
                    </div>

                    <button className="mt-2 p-2 bg-black text-white  rounded-full">
                      Add to List
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
