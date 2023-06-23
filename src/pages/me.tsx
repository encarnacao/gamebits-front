import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { UserData } from "@/types";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import Image from "next/image";
import { useState } from "react";
import { getMe } from "@/api";

export default function MePage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [selected, setSelected] = useState(0);
  const menu = ["Jogos", "Wishlist", "Seguindo", "Seguidores", "Review"];
  return (
    <main className="flex flex-col">
      <div className="flex w-3/5 items-center justify-between flex-1 p-10 text-center mt-32 bg-slate-950 mx-auto border-b-4 border-slate-600">
        <div className="flex items-center">
          <Image
            src={data.imageUrl}
            width={150}
            height={150}
            className="rounded-full"
            alt="avatar"
          />
          <h1 className="text-4xl text-slate-200 serifed ml-8">
            {data.username}
          </h1>
        </div>
        <div>
          <div>
            <h2 className="text-2xl text-slate-200 serifed mb-4">
              seguidores: {data.followers}
            </h2>
            <h2 className="text-2xl text-slate-200 serifed mb-4">
              seguindo: {data.following}
            </h2>
          </div>
        </div>
      </div>
      <div className="flex w-3/5 flex-1 p-2 text-center bg-slate-950 mx-auto">
        <nav className="flex w-full justify-evenly">
          {menu.map((item, index) => (
            <h1
              className={`text-2xl serifed transition-all mb-4 cursor-pointer ${
                selected === index
                  ? "text-orange-500"
                  : "text-slate-200 hover:text-orange-300"
              }`}
              onClick={() => setSelected(index)}
              key={item}
            >
              {item}
            </h1>
          ))}
        </nav>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data: UserData;
}> = async (context) => {
  try {
    const cookies = parseCookies(context);
    const token = cookies.token;
    const data = await getMe(token);
    setCookie(context, "id", JSON.stringify(data.id), { path: "/" });
    return {
      props: {
        data,
      },
    };
  } catch {
    destroyCookie(null, "token");
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
};
