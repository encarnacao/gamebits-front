import Image from "next/image";
import gow from "../../assets/gow.png";
import logo from "../../assets/Logo.png";
import GradientImage from "@/components/gradient-image";
import TextInput from "@/components/text-input";
import Link from "next/link";
import { useState } from "react";

export default function SingUp() {

  return (
    <main className="flex flex-col max-h-screen overflow-hidden">
      <Link href="/">
        <Image
          priority={false}
          src={logo}
          className="absolute z-10 top-1 left-1 w-1/6"
          alt="Logo"
        />
      </Link>
      <GradientImage src={gow} alt="gow" />
      <div
        className={`
        fixed top-1/2 
        left-1/2 transform 
        -translate-x-1/2 
        -translate-y-1/2
      bg-slate-900/70 p-10
        rounded-lg 
        shadow-lg 
        w-1/3
				justify-evenly
				flex flex-col
        `}
      >
        <h1 className="self-center text-2xl">Crie sua conta</h1>
        <form className="flex flex-col gap-8">
				<div className="flex flex-col">
            <label className="text-white">Username</label>
            <TextInput type="text" placeholder="Digite seu username" />
          </div>
          <div className="flex flex-col">
            <label className="text-white">Email</label>
            <TextInput type="email" placeholder="Digite seu email" />
          </div>
          <div className="flex flex-col">
            <label className="text-white">Senha</label>
            <TextInput type="password" placeholder="Digite sua senha" />
          </div>
					<div className="flex flex-col">
            <label className="text-white">Confirmar senha</label>
            <TextInput type="password" placeholder="Confirme sua senha" />
          </div>
          <button className="bg-orange-700 text-white p-2 rounded-lg mt-5">
            Criar conta
          </button>
        </form>
        <h2 className="self-center text-white mt-10">
          Já possui uma conta?{" "}
          <Link href="/signin" className="text-blue-500">
            Entre aqui!
          </Link>
        </h2>
      </div>
    </main>
  );
}
