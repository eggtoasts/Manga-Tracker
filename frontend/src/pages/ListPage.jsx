import { Plus, Search } from "lucide-react";

export default function ListPage() {
  return (
    <div className="p-5 mt-4 h-35 flex content-center w-fill justify-between flex-col">
      {/* title & bio */}
      <div className="flex">
        <div className="">
          <h1 className="text-lg font-medium">Community Recommendations</h1>
          <h2 className="text-2xs text-gray-800">
            Discover manga recommended by the community
          </h2>
        </div>

        <button className="h-8 w-40 flex bg-black text-white items-center justify-center text-xs rounded-sm px-2 font-medium ml-auto">
          <Plus size={15} /> <div className="">Add Recommendations</div>
        </button>
      </div>
      <div className="w-fill flex items-center rounded-bl-sm bg-gray-100 ">
        <Search size={15} className="mx-2 mr-2" />
        <input type="text" className=" w-xl py-1" />
      </div>
    </div>
  );
}
