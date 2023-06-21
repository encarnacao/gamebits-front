import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import axios from "axios";
import GameCard from "@/components/game-card";

export type GameData = {
  id: number;
  coverUrl: string;
  name: string;
  releaseDate: string;
  platformNames: string;
  summary: string;
};

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
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data: GameData[];
  query: any;
}> = async (context) => {
  const { query } = context;
  const request = await axios.post(`/games?name=${query.name}`, {});
  const MOCKGAMEDATA = request.data;
  return {
    props: {
      data: MOCKGAMEDATA,
      query,
    },
  };
};
