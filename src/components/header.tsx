"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import logo from "../assets/Logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Header({ className }: { className?: string }) {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const navlink =
    "text-slate-100 font-bold hover:text-orange-500 transition-all";
  const pathname = usePathname();
  const unsignedNav = [
    {
      name: "ENTRAR",
      path: "/signin",
    },
    {
      name: "SIGN UP",
      path: "/signup",
    },
    {
      name: "JOGOS",
      path: "#",
    },
    {
      name: "MEMBROS",
      path: "#",
    },
  ];

  const handleSubmit = () => {
    router.push({
      pathname: "/search",
      query: { name: search },
    });
  };

  if (pathname === "/signin" || pathname == "/signup") return null;
  return (
    <header
      className={`w-full h-20 flex space ${className} justify-evenly items-center`}
    >
      <Image priority={false} src={logo} className="w-1/6" alt="Logo" />
      <div className="relative flex">
        <nav className="flex space-x-4 mr-10 items-center gap-5">
          {unsignedNav.map((item) => (
            <Link className={navlink} href={item.path} key={item.name}>
              {item.name}
            </Link>
          ))}
        </nav>
        <input
          className="bg-slate-800/70 p-4 h-7 pr-12 pl-4 outline-none rounded-full placeholder-slate-600"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          placeholder="Buscar"
        />
        <div className="absolute inset-y-0 right-5 flex items-center pl-4 cursor-pointer">
          <MagnifyingGlassIcon
            onClick={handleSubmit}
            className="h-5 w-5 text-gray-400"
          />
        </div>
      </div>
    </header>
  );
}
