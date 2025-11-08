import { Search } from "lucide-react";
import axios from "axios";
import { useRef, useEffect } from "react";
import { useState } from "react";
//fetching data from searching manga titles

async function fetchSearchData(query) {
  console.log(query);
  const ENDPOINT = `http://localhost:3000/api/search?title=${query}`;

  try {
    const res = await axios.get(ENDPOINT);
    const mangaArray = res.data;
    return mangaArray;
  } catch (error) {}
}

export default function AddRecDialog({ onClose }) {
  const [searchedMangas, setSearchedMangas] = useState([]);

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
      <div className="rounded p-3 bg-white fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10">
        {/* header stuff */}
        <div className="flex flex-col">
          <h1 className="font-semibold">Search for Manga to Recommend</h1>
          <h2 className="text-gray-500 text-sm">
            Type in the title of the manga you want to recommend to the
            community!
          </h2>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const arr = await fetchSearchData(inputRef.current.value);
              setSearchedMangas(arr);
            }}
            className="flex gap-2 items-center"
          >
            <div className="w-full items-center flex bg-gray-100 px-2 rounded-2xl gap-2">
              <Search size={15} color={"gray"} />
              <input
                ref={inputRef}
                className="w-full"
                type="text"
                placeholder="Search for mangas here..."
              />
            </div>

            {/* whenever we press this button it should send a get request */}
            <button className="text-white bg-black rounded-xl p-1">
              Search
            </button>
          </form>

          {/* should b where the manga appears */}

          <div className="h-60 flex flex-col overflow-y-scroll gap-3 mt-2 ">
            {searchedMangas.map((manga) => {
              return (
                // the card
                <button className="hover:bg-blue-200/20 flex text-sm border border-gray-300 rounded p-3 text-left">
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
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
