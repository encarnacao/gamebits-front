import { FollowData, LibraryEntry, UserData } from "@/types";
import { useState } from "react";
import LibraryInfo from "./library-info";
import Follows from "./follows";
import UserInfo from "./user-info";
import UserMenu from "./user-menu";

export default function UserProfile({
  userData,
  gamesData,
  wishlistData,
  followersData,
  followingData,
}: {
  userData: UserData;
  gamesData: LibraryEntry[];
  wishlistData: LibraryEntry[];
  followersData: FollowData[];
  followingData: FollowData[];
}) {
  const [selected, setSelected] = useState(0);
  const cards = [
    <LibraryInfo key="game" library={gamesData} />,
    <LibraryInfo key="wishlist" library={wishlistData} />,
    <Follows key="following" followData={followingData} />,
    <Follows key="followers" followData={followersData} />,
    <>Não implementado ainda</>,
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
