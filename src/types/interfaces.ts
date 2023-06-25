export interface UserData {
  id: number;
  username: string;
  imageUrl: string;
  followers: number;
  following: number;
  followedByUser?: boolean;
}

export interface GameData {
  id: number;
  coverUrl: string;
  name: string;
  releaseDate: string;
  platformNames: string;
  summary: string;
}

export interface CardProps {
  icon: HeroIcon;
  title: string;
  description: string;
}

export interface SingleGame {
  id: number;
  igdbId: number;
  name: string;
  coverUrl: string;
  originalReleaseDate: string;
  platforms: string;
  genres: string;
  createdAt: string;
  updatedAt: string;
}

export interface LibraryEntry {
  id: Number;
  game: {
    id: number;
    igdbId: number;
    name: string;
    cover: string;
    originalReleaseDate: string;
    platforms: string;
    genres: string;
  };
  wishlist: boolean;
  finished: boolean;
  platinum: boolean;
  completionTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface GameBooleans {
  inLibrary: boolean;
  inWishlist: boolean;
  finished: boolean;
  platinum: boolean;
  completionTime: string | null;
}

export interface LibraryButtonProps {
  type: "library" | "status" | "time";
  status?: "finished" | "platinum" | "completion_time";
  icon: HeroIcon;
  boolean: boolean;
  trueText: string;
  falseText: string;
  disabled: boolean;
  function: (...args: any) => Promise<boolean>;
}

export interface FollowData {
  id: number;
  username: string;
  imageUrl: string;
}

export type HeroIcon = React.ForwardRefExoticComponent<
  Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
    title?: string | undefined;
    titleId?: string | undefined;
  } & React.RefAttributes<SVGSVGElement>
>;
