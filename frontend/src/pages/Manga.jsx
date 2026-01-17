import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Loader2, PenBox } from "lucide-react";
import { use } from "react";
import { AuthContext } from "../context/AuthContext";
import { quickAddToList } from "../utils/quickAddToList";

export default function Manga() {
  const { mangaId } = useParams();
  const { user } = use(AuthContext);
  const [manga, setManga] = useState(" ");
  const [loading, setLoading] = useState(true);

  // on mount, get info on manga id
  useEffect(() => {
    const ENDPOINT = `http://localhost:3000/mangas/${mangaId}`;
    const getManga = async () => {
      try {
        setLoading(true);
        const response = await axios.get(ENDPOINT);
        const mangaInfo = response.data;
        setManga(mangaInfo);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getManga();
  }, []);

  return (
    <>
      {loading ? (
        <div className="mt-80">
          <Loader2 className="loading-animation self-center justify-self-center" />
        </div>
      ) : (
        <div className="w-full flex flex-col">
          {/* Upper */}
          <div className="flex flex-col">
            {/* image banner */}
            <div className="relative h-64 w-full">
              {/* background image */}
              <div
                className="absolute inset-0 bg-cover bg-center brightness-20"
                style={{ backgroundImage: `url(${manga.image})` }}
              ></div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* manga cover */}
              <img
                src={manga.image}
                className="z-2 absolute left-15 top-6 shadow-xl w-55 rounded-lg"
              />

              <div className="absolute left-96 bottom-6 text-white max-w-3xl space-y-1">
                {/* title */}
                <h1 className="font-bold text-5xl leading-tight">
                  {manga.name}
                </h1>

                {manga.nameJapanese && (
                  <p className="text-xl opacity-90 leading-tight">
                    {manga.nameJapanese}
                  </p>
                )}

                {/* authors */}
                <p className="text-sm opacity-80">{manga.authors}</p>
              </div>
            </div>
          </div>

          {/* buttons */}
          <div className="h-fit bg-white border-b border-gray-300 flex flex-col py-3.5">
            <div className="h-fit ml-96 flex gap-3 mx-2 my-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  quickAddToList(manga, user);
                }}
                className="main font-medium rounded text-white px-4 py-2 hover:opacity-90 transition"
              >
                Add To List
              </button>

              <button className="flex items-center gap-2 border px-4 py-2 rounded font-medium hover:bg-gray-100 transition">
                Add a Review <PenBox size={16} />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="ml-96 flex gap-6 text-gray-700 mt-2">
              <button className="hover:text-black">Overview</button>
              <button className="hover:text-black">Reviews</button>
              <button className="hover:text-black">Characters</button>
              <button className="hover:text-black">Read</button>
            </div>
          </div>

          {/* Lower half of page */}
          <div className="bg-gray-100 grid grid-cols-[340px_1fr] py-6 ">
            {/* left column */}
            <div className="flex flex-col items-center">
              <div className="bg-white rounded-lg p-4 w-64 text-sm shadow">
                <p className="font-bold mb-2">Quick Synopsis:</p>
                <p className="text-xs font-medium mb-1">Genres</p>
                <div className="flex gap-2 flex-wrap">
                  {manga.genres &&
                    manga.genres.map((genre) => (
                      <span className="bg-blue-200 px-2 py-[2px] rounded text-xs">
                        {genre}
                      </span>
                    ))}
                </div>
                <p className="text-xs font-medium mt-2 mb-1">Release date</p>{" "}
                <p className="text-xs">
                  {manga.published.month}/{manga.published.day}/
                  {manga.published.year}
                </p>
                <p className="text-xs font-medium mt-2 mb-1">Total Chapters</p>
                <p className="text-xs">{manga.chapters}</p>
                <p className="text-xs font-medium mt-2 mb-1">Ranking (MAL)</p>
                <p className="text-xs">#{manga.rank}</p>
                <p className="text-xs font-medium mt-2 mb-1">Score (MAL):</p>
                <p className="text-xs">{manga.score}</p>
              </div>
            </div>

            {/* right column */}
            <div className="flex mr-16 gap-4 flex-col mx-10 [&>div]:p-5">
              <div className="bg-white rounded shadow">
                <h1 className="font-bold text-xl">Overview</h1>
                <p className="mt-2">{manga.description}</p>
              </div>

              <div className="bg-white rounded shadow">
                <h1 className="font-bold text-xl">Reviews</h1>
                <p className="mt-2">Coming soon.</p>
              </div>

              <div className="bg-white rounded shadow">
                <h1 className="font-bold text-xl">Main Characters</h1>

                <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4 mt-3">
                  {manga.characters &&
                    manga.characters.map((c) => (
                      <div className="flex flex-col items-center">
                        <img
                          className="rounded object-cover h-24 w-20 mb-2"
                          src={c.characterImage}
                        />
                        <p className="text-center text-sm">{c.characterName}</p>
                      </div>
                    ))}
                </div>
              </div>

              <div className="bg-white rounded shadow">
                <h1 className="font-bold text-xl">Read Online</h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
