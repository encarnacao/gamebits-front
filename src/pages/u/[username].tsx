import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { FollowData, LibraryEntry, UserData } from "@/types";
import { parseCookies } from "nookies";
import {
  getFollowers,
  getFollowing,
  getUserByUsername,
  getUserLibrary,
  getUserWishlist,
} from "@/api";
import { ParsedUrlQuery } from "querystring";
import UserProfile from "@/components/user-profile";

export default function UserPage({
  userData,
  gamesData,
  wishlistData,
  followersData,
  followingData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const profileProps = {
    userData,
    gamesData,
    wishlistData,
    followersData,
    followingData,
  };
  return (
    <main>
      <UserProfile {...profileProps} />
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
