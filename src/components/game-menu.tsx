import { addLibraryEntry, addWishlistEntry } from "@/api";
import { GameBooleans, LibraryButtonProps } from "@/types";
import {
  RectangleStackIcon,
  TrophyIcon,
  QueueListIcon,
  ClockIcon,
  FlagIcon,
} from "@heroicons/react/20/solid";
import LibraryButton from "./library-button";

export default function GameButtons({
  booleans,
  gameId,
}: {
  booleans: GameBooleans;
  gameId: number;
}) {
  const BUTTONS: LibraryButtonProps[] = [
    {
      type: "library",
      icon: RectangleStackIcon,
      boolean: booleans.inLibrary && !booleans.inWishlist,
      trueText: "Remover da biblioteca",
      falseText: "Adicionar à biblioteca",
      disabled: booleans.inWishlist,
      function: addLibraryEntry,
    },
    {
      type: "status",
      status: "finished",
      icon: FlagIcon,
      boolean: booleans.finished,
      trueText: "Desmarcar como terminado",
      falseText: "Marcar como terminado",
      disabled: !booleans.inLibrary || booleans.inWishlist || booleans.platinum,
      function: async () => {
        return false;
      },
    },
    {
      type: "status",
      status: "platinum",
      icon: TrophyIcon,
      boolean: booleans.platinum,
      trueText: "Remover platina",
      falseText: "Adicionar platina",
      disabled:
        !booleans.inLibrary || booleans.inWishlist || !booleans.finished,
      function: async () => {
        return false;
      },
    },
    {
      type: "time",
      status: "completion_time",
      icon: ClockIcon,
      boolean: Boolean(booleans.completionTime),
      trueText: "Alterar tempo de jogo",
      falseText: "Adicionar tempo de jogo",
      disabled: !booleans.finished,
      function: async () => {
        return false;
      },
    },
    {
      type: "library",
      icon: QueueListIcon,
      boolean: booleans.inWishlist,
      trueText: "Remover da lista de desejos",
      falseText: "Adicionar à lista de desejos",
      disabled: booleans.inLibrary && !booleans.inWishlist,
      function: addWishlistEntry,
    },
  ];

  return (
    <div className="flex w-full md:p-10 p-5 text-center bg-slate-950 mx-auto border-b-4 border-slate-900">
      <div className="md:flex w-full gap-5 grid grid-cols-2 md:items-center justify-between mx-auto">
      {BUTTONS.map((button, index) => (
        <LibraryButton props={button} gameId={gameId} key={index} />
      ))}
      </div>
    </div>
  );
}
