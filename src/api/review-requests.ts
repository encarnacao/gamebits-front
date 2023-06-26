import { GameReviews, UserReviews } from "@/types";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function postReview(
  token: string,
  body: {
    gameId: number;
    rating: number;
    text: string;
  }
) {
  try {
    await axios.post("/reviews", body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  } catch (err) {
    console.log(err);
    alert("Error posting review");
    return false;
  }
}

export async function deleteReview(token: string, reviewId: number) {
  try {
    await axios.delete(`/reviews/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  } catch (err) {
    console.log(err);
    alert("Error deleting review");
    return false;
  }
}

export async function getGameReviews(gameId: number): Promise<GameReviews[]> {
  try {
    const request = await axios.get(`/reviews/${gameId}`);
    return request.data;
  } catch {
    return [];
  }
}

export async function getUserReviews(userId: number): Promise<UserReviews[]> {
  try {
    const request = await axios.get(`/reviews/user/${userId}`);
    return request.data;
  } catch {
    return [];
  }
}
