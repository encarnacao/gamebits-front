import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

export default function UserMenu({
  selected,
  setSelected,
}: {
  selected: number;
  setSelected: Dispatch<SetStateAction<number>>;
}) {
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };
  const menu = ["Jogos", "Wishlist", "Seguindo", "Seguidores", "Reviews"];
  return (
    <div className="flex w-full flex-1 p-2 text-center bg rounded-b-xl bg-slate-950 mx-auto">
      <nav className="flex w-full justify-evenly list-none">
        {menu.map((item, index) => (
          <li
            className={`md:text-2xl text-lg serifed transition-all mb-4 cursor-pointer ${
              selected === index
                ? "text-orange-500"
                : "text-slate-200 hover:text-orange-300"
            }`}
            onClick={() => {
              setSelected(index);
              refreshData();
            }}
            key={item}
          >
            {item}
          </li>
        ))}
      </nav>
    </div>
  );
}
