import { postReview } from "@/api";
import { StarIcon } from "@heroicons/react/20/solid";
import { Rating } from "@mui/material";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";

export default function ReviewForm({
  gameId,
  token,
  setModal,
}: {
  gameId: number;
  token: string;
  setModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [value, setValue] = useState<number | null>(null);
  const [_hover, setHover] = useState(-1);
  const [text, setText] = useState<string>("");
  const invalidBody = value === null || text.length === 0;
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  }

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (invalidBody) {
      alert("Preencha todos os campos!");
      return;
    }
    const body = {
      gameId,
      rating: value,
      text,
    };
    const request = await postReview(token, body);
    if (request) {
      setModal(false);
      refreshData();
    }
  };

  return (
    <main>
      <h1 className="absolute top-5 serifed text-2xl">
        Escreva sua Review! - {text.length}/1000
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 items-center"
      >
        <textarea
          className={`
            bg-slate-800 
            outline-none 
            text-white p-2 
            rounded-none 
            border-b 
            border-orange-400 
            placeholder-slate-600
            w-full
            h-96
          `}
          onChange={handleTextChange}
          placeholder="Escreva seu texto aqui!"
          maxLength={1000}
          value={text}
        >
          {text}
        </textarea>
        <div className="flex gap-5 items-center">
          <h1>Dê sua nota: </h1>
          <Rating
            name="hover-feedback"
            value={value}
            precision={0.5}
            onChange={(_event, newValue) => {
              setValue(newValue);
              console.log(newValue);
            }}
            onChangeActive={(_event, newHover) => {
              setHover(newHover);
            }}
            size="large"
            emptyIcon={<StarIcon className="h-7" fontSize="inherit" />}
          />
        </div>
        <button
          type="submit"
          className="bg-orange-500 p-2 rounded-md self-center"
        >
          Enviar
        </button>
      </form>
    </main>
  );
}
