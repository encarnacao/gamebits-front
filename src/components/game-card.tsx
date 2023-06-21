import { GameData } from "@/pages/search";
import Image from "next/image";

export default function GameCard({ data }: { data: GameData }) {
  const summaryClassNames = `text-sm text-white overflow-hidden`;
  return (
    <div className="flex w-full overflow-hidden rounded-lg h-52 bg-slate-900 my-4">
      <Image src={data.coverUrl} className="object-cover" alt="Game Cover" width={132} height={208} />
      <div className="flex flex-col w-full p-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-white">{data.name}</h1>
          <div>
            <h2 className="text-l font-bold text-white">
              {data.platformNames}
            </h2>
            <h3 className="text-l font-bold text-white">{data.releaseDate}</h3>
          </div>
        </div>
        <p className={summaryClassNames}>{data.summary}</p>
      </div>
    </div>
  );
}
