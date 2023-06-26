import { GameReviews, ReviewProps } from "@/types";
import { Rating } from "@mui/material";
import dayjs from "dayjs";
import Image from "next/image";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { parseCookies } from "nookies";
import { deleteReview } from "@/api";
import { useRouter } from "next/router";

export default function GameReviewCard(review: ReviewProps & GameReviews) {
  const { id, token } = parseCookies();
  const router = useRouter();
  const userReviewed = review.reviewWriter.id === Number(id);
  const voteDisabled = userReviewed || !id;
  const userVoted = review.downvoted || review.upvoted;
  const refreshData = () => {
    router.replace(router.asPath);
  };
  const handleDelete = async () => {
    const confirmation = confirm("Clique em ok para cancelar");
    if (!confirmation) return;
    const request = await deleteReview(token, review.id);
    if (request) {
      refreshData();
    }
  };

  return (
    <div className="flex w-11/12 justify-between md:p-4 p-1 mx-auto overflow-hidden rounded-lg bg-slate-900 my-2 transition-all hover:bg-slate-800">
      <div className="flex w-full flex-col justify-between">
        <div className="flex items-center border-b-4 border-slate-950 py-2">
          <Image
            src={review.reviewWriter.imageUrl}
            width={200}
            height={200}
            alt="user"
            className="w-20 rounded-full cursor-pointer"
            onClick={() => router.push(`/user/${review.reviewWriter.id}`)}
          />
          <div className="flex w-full justify-between ml-2">
            <div
              className="group bg-white/10 p-2 rounded-lg cursor-pointer"
              onClick={() => router.push(`/user/${review.reviewWriter.id}`)}
            >
              <p className="serifed text-lg group-hover:text-orange-500">{review.reviewWriter.username}</p>
              <p>Nota:</p>
              <Rating value={review.rating} readOnly />
            </div>
            <div className="relative">
              <button
                className={`p-1 rounded-md bg-red-500 absolute -left-12 ${
                  userReviewed ? "" : "hidden"
                }`}
                onClick={handleDelete}
              >
                <TrashIcon className="h-6 w-6" />
              </button>
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
