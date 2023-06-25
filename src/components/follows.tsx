import { FollowData } from "@/types";
import UserCard from "./user-card";

export default function Follows({ followData }: { followData: FollowData[] }) {
  return (
    <main className="flex flex-col bg w-3/5 bg-slate-950 mx-auto mt-2">
      {followData.map((user) => (
        <UserCard user={user} key={`${user.id}`} />
      ))}
    </main>
  );
}
