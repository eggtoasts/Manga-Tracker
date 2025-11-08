import { Search } from "lucide-react";

export default function ListPage() {
  return (
    <>
      <div className="mx-5 p-5 mt-4 h-35 flex content-center w-fill justify-between flex-col">
        {/* title & bio */}
        <div className="flex">
          <div className="">
            <h1 className="text-lg font-medium">My Manga List</h1>
            <h2 className="text-2xs text-gray-800">Tracking 0 manga</h2>
          </div>
        </div>
        <div className="w-fill flex items-center rounded-bl-sm bg-gray-100 ">
          <Search size={15} className="mx-2 mr-2" />
          <input type="text" className=" w-xl py-1" />
        </div>
      </div>

      <div></div>
    </>
  );
}
