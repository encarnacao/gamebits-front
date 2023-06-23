import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import GameCard from "@/components/game-card";
import { GameData } from "@/types";
import { searchGames } from "@/api";

export default function Search({
  data,
  query,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className="flex w-3/5 flex-col items-center justify-center flex-1 p-10 text-center mt-32 bg-slate-950 mx-auto">
      <h1 className="text-4xl text-slate-200 serifed mb-4 self-start">
        Busca por {query.name}
      </h1>
      {data.map((game) => (
        <GameCard data={game} key={game.id} />
      ))}
      {data.length === 0 && (
        <h1 className="text-4xl text-slate-200 serifed mt-20">
          Nenhum jogo encontrado
        </h1>
      )}
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data: GameData[];
  query: any;
}> = async (context) => {
  const { query } = context;
  const data = await searchGames(query.name as string);
  return {
    props: {
      data,
      query,
    },
  };
};
