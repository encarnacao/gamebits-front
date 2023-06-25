import { LibraryEntry } from "@/types";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function getUserLibrary(
  userId: number
): Promise<LibraryEntry[]> {
  try {
    const response = await axios.get(`/libraries/${userId}`);
    return response.data;
  } catch {
    return [];
  }
}

export async function getUserWishlist(
  userId: number
): Promise<LibraryEntry[]> {
  try {
    const response = await axios.get(`/libraries/wishlist/${userId}`);
    return response.data;
  } catch {
    return [];
  }
}

export async function addLibraryEntry(token: string, gameId: number) {
  try {
    await axios.post(
      `/libraries/add/${gameId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function addWishlistEntry(token: string, gameId: number) {
  try {
    await axios.post(
      `/libraries/wishlist/${gameId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return true;
  } catch {
    return false;
  }
}

export async function removeLibraryEntry(token: string, gameId: number) {
  try {
    await axios.delete(`/libraries/${gameId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return true;
  } catch {
    return false;
  }
}

export async function updateLibraryEntry(
  token: string,
  gameId: number,
  body: {
    status: string;
    completion_time?: string;
  }
) {
  try {
    await axios.put(`/libraries/${gameId}`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return true;
  } catch {
    return false;
  }
}
