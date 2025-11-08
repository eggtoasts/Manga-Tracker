import { BookOpen, Heart, Search } from "lucide-react";
import { Link } from "react-router";
export default function Navbar() {
  const iconsize = 13;
  return (
    <>
      {/* nav */}
      <div className="flex justify-between h-15.5items-center p-5 border-b-1 border-gray-300">
        {/* //title & logo */}
        <div className="flex gap-2 hover:cursor-pointer">
          <div>logo</div>
          <div>MangaList</div>
        </div>

        <ul className="flex gap-5 hover:cursor-pointer [&_button]:rounded-md [&_button]:font-medium [&_button]:p-2 [&_button]:text-xs [&_button]:justify-center">
          {/* //navigation links */}
          <li>
            <button className="bg-black text-amber-50 flex items-center min-w-20 ">
              <BookOpen size={iconsize} className="mr-2" />
              <Link to="lists"> My List</Link>
            </button>
          </li>
          <li>
            <button className="bg-black text-amber-50 flex items-center min-w-20">
              <Search size={iconsize} className="mr-2" />
              <Link to="mangas">Browse</Link>
            </button>
          </li>
          <li>
            <button className="bg-black text-amber-50 flex items-center">
              <Heart size={iconsize} className="mr-2" />
              <Link to="recs">Recommendations</Link>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
