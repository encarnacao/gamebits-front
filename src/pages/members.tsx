import { getAllUsers, searchUser } from "@/api";
import TextInput from "@/components/text-input";
import UserCard from "@/components/user-card";
import { UserData } from "@/types";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function MembersPage({
  users,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const encoded = encodeURIComponent(query);
    router.push(`/members?name=${encoded}`);
  };

  return (
    <main className="flex flex-col mx-auto mt-32 w-3/5">
      <div className="flex w-full items-center justify-between flex-1 p-10 text-center bg-slate-950 mx-auto border-t-4 border-slate-600">
        <h1 className="text-4xl serifed">Membros</h1>
        <form onSubmit={handleSubmit} className="flex">
          <TextInput
            name="search"
            value={query}
            onChange={onChange}
            placeholder="Pesquisar"
            type="text"
          />
          <button type="submit" className="bg-orange-500 p-2 rounded-md ml-2">
            Pesquisar
          </button>
        </form>
      </div>
      <div className="flex flex-col w-full items-center justify-between flex-1 p-10 text-center bg-slate-950 mx-auto mt-2">
        {users.length === 0 ? (
          <h1>Nenhum resultado encontrado</h1>
        ) : (
          users.map((user) => <UserCard key={user.id.toString()} user={user} />)
        )}
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<{
  users: UserData[];
}> = async (context) => {
  const { name } = context.query;
  let users;
  if (name) {
    users = await searchUser(name as string);
  } else {
    users = await getAllUsers();
  }
  return {
    props: {
      users,
    },
  };
};
