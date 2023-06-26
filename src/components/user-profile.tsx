import { FollowData, LibraryEntry, ReviewProps, UserData, UserReviews } from "@/types";
import { useState } from "react";
import LibraryInfo from "./library-info";
import Follows from "./follows";
import UserInfo from "./user-info";
import UserMenu from "./user-menu";
import UserReviewsInfo from "./user-reviews";

export default function UserProfile({
  userData,
  gamesData,
  wishlistData,
  followersData,
  followingData,
  reviews,
}: {
  userData: UserData;
  gamesData: LibraryEntry[];
  wishlistData: LibraryEntry[];
  followersData: FollowData[];
  followingData: FollowData[];
  reviews: (UserReviews & ReviewProps)[];
}) {
  const [selected, setSelected] = useState(0);
  const cards = [
    <LibraryInfo key="game" library={gamesData} />,
    <LibraryInfo key="wishlist" library={wishlistData} />,
    <Follows key="following" followData={followingData} />,
    <Follows key="followers" followData={followersData} />,
    <UserReviewsInfo key="reviews" reviews={reviews} />,
  ];
  return (
    <main className="flex flex-col lg:w-4/5 mx-auto">
      <UserInfo userData={userData} />
      <UserMenu selected={selected} setSelected={setSelected} />
      <div className="flex flex-col items-center justify-center">
        {cards[selected]}
      </div>
    </main>
  );
}
