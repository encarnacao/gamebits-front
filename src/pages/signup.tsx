import Image from "next/image";
import gow from "../assets/gow.png";
import logo from "../assets/Logo.png";
import GradientImage from "@/components/gradient-image";
import TextInput from "@/components/text-input";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { userSingUp } from "@/api";
import { parseCookies } from "nookies";

export default function SingUp() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const router = useRouter();
  const token = parseCookies().token;
  if (token) router.push("/me");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "passwordConfirmation") {
      setPasswordConfirmation(value);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const checkPassword = () => {
    if (form.password === passwordConfirmation) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checkPassword()) {
      const request = await userSingUp(form);
      if (request) router.push("/signin");
    } else {
      alert("As senhas não coincidem");
    }
  };

  return (
    <main className="flex flex-col h-full overflow-hidden">
      <Link href="/">
        <Image
          priority={false}
          src={logo}
          className="absolute z-10 top-1 left-1 lg:w-1/6 md:w-1/3 w-1/2"
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
        lg:w-1/3
        md:w-1/2
        w-full
				justify-evenly
				flex flex-col
        `}
      >
        <h1 className="self-center text-2xl">Crie sua conta</h1>
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-white">Username</label>
            <TextInput
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Digite seu username"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white">Email</label>
            <TextInput
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Digite seu email"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white">Senha</label>
            <TextInput
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Digite sua senha"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white">Confirmar senha</label>
            <TextInput
              type="password"
              name="passwordConfirmation"
              value={passwordConfirmation}
              onChange={handleChange}
              match={checkPassword()}
              placeholder="Confirme sua senha"
            />
          </div>
          <button
            type="submit"
            className="bg-orange-700 text-white p-2 rounded-lg mt-5"
          >
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
