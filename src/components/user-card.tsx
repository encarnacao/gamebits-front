import { UserData } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function UserCard({ user }: { user: Partial<UserData> }) {
  const router = useRouter();
  const hasFollowers = user.followers !== undefined;
  const handleClick = () => {
    router.push(`/u/${user.username}`);
  };
  return (
    <div
      onClick={handleClick}
      className="flex w-11/12 justify-between p-4 mx-auto group overflow-hidden rounded-lg h-32 bg-slate-900 my-2 transition-all hover:bg-slate-800 cursor-pointer"
    >
      <div className="flex items-center justify-center">
        <Image
          src={user.imageUrl as string}
          width={100}
          height={100}
          className="rounded-full mr-4"
          alt="avatar"
        />
        <h1 className="text-2xl font-bold group-hover:text-orange-500 transition-all duration-300 serifed">
          {user.username}
        </h1>
      </div>
      <div
        className={`${
          hasFollowers ? "flex flex-col justify-center items-end" : "hidden"
        }`}
      >
        <p>Seguidores: {user.followers}</p>
        <p>Seguindo: {user.following}</p>
      </div>
    </div>
  );
}
