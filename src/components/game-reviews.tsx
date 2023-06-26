import { GameReviews, ReviewProps } from "@/types";
import GameReviewCard from "./game-review-card";

export default function GameReviewsInfo({ reviews }:{reviews: (GameReviews & ReviewProps)[]}){
  return (
    <div className="flex flex-col w-full rounded-xl bg-gradient-to-t from-black to-slate-950 mx-auto mt-2">
      {reviews.map((review) =>(<GameReviewCard key={review.id} {...review} />))}
    </div>
  )
}