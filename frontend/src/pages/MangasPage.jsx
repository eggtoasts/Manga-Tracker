import { Loader2, Plus, Search, Star } from "lucide-react";

//fetching should be outside of the component
//we're gonna access our mangas endpoint to get all popular mangas to list.
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useRef, use } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";
import { quickAddToList } from "../utils/quickAddToList";

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

export default function MangasPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [popularMangas, setPopularMangas] = useState([]);

  const inputRef = useRef(null);
  const { user } = use(AuthContext);

  const [searchedMangas, setSearchedMangas] = useState([]);
  const [browseType, setBrowseType] = useState("Popular");

  //create a function tht checks genre index and decides if we show (+)

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
      <div className=" mx-5 p-5 mt-4 h-fit flex content-center w-fill justify-between flex-col ">
        {/* title & bio */}
        <div className="flex">
          <div className="">
            <h1 className="text-xl font-semibold">Browse Manga</h1>
            <h2 className="text-2xs text-gray-600">
              Discover and add manga to your list!
            </h2>
          </div>
        </div>
        <form
          onSubmit={async (e) => {
            //same search logic as in AddRecForm
            e.preventDefault();

            if (inputRef.current.value === "") {
              return;
            }
            const arr = await fetchSearchData(
              inputRef.current.value,
              setLoading,
              setError
            );
            setSearchedMangas(arr);
            setBrowseType("Search");
          }}
          className="w-fill flex items-center rounded-bl-sm bg-gray-100 mt-4"
        >
          <Search size={15} className="mx-2 mr-2" />
          <input ref={inputRef} type="text" className=" w-full py-1" />
        </form>

        <div className="mt-5 flex bg-gray-300 py-[2px] px-1 w-max rounded-xl ">
          <button
            onClick={() => {
              setBrowseType("Popular");
            }}
            className={`text-sm rounded-xl px-2 py-1 hover:cursor-pointer transition-colors duration-200 ${
              browseType === "Popular"
                ? "bg-white text-black font-semibold "
                : "bg-transparent"
            }`}
          >
            Popular
          </button>
          <button
            onClick={() => {
              setBrowseType("Search");
            }}
            className={`text-sm rounded-xl px-2 py-1 hover:cursor-pointer transition-colors duration-200 ${
              browseType === "Search"
                ? "bg-white text-black font-semibold "
                : "bg-transparent"
            }`}
          >
            Search Results ({searchedMangas.length})
          </button>
        </div>

        {loading ? (
          <div className="mt-80">
            <Loader2 className="loading-animation self-center justify-self-center" />
          </div>
        ) : (
          <div className=" pt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {/* this the card */}

            {/*  itll show popular mangas OR searched mangas */}

            {browseType === "Popular"
              ? popularMangas.map((manga) => {
                  return <MangaCard manga={manga} user={user} />;
                })
              : searchedMangas.map((manga) => {
                  return <MangaCard manga={manga} user={user} />;
                })}
          </div>
        )}
      </div>
    </>
  );
}

function MangaCard({ manga, user }) {
  const visibleGenres = manga.genres.slice(0, 3);
  const remainingCount = manga.genres.length - visibleGenres.length;

  return (
    <div
      key={manga.id}
      className=" flex flex-col border rounded-xl border-gray-300"
    >
      <Link to={`/mangas/${manga.id}`}>
        <div className="rounded-xl aspect-3/4 overflow-hidden cursor-pointer">
          <img
            src={manga.image}
            className="object-cover hover:scale-105 transition-transform durection-300 w-full h-full rounded-t-xl"
          ></img>
        </div>
      </Link>
      <div className="flex flex-col px-3 pt-3 [&>div]:pb-2">
        <div className="[&:last-child]:pb-6 flex-1 ">
          {/* title */}
          <h3 className="font-semibold text-lg line-clamp-1 mb-1 hover:text-primary cursor-pointer">
            {manga.name}
          </h3>

          {/* description */}
          <p className="line-clamp-3 mb-3 text-gray-500 text-sm">
            {manga.description}
          </p>

          {/* rating + chapters */}
          <div className="flex gap-2 mb-3">
            <span className="flex items-center gap-1 bg-blue-50 main-text px-2 py-0.5 rounded-full text-xs font-medium">
              <Star size={12} fill="#2E51A2" color="#2E51A2" />
              {manga.score}
            </span>

            <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs font-medium text-gray-700">
              {manga.chapters ? `${manga.chapters} ch` : "Ongoing"}
            </span>
          </div>

          {/* genres */}
          <div className="flex flex-wrap gap-1 mb-2">
            {visibleGenres.map((g) => (
              <span
                key={g}
                className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs"
              >
                {g}
              </span>
            ))}

            {remainingCount > 0 && (
              <span className="px-2 py-0.5 bg-gray-200 text-gray-600 rounded-full text-xs">
                +{remainingCount}
              </span>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          quickAddToList(manga, user);
        }}
        className="mt-auto mb-3 mx-3 p-2 main text-white rounded-sm hover:cursor-pointer"
      >
        Add to List
      </button>
    </div>
  );
}
