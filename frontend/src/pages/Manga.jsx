import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { PenBox } from "lucide-react";
export default function Manga() {
  const { mangaId } = useParams();
  const [manga, setManga] = useState(" ");

  //on mount, get info on manga id
  useEffect(() => {
    const ENDPOINT = `http://localhost:3000/mangas/${mangaId}`;
    const getManga = async (mangaId) => {
      try {
        const response = await axios.get(ENDPOINT);
        const mangaInfo = response.data;
        setManga(mangaInfo);
        console.log(mangaInfo);
      } catch (err) {
        console.log(err);
      }
    };

    getManga(mangaId);
  }, []);

  return (
    <>
      <div className="w-full flex flex-col">
        {/* Upper */}
        <div className="flex flex-col">
          {/* image banner */}
          <div className="relative h-60">
            <h1 className="left-90 bottom-40 z-1 absolute font-bold text-6xl text-white">
              <p>{manga.name}</p>
            </h1>

            <h1 className="left-90 bottom-28 z-1 absolute text-3xl font-normal text-white">
              <p>{manga.nameJapanese}</p>
            </h1>
            <div
              style={{
                background: `url(${manga.image})`,
              }}
              className={`z-[-2] absolute brightness-20  h-60 bg-cover bg-center w-full shadow-md`}
            ></div>
            <img
              src={manga.image}
              className="left-35 top-5 absolute shadow-md w-50 rounded"
            ></img>
          </div>
        </div>

        {/* buttons */}
        <div className="h-fit bg-white border-b border-gray-300 flex flex-col py-3.5">
          <div className=" h-fit ml-90 flex gap-3 mx-2 my-2">
            <buttons className="main font-medium rounded text-white px-2 py-2">
              Add To List
            </buttons>

            <buttons className="flex gap-2 main font-medium rounded text-white px-2 py-2">
              Add a Review <PenBox></PenBox>
            </buttons>
          </div>
        </div>

        {/* Lower half of page */}
        <div className="bg-['#F9FAFB'] grid grid-cols-[360px_1fr] py-4">
          {/* left col of page */}
          <div>
            <p>Quick Sypnosis:</p>
          </div>

          {/* right column of page */}
          <div className="bg-white rounded">
            <h1 className="font-bold text-xl">Overview</h1>
            <p>{manga.description}</p>

            <h1 className="font-bold text-xl">Reviews </h1>

            <h1 className="font-bold text-xl">Characters</h1>
          </div>
        </div>
      </div>
    </>
  );
}
