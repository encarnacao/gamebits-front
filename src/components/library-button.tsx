import { removeLibraryEntry, updateLibraryEntry } from "@/api";
import { LibraryButtonProps } from "@/types";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { ChangeEvent, ReactEventHandler, useState } from "react";

export default function LibraryButton({
  props,
  gameId,
}: {
  props: LibraryButtonProps;
  gameId: number;
}) {
  const [time, setTime] = useState("0");
  const router = useRouter();
  const { token } = parseCookies();
  const refreshData = () => {
    router.replace(router.asPath);
  };
  const checkSuccess = (response: boolean) => {
    if (response) {
      refreshData();
    } else {
      alert("Erro ao atualizar a biblioteca");
    }
  };
  const onClick = {
    library: async () => {
      const request = props.boolean
        ? await removeLibraryEntry(token, gameId)
        : await props.function(token, gameId);
      checkSuccess(request);
    },
    status: async () => {
      const status = props.status as string;
      const request = await updateLibraryEntry(token, gameId, { status });
      checkSuccess(request);
    },
    time: async () => {
      const status = props.status as string;
      const request = await updateLibraryEntry(token, gameId, {
        status,
        completion_time: time,
      });
      checkSuccess(request);
    },
  };
  const iconStyle = "h-6 w-6 mr-1";
  const buttonStyle = `flex transition-all items-center ${
    props.boolean && props.type !== "time"
      ? "bg-red-500 hover:bg-red-600"
      : "bg-orange-500 hover:bg-orange-600"
  } cursor-pointer p-2 rounded-xl text-xs md:text-sm lg:text-base`;
  return (
    <div
      className={props.disabled ? "hidden" : "flex justify-center items-center"}
    >
      {props.type === "time" && (
        <form className="mr-2 h-full flex justify-center items-center">
          <input
            className="h-10 w-16 text-center rounded-lg text-black focus:outline-orange-500 mr-1"
            value={time}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setTime(e.target.value);
            }}
            type="number"
            step="0.1"
            min={0}
            max={999.9}
          />{" "}
          h
        </form>
      )}
      <button className={buttonStyle} onClick={onClick[props.type]}>
        <props.icon className={iconStyle} />
        {props.boolean ? props.trueText : props.falseText}
      </button>
    </div>
  );
}
