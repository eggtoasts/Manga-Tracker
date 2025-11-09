import { Search, X, Loader2 } from "lucide-react";
import axios from "axios";
import { useRef, useEffect } from "react";
import { useState } from "react";
//fetching data from searching manga titles

async function fetchSearchData(query, setLoading, setError) {
  setLoading(true);
  console.log(query);
  const ENDPOINT = `http://localhost:3000/api/search?title=${query}`;

  try {
    const res = await axios.get(ENDPOINT);
    const mangaArray = res.data;
    setLoading(false);
    return mangaArray;
  } catch (error) {
    setError(error);
  }
}

export default function AddRecDialog({ closeDialog, setSelectedManga }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchedMangas, setSearchedMangas] = useState([]);
  const [hasTyped, setHasTyped] = useState(false);

  const inputRef = useRef(null);
  useEffect(() => {
    console.log(inputRef.current.value);
  }, [inputRef.current]);

  //put this in a seperate file later
  function showGenrePlus(index) {
    if (index === 3) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* le dialog */}

      <div className="rounded-xl p-3 bg-white fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10">
        {/* header stuff */}
        <div className="relative flex flex-col">
          <button className="absolute right-[1%] ml-auto cursor-pointer">
            <X onClick={() => closeDialog()} size={"13"} />
          </button>
          <h1 className="font-semibold">Search for Manga to Recommend</h1>
          <h2 className="text-gray-500 text-sm">
            Type in the title of the manga you want to recommend to the
            community!
          </h2>

          <form
            onSubmit={async (e) => {
              e.preventDefault();

              if (inputRef.current.value === "") {
                return;
              }
              setHasTyped(true);
              const arr = await fetchSearchData(
                inputRef.current.value,
                setLoading,
                setError
              );
              setSearchedMangas(arr);
            }}
            className="flex gap-2 items-center pt-3"
          >
            <div className="w-full items-center flex bg-gray-100 px-2 rounded-2xl gap-2 pt-2">
              <Search size={15} color={"gray"} />
              <input
                ref={inputRef}
                className="w-full"
                type="text"
                placeholder="Search for mangas here..."
              />
            </div>

            {/* whenever we press this button it should send a get request */}
            <button className="text-white bg-black rounded-md text-xs p-2 font-medium">
              Search
            </button>
          </form>

          {/* should b where the manga appears */}

          <div className="h-80 flex flex-col overflow-y-scroll gap-3 mt-2 ">
            {hasTyped ? (
              loading ? (
                <Loader2 className="loading-animation self-center justify-self-center" />
              ) : (
                searchedMangas.map((manga) => {
                  return (
                    // the card
                    <button
                      onClick={() =>
                        setSelectedManga({
                          selected: true,
                          manga: manga,
                        })
                      }
                      className="hover:bg-blue-200/20 flex text-sm border border-gray-300 rounded p-3 text-left"
                    >
                      <img
                        src={manga.image}
                        className="w-16 h-24 object-cover rounded-lg border border-gray-300"
                      ></img>

                      <div className="px-2">
                        <p>{manga.name}</p>
                        <p className=" line-clamp-2 text-gray-500">
                          {manga.description
                            ? manga.description
                            : "No description."}
                        </p>

                        {/* put this in a component file too since we reused this */}
                        <div className="flex gap-1 pt-2">
                          {manga.genres
                            .slice(0, 4)
                            .map((g, index) =>
                              !showGenrePlus(index) ? (
                                <span className=" px-1 bg-gray-200/20 rounded-2xl text-xs font-light">
                                  {g}
                                </span>
                              ) : (
                                <span className="px-1 bg-gray-200/20 rounded-2xl text-xs font-light">
                                  {`+${manga.genres.length - 3}`}
                                </span>
                              )
                            )}
                        </div>
                      </div>
                    </button>
                  );
                })
              )
            ) : (
              <div className=" h-full flex self-center">
                <div className="justify-self-center self-center text-gray-500 ">
                  Search for a manga title to get started.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
