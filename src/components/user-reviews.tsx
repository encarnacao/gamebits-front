import { UserReviews, ReviewProps } from "@/types";
import UserReviewCard from "./user-review-card";


export default function UserReviewsInfo({ reviews }:{reviews: (UserReviews & ReviewProps)[]}){
  return (
    <div className="flex flex-col w-full rounded-xl bg-gradient-to-t from-black to-slate-950 mx-auto mt-2">
      {reviews.map((review) =>(<UserReviewCard key={review.id} {...review} />))}
    </div>
  )
}