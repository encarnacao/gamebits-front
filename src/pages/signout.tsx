import { useRouter } from "next/navigation";
import { destroyCookie } from "nookies";

export default function SignOut() {
  const router = useRouter();
  console.log("Sign Out");
  destroyCookie(null, "token");
  router.push("/");
  return <></>;
}
