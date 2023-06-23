import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function getGameById(id: string) {
  try {
    const request = await axios.get(`/games/${id}`);
    const gameData = request.data;
    return gameData;
  } catch {
    return null;
  }
}

export async function searchGames(name: string) {
  const request = await axios.post(`/games?name=${name}`, {});
  return request.data;
}
