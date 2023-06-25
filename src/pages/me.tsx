import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { LibraryEntry, UserData } from "@/types";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { useState } from "react";
import { getMe, getUserLibrary, getUserWishlist } from "@/api";
import UserInfo from "@/components/user-info";
import UserMenu from "@/components/user-menu";
import LibraryInfo from "@/components/library-info";

export default function MePage({
  userData,
  gamesData,
  wishlistData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [selected, setSelected] = useState(0);
  const cards = [
    <LibraryInfo library={gamesData} />,
    <LibraryInfo library={wishlistData} />,
    <>Following</>,
    <>Followers</>,
    <>Reviews</>,
  ];
  return (
    <main className="flex flex-col">
      <UserInfo userData={userData} />
      <UserMenu selected={selected} setSelected={setSelected} />
      <div className="flex flex-col items-center justify-center">
        {cards[selected]}
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<{
  userData: UserData;
  gamesData: LibraryEntry[];
  wishlistData: LibraryEntry[];
}> = async (context) => {
  try {
    const cookies = parseCookies(context);
    const token = cookies.token;
    const userData = await getMe(token);
    const gamesData = await getUserLibrary(userData.id);
    const wishlistData = await getUserWishlist(userData.id);
    setCookie(context, "id", JSON.stringify(userData.id), { path: "/" });
    return {
      props: {
        userData,
        gamesData,
        wishlistData,
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
