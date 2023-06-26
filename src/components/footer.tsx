import { AuthContext } from "@/contexts/auth-context";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import {
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  UsersIcon,
  UserCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";

const unsignedNav = [
  {
    name: "ENTRAR",
    icon: ArrowRightOnRectangleIcon,
    path: "/signin",
  },
  {
    name: "SIGN UP",
    icon: CheckCircleIcon,
    path: "/signup",
  },
  {
    name: "MEMBROS",
    icon: UsersIcon,
    path: "/members",
  },
];

const signedNav = [
  {
    name: "MEU PERFIL",
    icon: UserCircleIcon,
    path: "/me",
  },
  {
    name: "MEMBROS",
    icon: UsersIcon,
    path: "/members",
  },
  {
    name: "SAIR",
    icon: ArrowLeftOnRectangleIcon,
    path: "/signin",
  },
];

export default function Footer() {
  const { signIn, checkSignIn } = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    checkSignIn();
  }, [signIn]);

  const navLinks = signIn ? signedNav : unsignedNav;

  if (pathname === "/signin" || pathname == "/signup") return null;
  return (
    <footer className="md:hidden fixed bottom-0 grid-cols-3 grid h-20 z-10 w-full bg-slate-950">
      {navLinks.map((link) => (
        <div
          key={link.name}
          onClick={() => {
            router.push(link.path);
          }}
          className="mx-auto flex flex-col justify-center items-center"
        >
          <link.icon className="h-10 w-10 text-slate-100" />
          <p className="text-slate-100 text-xs">{link.name}</p>
        </div>
      ))}
    </footer>
  );
}
