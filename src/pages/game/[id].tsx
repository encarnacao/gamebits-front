import { GameBooleans, SingleGame } from "@/types";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getGameById } from "@/api";
import GameInfo from "@/components/game-info";
import { parseCookies } from "nookies";
import { CheckGameLibrary } from "@/helpers";

export default function GamePage({
  gameData,
  booleans,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!gameData) {
    return (
      <div className="flex w-3/5 items-center justify-between p-10 text-center mt-40 bg-slate-950 mx-auto border-b-4 border-slate-600">
        Game not found
      </div>
    );
  }
  return (
    <main className="flex flex-col justify-center items-center">
      <GameInfo gameData={gameData} />
      {JSON.stringify(booleans)}
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<{
  gameData: SingleGame | null;
  booleans: GameBooleans | null;
}> = async (context) => {
  const params = context.params;
  const { id: userId } = parseCookies(context);
  const id = params?.id as string;
  const gameData = await getGameById(id);
  const booleans = gameData
    ? await CheckGameLibrary(Number(userId), gameData.id)
    : null;
  return {
    props: {
      gameData,
      booleans,
    },
  };
};
