"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import logo from "../assets/Logo.png";
import Link from "next/link";

export default function Header({ className }: { className?: string }) {
  return (
    <header
      className={`w-full h-20 flex space ${className} justify-evenly items-center`}
    >
      <Image priority={false} src={logo} className="w-1/6" alt="Logo" />
      <div className="relative flex">
      <nav className="flex space-x-4 mr-10 items-center gap-5">
        <Link className="text-slate-100 font-bold hover:text-slate-200" href="/signin">
          ENTRAR
        </Link>
        <Link className="text-slate-100 font-bold hover:text-slate-200" href="/signup">
          SIGN UP
        </Link>
        <Link className="text-slate-100 font-bold hover:text-slate-200" href="#">
          JOGOS
        </Link>
        <Link className="text-slate-100 font-bold hover:text-slate-200" href="#">
          MEMBROS
        </Link>
      </nav>
        <input
          className="bg-slate-800/70 p-4 h-7 pr-12 pl-4 outline-none rounded-full placeholder-slate-600"
          type="text"
          placeholder="Search"
        />
        <div className="absolute inset-y-0 right-5 flex items-center pl-4">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </header>
  );
}
