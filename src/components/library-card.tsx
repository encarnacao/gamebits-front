import { LibraryEntry } from "@/types";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ClockIcon, FlagIcon, TrophyIcon } from "@heroicons/react/20/solid";
import Marker from "./library-entry-markers";

export default function LibraryCard({
  entry
}: {
  entry: LibraryEntry;
}) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/game/${entry.game.igdbId}`);
  };
  const markers = [
    {
      name: "finished",
      Icon: FlagIcon,
      boolean: entry.finished,
    },
    {
      name: "platinum",
      Icon: TrophyIcon,
      boolean: entry.platinum,
    },
  ];
  return (
    <div
      onClick={handleClick}
      className="flex w-11/12 justify-between p-4 mx-auto group overflow-hidden rounded-lg bg-slate-900 my-2 transition-all hover:bg-slate-800 cursor-pointer"
    >
      <div className="flex">
        <Image src={entry.game.cover} alt="Game Cover" width={64} height={64} className="object-cover"/>
        <div className="ml-4">
          <div className="flex">
            <h1 className="text-xl group-hover:text-orange-500 transition-all duration-300">
              {entry.game.name}
            </h1>
            <div className={`${entry.wishlist ? "hidden" : "flex"}`}>
            {markers.map((marker) => (
              <Marker
                Icon={marker.Icon}
                boolean={marker.boolean}
                key={`${entry.id}-${marker.name}`}
              />
            ))}
            </div>
          </div>
          <h2 className="text-l">{entry.game.platforms}</h2>
          <h2 className="text-l">
            Lançamento:{" "}
            {dayjs(entry.game.originalReleaseDate).format("DD/MM/YY")}
          </h2>
          <h2 className="text-l">
            Gêneros: {entry.game.genres}
          </h2>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <h1 className="text-l">
          Adicionado em: {dayjs(entry.createdAt).format("DD/MM/YY")}
        </h1>
        <div
          className={`${
            entry.wishlist || !Boolean(entry.completionTime)
              ? "hidden"
              : "flex items-center"
          }`}
        >
          <ClockIcon className="w-6 h-6 mr-4" />
          <h1 className="text-l">{entry.completionTime} horas</h1>
        </div>
      </div>
    </div>
  );
}
