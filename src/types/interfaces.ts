export interface UserData {
  id: number;
  username: string;
  imageUrl: string;
  followers: number;
  following: number;
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

export type HeroIcon = React.ForwardRefExoticComponent<
  Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
    title?: string | undefined;
    titleId?: string | undefined;
  } & React.RefAttributes<SVGSVGElement>
>;
