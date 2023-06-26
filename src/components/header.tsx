"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import logo from "../assets/Logo.png";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { destroyCookie } from "nookies";
import { AuthContext } from "@/contexts/auth-context";

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
    name: "MEMBROS",
    path: "/members",
  },
];

const signedNav = [
  {
    name: "MEU PERFIL",
    path: "/me",
  },
  {
    name: "MEMBROS",
    path: "/members",
  },
  {
    name: "SAIR",
    path: "/signin",
  },
];

export default function Header({ className }: { className?: string }) {
  const [search, setSearch] = useState("");
  const { signIn, checkSignIn } = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();
  const navlink =
    "text-slate-100 font-bold hover:text-orange-500 transition-all cursor-pointer";

  useEffect(() => {
    checkSignIn();
  }, [signIn]);

  const navLinks = signIn ? signedNav : unsignedNav;

  const handleSubmit = () => {
    const encoded = encodeURIComponent(search);
    router.push(`/search?name=${encoded}`);
  };

  if (pathname === "/signin" || pathname == "/signup") return null;
  return (
    <header
      className={`w-full h-20 flex space ${className} justify-evenly items-center`}
    >
      <Image
        priority={true}
        src={logo}
        onClick={() => {
          router.push("/");
        }}
        className="w-1/6 cursor-pointer"
        alt="Logo"
      />
      <div className="relative flex">
        <nav className="flex space-x-4 mr-10 items-center gap-5 list-none">
          {navLinks.map((item) => (
            <li
              className={navlink}
              onClick={() => {
                if (item.name === "SAIR") {
                  destroyCookie(null, "token");
                  destroyCookie(null, "id");
                }
                router.push(item.path);
              }}
              key={item.name}
            >
              {item.name}
            </li>
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
