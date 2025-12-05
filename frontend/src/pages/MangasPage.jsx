import { Loader2, Plus, Search, Star } from "lucide-react";

//fetching should be outside of the component
//we're gonna access our mangas endpoint to get all popular mangas to list.
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useRef, use } from "react";
import { AuthContext } from "../context/AuthContext";

async function quickAddToList(manga, user) {
  console.log(user);
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
    await axios.post(
      ENDPOINT,
      {
        mangaId: manga.id,
        name: manga.name,
        description: manga.description,
        cover_image: manga.image,
        authors: manga.authors,
        rating: manga.score,
        genres: manga.genres,
        total_chapters: manga.chapters,
        manga_status: manga.status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(`Add Success! "${manga.name}" added as "Reading".`);
  } catch (error) {
    console.log("add failed:", error);
    console.log("Failed to add manga. Check console for details.");
  }
}

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
            <h1 className="text-lg font-medium">Browse Manga</h1>
            <h2 className="text-2xs text-gray-800">
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
  function showGenrePlus(index) {
    if (index === 3) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div
      key={manga.id}
      className=" flex flex-col border rounded-xl border-gray-300"
    >
      <div className="rounded-xl aspect-3/4 overflow-hidden cursor-pointer">
        <img
          src={manga.image}
          className="object-cover hover:scale-105 transition-transform durection-300 w-full h-full rounded-t-xl"
        ></img>
      </div>
      <div className="flex flex-col px-3 pt-3 [&>div]:pb-2">
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
            <span className="h-min w-max flex items-center gap-1 sub rounded-full w-min px-1 text-sm">
              <Star size={10} color={"#9708fe"} fill={"#9708fe"} />
              {manga.score}
            </span>

            {/* pages */}
            <span className="h-min sub rounded-full w-max px-1 text-sm">
              {manga.chapters ? manga.chapters + " ch" : "Ongoing"}
            </span>
          </div>
          {/* genres */}
          <div className="flex flex-wrap gap-1 pt-3">
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
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          quickAddToList(manga, user);
        }}
        className="mt-auto mb-3 mx-3 p-2 main text-white  rounded-full hover:cursor-pointer"
      >
        Add to List
      </button>
    </div>
  );
}
