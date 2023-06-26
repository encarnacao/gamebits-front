import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { FollowData, LibraryEntry, UserData } from "@/types";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import {
  getFollowers,
  getFollowing,
  getMe,
  getUserLibrary,
  getUserWishlist,
} from "@/api";
import UserProfile from "@/components/user-profile";

export default function MePage({
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
