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
    <div className="flex w-full items-center justify-between flex-1 md:p-10 p-2 text-center md:mt-32 mt-4 transition-all  bg-gradient-to-b from-black to-slate-950 mx-auto border-b-4 border-slate-900">
      <div className="flex items-center">
        <Image
          src={userData.imageUrl}
          width={150}
          height={150}
          className="rounded-full w-1/3 md:w-auto"
          alt="avatar"
        />
        <div className="md:flex">
          <h1 className="md:text-4xl text-xl text-slate-200 serifed md:ml-8">
            {userData.username}
          </h1>
          <button
            className={`md:py-2 md:px-6 text-xs p-1 bg-orange-500 hover:bg-orange-700 rounded-lg md:ml-10  transition-all ${
              showButton ? "" : "hidden"
            }`}
            onClick={handleFollow}
          >
            {userData.followedByUser ? "Deixar de seguir" : "Seguir"}
          </button>
        </div>
      </div>
      <div>
        <div>
          <h2 className="md:text-2xl text-sm text-slate-200 serifed mb-4">
            seguidores: {userData.followers}
          </h2>
          <h2 className="md:text-2xl text-sm text-slate-200 serifed mb-4">
            seguindo: {userData.following}
          </h2>
        </div>
      </div>
    </div>
  );
}
