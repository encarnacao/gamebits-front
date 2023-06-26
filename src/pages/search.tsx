import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import GameCard from "@/components/game-card";
import { GameData } from "@/types";
import { searchGames } from "@/api";

export default function Search({
  data,
  query,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className="flex md:w-4/5 w-full flex-col items-center justify-center flex-1 md:p-10 p-2 text-center md:mt-32 mt-1 bg-slate-950 md:bg-gradient-to-b from-black via-slate-900 to-black mx-auto">
      <h1 className="md:text-4xl text-2xl text-slate-200 serifed mb-4 self-start">
        Busca por {query.name}
      </h1>
      {data.map((game) => (
        <GameCard data={game} key={game.id} />
      ))}
      {data.length === 0 && (
        <h1 className="md:text-4xl text-4xl w-full h-screen fixed top-1/2 text-slate-200 serifed mt-20">
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
