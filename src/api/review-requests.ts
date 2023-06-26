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
