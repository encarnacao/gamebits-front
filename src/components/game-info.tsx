import { SingleGame } from "@/types";
import dayjs from "dayjs";

export default function GameInfo({ gameData }: { gameData: SingleGame }) {
  return (
    <div className="flex w-3/5 items-center justify-between flex-1 p-10 text-center mt-52 bg-slate-950 mx-auto border-b-4 border-slate-600">
      <div className="flex items-center">
        <img
          src={gameData.coverUrl}
          className="w-32 absolute top-40 border-t-4 border-l-4 border-orange-500"
          alt="capa"
        />
        <div className="ml-40 text-left">
          <h1 className="text-4xl text-slate-200 serifed ml-8">
            {gameData.name}
          </h1>
          <h1 className="text-xl text-slate-200 serifed ml-8">
            Plataformas: {gameData.platforms}
          </h1>
        </div>
      </div>
      <div>
        <div className="text-right">
          <h2 className="text-xl text-slate-200 serifed mb-4">
            Lançamento:{" "}
            {dayjs(gameData.originalReleaseDate).format("DD/MM/YYYY")}
          </h2>
          <h2 className="text-xl text-slate-200 serifed mb-4">
            Gêneros: {gameData.genres}
          </h2>
        </div>
      </div>
    </div>
  );
}
