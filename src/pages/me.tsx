import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import {
  FollowData,
  LibraryEntry,
  ReviewProps,
  UserData,
  UserReviews,
} from "@/types";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import {
  getFollowers,
  getFollowing,
  getMe,
  getUserLibrary,
  getUserReviews,
  getUserWishlist,
} from "@/api";
import UserProfile from "@/components/user-profile";
import { checkReviewProps } from "@/helpers";

export default function MePage({
  userData,
  gamesData,
  wishlistData,
  followersData,
  followingData,
  reviews,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const profileProps = {
    userData,
    gamesData,
    wishlistData,
    followersData,
    followingData,
    reviews,
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
  reviews: (UserReviews & ReviewProps)[];
}> = async (context) => {
  try {
    const { token } = parseCookies(context);
    const userData = await getMe(token);
    const gamesData = await getUserLibrary(userData.id);
    const wishlistData = await getUserWishlist(userData.id);
    const followersData = await getFollowers(userData.id);
    const followingData = await getFollowing(userData.id);
    const reviewData = await getUserReviews(userData.id);
    const reviews = checkReviewProps(reviewData, userData.id) as (UserReviews &
      ReviewProps)[];
    setCookie(context, "id", JSON.stringify(userData.id), { path: "/" });
    return {
      props: {
        userData,
        gamesData,
        wishlistData,
        followersData,
        followingData,
        reviews,
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
