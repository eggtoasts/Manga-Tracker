import { Search } from "lucide-react";
import axios from "axios";
import { useRef, useEffect } from "react";
//fetching data from searching manga titles

async function fetchSearchData(query) {
  console.log(query);
  const ENDPOINT = `http://localhost:3000/api/search?title=${query}`;

  try {
    const res = await axios.get(ENDPOINT);

    console.log(res.data);
    return res.data;
  } catch (error) {}
}

export default function AddRecDialog({ onClose }) {
  const inputRef = useRef(null);
  useEffect(() => {
    console.log(inputRef.current.value);
  }, [inputRef.current]);
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
            onSubmit={(e) => {
              e.preventDefault();
              fetchSearchData(inputRef.current.value);
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
        </div>
      </div>
    </div>
  );
}
