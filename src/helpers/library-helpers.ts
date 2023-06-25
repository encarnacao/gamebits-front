import { getUserLibrary, getUserWishlist } from "@/api";
import { GameBooleans, LibraryEntry } from "@/types";

export async function CheckGameLibrary(
  userId: number,
  gameId: number
): Promise<GameBooleans> {
  const myLibrary = (await getUserLibrary(userId)) as LibraryEntry[];
  const checkForEntry = myLibrary
    ? myLibrary.find((entry) => entry.game.id === gameId)
    : null;
  if (checkForEntry) {
    return {
      inLibrary: true,
      inWishlist: checkForEntry.wishlist,
      finished: checkForEntry.finished,
      platinum: checkForEntry.platinum,
      completionTime: checkForEntry.completionTime,
    };
  } else {
    return await CheckGameWishlist(userId, gameId);
  }
}

async function CheckGameWishlist(
  userId: number,
  gameId: number
): Promise<GameBooleans> {
  const myWishlist = (await getUserWishlist(userId)) as LibraryEntry[];
  const checkForEntry = myWishlist
    ? myWishlist.find((entry) => entry.game.id === gameId)
    : null;
  if (checkForEntry) {
    return {
      inLibrary: true,
      inWishlist: checkForEntry.wishlist,
      finished: checkForEntry.finished,
      platinum: checkForEntry.platinum,
      completionTime: checkForEntry.completionTime,
    };
  } else {
    return {
      inLibrary: false,
      inWishlist: false,
      finished: false,
      platinum: false,
      completionTime: null,
    };
  }
}
