import { FollowData } from "@/types";
import UserCard from "./user-card";

export default function Follows({ followData }: { followData: FollowData[] }) {
  return (
    <main className="flex flex-col w-full rounded-xl bg-gradient-to-t from-black to-slate-950 mx-auto mt-2">
      {followData.map((user) => (
        <UserCard user={user} key={`${user.id}`} />
      ))}
    </main>
  );
}
