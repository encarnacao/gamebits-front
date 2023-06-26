import { SingleGame } from "@/types";
import dayjs from "dayjs";

export default function GameInfo({ gameData }: { gameData: SingleGame }) {

  return (
    <div className="flex md:flex-row flex-col w-full items-center justify-between md:p-10 text-center md:mt-52 bg-slate-950 mx-auto border-b-4 border-slate-900">
      <div className="flex md:flex-row flex-col items-center w-full">
        <img
          src={gameData.coverUrl}
          className="md:w-32 w-48 md:absolute md:top-40 border-t-4 border-l-4 border-orange-500"
          alt="capa"
        />
        <div className="md:ml-40 text-left w-full">
          <h1 className="md:text-4xl md:mt-0 mt-4 text-2xl text-slate-200 serifed ml-8">
            {gameData.name}
          </h1>
          <h1 className="md:text-xl text-slate-200 serifed ml-8">
            Plataformas: {gameData.platforms}
          </h1>
        </div>
      </div>
      <div className="w-full">
        <div className="text-right w-full">
          <h2 className="md:text-xl text-slate-200 serifed mb-4">
            Lançamento:{" "}
            {dayjs(gameData.originalReleaseDate).format("DD/MM/YYYY")}
          </h2>
          <h2 className="md:text-xl text-slate-200 serifed mb-4">
            Gêneros: {gameData.genres}
          </h2>
        </div>
      </div>
    </div>
  );
}
