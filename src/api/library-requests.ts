import { LibraryEntry } from "@/types";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function getUserLibrary(
  userId: number
): Promise<LibraryEntry[] | null> {
  try {
    const response = await axios.get(`/libraries/${userId}`);
    return response.data;
  } catch {
    return null;
  }
}

export async function getUserWishlist(
  userId: number
): Promise<LibraryEntry[] | null> {
  try {
    const response = await axios.get(`/libraries/wishlist/${userId}`);
    return response.data;
  } catch {
    return null;
  }
}
