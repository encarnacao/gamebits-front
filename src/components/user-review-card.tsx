import { ReviewProps, UserReviews } from "@/types";
import { Rating } from "@mui/material";
import dayjs from "dayjs";
import Image from "next/image";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";

export default function UserReviewCard(review: UserReviews & ReviewProps) {
  const { id, token } = parseCookies();
  const router = useRouter();
  const voteDisabled = !id;
  const userVoted = review.downvoted || review.upvoted;
  const refreshData = () => {
    router.replace(router.asPath);
  };

  return (
    <div className="flex w-11/12 justify-between md:p-4 p-1 mx-auto overflow-hidden rounded-lg bg-slate-900 my-2 transition-all hover:bg-slate-800">
      <div className="flex w-full flex-col justify-between">
        <div className="flex items-center border-b-4 border-slate-950 py-2">
          <Image
            src={review.game.coverUrl}
            width={200}
            height={200}
            alt="user"
            className="w-20 cursor-pointer"
            onClick={() => router.push(`/game/${review.game.igdbId}`)}
          />
          <div className="flex w-full justify-between ml-2">
            <div className="flex gap-1">
              <div
                className="group bg-white/10 p-2 rounded-lg cursor-pointer"
                onClick={() => router.push(`/game/${review.game.igdbId}`)}
              >
                <p className="serifed text-lg group-hover:text-orange-500">
                  {review.game.name}
                </p>
                <p>Nota:</p>
                <Rating value={review.rating} readOnly />
              </div>
              <div className="group bg-white/10 p-2 rounded-lg cursor-pointer">
                <p className="serifed text-lg group-hover:text-orange-500">
                  Plataformas: {review.game.platforms}
                </p>
                <p className="serifed text-lg group-hover:text-orange-500">
                  Gêneros: {review.game.genres}
                </p>
                <p className="serifed text-lg group-hover:text-orange-500">
                  Lançamento:{" "}
                  {dayjs(review.game.originalReleaseDate).format("DD/MM/YY")}
                </p>
              </div>
            </div>
            <div className="relative">
              <p className="text-gray-400">
                {dayjs(review.createdAt).format("DD/MM/YY")}
              </p>
              <div className="flex flex-col justify-center items-center">
                <ChevronUpIcon className="h-8 w-8" />
                <p className="">{review.score}</p>
                <ChevronDownIcon className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
        <div className="p-4">{review.text}</div>
      </div>
    </div>
  );
}
