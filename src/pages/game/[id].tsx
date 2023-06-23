import { useRouter } from "next/router";
import { SingleGame } from "@/types";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import axios from "axios";
import dayjs from "dayjs";

export default function GamePage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  if (!data) {
    return <div>Game not found</div>;
  }
  return (
    <main>
      <div className="flex w-3/5 items-center justify-between flex-1 p-10 text-center mt-52 bg-slate-950 mx-auto border-b-4 border-slate-600">
        <div className="flex items-center">
        <img src={data.cover_url} className="w-32 absolute top-40 border-t-4 border-l-4 border-orange-500" alt="capa" />
          <div className="ml-40 text-left">
            <h1 className="text-4xl text-slate-200 serifed ml-8">
              {data.name}
            </h1>
            <h1 className="text-xl text-slate-200 serifed ml-8">
              Plataformas: {data.platforms}
            </h1>
          </div>
        </div>
        <div>
          <div className="text-right">
            <h2 className="text-xl text-slate-200 serifed mb-4">
              Lançamento:{" "}
              {dayjs(data.original_release_date).format("DD/MM/YYYY")}
            </h2>
            <h2 className="text-xl text-slate-200 serifed mb-4">
              Gêneros: {data.genres}
            </h2>
          </div>
        </div>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data: SingleGame | null;
}> = async (context) => {
  try {
    const params = context.params;
    const id = params?.id;
    const request = await axios.get(`/games/${id}`);
    const data = request.data;
    return {
      props: {
        data,
      },
    };
  } catch {
    return {
      props: {
        data: null,
      },
    };
  }
};
