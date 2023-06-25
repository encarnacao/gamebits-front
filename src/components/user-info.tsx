import { UserData } from "@/types";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function UserInfo({ userData }: { userData: UserData }) {
  const pathname = usePathname();
  const showButton = pathname !== "/me";
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
          className={`p-2 w-24 bg-orange-500 hover:bg-orange-700 rounded-lg ml-10  transition-all ${
            showButton ? "" : "hidden"
          }`}
        >
          Seguir
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
