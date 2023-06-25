import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { FollowData, LibraryEntry, UserData } from "@/types";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { useState } from "react";
import {
  getFollowers,
  getFollowing,
  getMe,
  getUserByUsername,
  getUserLibrary,
  getUserWishlist,
} from "@/api";
import UserInfo from "@/components/user-info";
import UserMenu from "@/components/user-menu";
import LibraryInfo from "@/components/library-info";
import { ParsedUrlQuery } from "querystring";
import Follows from "@/components/follows";

export default function UserPage({
  userData,
  gamesData,
  wishlistData,
  followersData,
  followingData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [selected, setSelected] = useState(0);
  const cards = [
    <LibraryInfo key="game" library={gamesData} />,
    <LibraryInfo key="wishlist" library={wishlistData} />,
    <Follows key="following" followData={followingData}/>,
    <Follows key="followers" followData={followersData}/>,
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
  const { token } = parseCookies(context);
  const params = context.params as ParsedUrlQuery;
  const userData = await getUserByUsername(params.username as string, token);
  if (!userData) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
  const gamesData = await getUserLibrary(userData.id);
  const wishlistData = await getUserWishlist(userData.id);
  const followersData = await getFollowers(userData.id);
  const followingData = await getFollowing(userData.id);
  return {
    props: {
      userData,
      gamesData,
      wishlistData,
      followersData,
      followingData,
    },
  };
};
