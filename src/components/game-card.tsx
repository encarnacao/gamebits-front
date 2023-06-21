import { GameData } from "@/pages/search";
import Image from "next/image";

export default function GameCard({ data }: { data: GameData }) {
  return (
    <div className="flex w-full overflow-hidden rounded-lg h-52 bg-slate-900 my-4 transition-all hover:bg-slate-800">
      <Image
        src={data.coverUrl}
        className="object-cover"
        alt="Game Cover"
        width={132}
        height={208}
      />
      <div className="flex flex-col w-full p-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">{data.name}</h1>
          <div>
            <h2 className="text-l font-bold">{data.platformNames}</h2>
            <h3 className="text-l font-bold">
              {data.releaseDate === "Invalid Date"
                ? "Não Lançado"
                : data.releaseDate}
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
