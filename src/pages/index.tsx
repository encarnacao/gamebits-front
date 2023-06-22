import Image from "next/image";
import HiFiRush from "../assets/hifirush.jpg";
import Header from "@/components/header";
import Link from "next/link";
import {
  RectangleStackIcon,
  TrophyIcon,
  QueueListIcon,
  StarIcon,
  UsersIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/20/solid";
import Card from "@/components/home-cards";
import React, { useContext, useEffect } from "react";
import { CardProps } from "@/types";
import { parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/auth-context";

const CardInfo: CardProps[] = [
  {
    icon: RectangleStackIcon,
    title: "Registrar sua biblioteca",
    description:
      "Adicione seus consoles e jogos na plataforma, mantendo controle da sua biblioteca atual.",
  },
  {
    icon: TrophyIcon,
    title: "Registrar suas conquistas",
    description:
      "Dê destaques aos jogos que você já zerou e compartilhe os jogos platinados com a comunidade.",
  },
  {
    icon: QueueListIcon,
    title: "Criar sua lista de desejos",
    description:
      "Adicione jogos que você deseja jogar no futuro e compartilhe com seus amigos.",
  },
  {
    icon: StarIcon,
    title: "Avaliar seus jogos",
    description: "Dê notas aos jogos que você jogou de uma a cinco estrelas.",
  },
  {
    icon: UsersIcon,
    title: "Conhecer novas pessoas",
    description:
      "Conheça pessoas com gostos parecidos com os seus e faça novas amizades. Siga seus amigos e veja o que eles estão jogando.",
  },
  {
    icon: ChatBubbleBottomCenterIcon,
    title: "Compartilhar suas opiniões",
    description:
      "Escreva reviews curtos sobre os jogos terminados e veja o que os outros tem a dizer sobre os jogos!",
  },
];

export default function Home() {
  const router = useRouter();
  const { signIn, checkSignIn } = useContext(AuthContext);
  useEffect(() => {
    checkSignIn();
    if (signIn) {
      router.push("/me");
    }
  }, [signIn]);

  return (
    <main className="flex min-h-screen flex-col items-center p-24 pt-0">
      <div className="relative">
        <Image
          priority={true}
          src={HiFiRush}
          alt="Hi-Fi Rush"
          className="max-w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent"></div>
        <div className="absolute inset-0 gradient-background"></div>
      </div>
      <Header className="absolute top-4" />
      <div className="w-1/2 flex flex-col items-center absolute top-[480px]">
        <h1 className="text-4xl serifed">Catalogue seus jogos.</h1>
        <h1 className="text-4xl serifed">Registre seu progresso.</h1>
        <h1 className="text-4xl serifed">Compartilhe suas opiniões.</h1>
        <Link
          className="flex justify-center bg-orange-500 hover:bg-orange-600 transition-all text-white font-bold py-2 px-4 rounded-full mt-10 min-w-fit w-1/4"
          href="/signup"
        >
          Crie sua conta
        </Link>
      </div>
      <div className="mx-auto mt-10">
        <h1 className="text-slate-400 text-3xl">Na GameBits você pode:</h1>
        <div className="grid grid-cols-3 gap-4">
          {CardInfo.map((card) => (
            <Card key={card.title} cardProps={card} />
          ))}
        </div>
      </div>
    </main>
  );
}
