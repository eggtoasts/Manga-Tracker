import { User, Star } from "lucide-react";
import ListPage from "./ListPage";
export default function RecPage() {
  return (
    <>
      <ListPage />

      <div className="pt-5 flex flex-col items-center">
        {/* what each card should look like :p */}
        <div className=" w-4/6 p-3 border-2 flex flex-col rounded-lg">
          {/* name */}

          <div className="h-10 border-b-1 ">
            <div className="flex items-center justify-center bg-purple-100 w-fit rounded-2xl">
              <User size={15} className="mx-2" />
              <div>
                Recommended by{" "}
                <span className="font-semibold text-purple-700 pr-2">
                  trivial
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-row pt-3">
            <div className="flex flex-col gap-2">
              {/* book */}
              <div className="h-55 w-40 border-1 rounded-2xl"></div>
              <div className="">Attack on Titan</div>
              <div className="text-xs text-gray-500">by Hajima Isayama</div>
              <div className="text-xs text-gray-500">100 chapters</div>
              <div className="flex gap-2 text-xs [&_div]:p-0.5 [&_div]:rounded-2xl [&_div]:bg-amber-200">
                <div className="">Dark fantasy</div>
                <div className="">Horror</div>
                <div className="">Smth</div>
              </div>
            </div>

            <div className="flex flex-col mx-10">
              {/* Stars */}
              <div className="flex">
                <Star size={20} />
                <Star size={20} />
                <Star size={20} />
                <Star size={20} />
                <Star size={20} />
              </div>

              {/* Review */}
              <div>
                The plot twists are insane! Every chapter leaves you wanting
                more. The dark atmosphere and complex characters make this a
                must-read. Isayama crafted one of the most intricate stories in
                manga history. The way everything connects and the revelations
                throughout the series will blow your mind. It's not just action
                - it's a deep commentary on humanity, war, and freedom.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
