import { GameData } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function GameCard({ data }: { data: GameData }) {
  const router = useRouter();
  const releasedGame = data.releaseDate !== "Invalid Date";
  const handleClick = () => {
    if (!releasedGame) return;
    router.push(`/game/${data.id}`);
  };
  return (
    <div className="flex w-full overflow-hidden rounded-lg h-52 bg-slate-900 my-4 transition-all hover:bg-slate-800">
      <Image
        src={data.coverUrl}
        className={"object-cover" + (releasedGame ? " cursor-pointer" : "")}
        onClick={handleClick}
        alt="Game Cover"
        width={132}
        height={208}
      />
      <div className="flex flex-col w-full p-4">
        <div className="flex justify-between">
          <h1
            className={
              "text-2xl font-bold transition-all " +
              (releasedGame
                ? "hover:text-orange-500 cursor-pointer"
                : "hover:text-red-600")
            }
            onClick={handleClick}
          >
            {data.name}
          </h1>
          <div>
            <h2 className="text-l font-bold">{data.platformNames}</h2>
            <h3 className="text-l font-bold">
              {releasedGame ? data.releaseDate : "Lançamento não definido"}
            </h3>
          </div>
        </div>
        <p className="text-sm text-ellipsis overflow-hidden text-left">
          {data.summary}
        </p>
      </div>
    </div>
  );
}
