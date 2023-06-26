import { GameReviews, ReviewProps, UserReviews } from "@/types";

export function checkReviewProps(
  reviews: GameReviews[] | UserReviews[],
  userId?: number
): ((GameReviews & ReviewProps) | (UserReviews & ReviewProps))[] {
  return reviews.map((review) => {
    const score = review.upVotes.length - review.downVotes.length;
    const upvoted = userId ? review.upVotes.includes(userId) : false;
    const downvoted = userId ? review.downVotes.includes(userId) : false;
    return { ...review, score, upvoted, downvoted };
  });
}

export function checkReviewed(reviews: GameReviews[], userId?: number) {
  return reviews.some((review) => review.reviewWriter.id === userId);
}
