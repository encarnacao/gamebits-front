import { UserData } from "@/types";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import { followUser, unfollowUser } from "@/api";

export default function UserInfo({ userData }: { userData: UserData }) {
  const pathname = usePathname();
  const router = useRouter();
  const { id, token } = parseCookies();
  const showButton = pathname !== "/me" && userData.id !== Number(id) && token;
  const refreshData = () => {
    router.replace(router.asPath);
  };
  const handleFollow = async () => {
    let request: boolean;
    if (userData.followedByUser) {
      request = await unfollowUser(userData.id, token);
    } else {
      request = await followUser(userData.id, token);
    }
    if (request) {
      refreshData();
    } else {
      alert("Ocorreu um erro enviar a solicitação.");
    }
  };
  return (
    <div className="flex w-3/5 items-center justify-between flex-1 p-10 text-center mt-32 bg-slate-950 mx-auto border-b-4 border-slate-600">
      <div className="flex items-center">
        <Image
          src={userData.imageUrl}
          width={150}
          height={150}
          className="rounded-full"
          alt="avatar"
        />
        <h1 className="text-4xl text-slate-200 serifed ml-8">
          {userData.username}
        </h1>
        <button
          className={`py-2 px-6 bg-orange-500 hover:bg-orange-700 rounded-lg ml-10  transition-all ${
            showButton ? "" : "hidden"
          }`}
          onClick={handleFollow}
        >
          {userData.followedByUser ? "Deixar de seguir" : "Seguir"}
        </button>
      </div>
      <div>
        <div>
          <h2 className="text-2xl text-slate-200 serifed mb-4">
            seguidores: {userData.followers}
          </h2>
          <h2 className="text-2xl text-slate-200 serifed mb-4">
            seguindo: {userData.following}
          </h2>
        </div>
      </div>
    </div>
  );
}
