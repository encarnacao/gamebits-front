import { GameBooleans, SingleGame } from "@/types";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getGameById } from "@/api";
import GameInfo from "@/components/game-info";
import { parseCookies } from "nookies";
import { CheckGameLibrary } from "@/helpers";
import GameButtons from "@/components/game-menu";
import { useState } from "react";
import Modal from "@/components/modal";
import { PencilIcon } from "@heroicons/react/20/solid";
import ReviewForm from "@/components/review-form";

export default function GamePage({
  gameData,
  booleans,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [showModal, setShowModal] = useState(false);
  const { token } = parseCookies();
  const libraryBooleans = booleans as GameBooleans;
  if (!gameData) {
    return (
      <div className="flex w-full items-center justify-center p-10 text-center h-screen bg-slate-950 mx-auto">
        Game not found
      </div>
    );
  }
  return (
    <main className="flex lg:w-4/5 flex-col justify-center items-center mx-auto">
      <GameInfo gameData={gameData} />
      {token ? (
        <>
          <GameButtons booleans={libraryBooleans} gameId={gameData.id} />
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <ReviewForm
                gameId={gameData.id}
                token={token}
                setModal={setShowModal}
              />
            </Modal>
          )}
          <button
            onClick={() => setShowModal(true)}
            className="fixed flex justify-center items-center group md:bottom-20 lg:right-48 p-2 bottom-24 right-4 transition-all bg-orange-500 rounded-full"
          >
            <p className="w-0 group-hover:w-24 overflow-hidden transition-all">
              Escrever Review
            </p>
            <PencilIcon className="h-10 w-10" />
          </button>
        </>
      ) : (
        <div className="flex w-3/5 items-center justify-center p-10 text-center bg-slate-950 mx-auto border-b-4 border-slate-600">
          Entre na sua conta para catalogar
        </div>
      )}
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
