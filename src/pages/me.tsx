import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { FollowData, LibraryEntry, UserData } from "@/types";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { useState } from "react";
import {
  getFollowers,
  getFollowing,
  getMe,
  getUserLibrary,
  getUserWishlist,
} from "@/api";
import UserInfo from "@/components/user-info";
import UserMenu from "@/components/user-menu";
import LibraryInfo from "@/components/library-info";

export default function MePage({
  userData,
  gamesData,
  wishlistData,
  followersData,
  followingData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [selected, setSelected] = useState(0);
  const cards = [
    <LibraryInfo key="games" library={gamesData} />,
    <LibraryInfo key="wishlist" library={wishlistData} />,
    <>Following</>,
    <>Followers</>,
    <>Não implementado ainda</>,
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
  followersData: FollowData[];
  followingData: FollowData[];
}> = async (context) => {
  try {
    const cookies = parseCookies(context);
    const token = cookies.token;
    const userData = await getMe(token);
    const gamesData = await getUserLibrary(userData.id);
    const wishlistData = await getUserWishlist(userData.id);
    const followersData = await getFollowers(userData.id);
    const followingData = await getFollowing(userData.id);
    setCookie(context, "id", JSON.stringify(userData.id), { path: "/" });
    return {
      props: {
        userData,
        gamesData,
        wishlistData,
        followersData,
        followingData,
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
