import { RowDataPacket } from "mysql2";
import { type } from "os";

export type PrivateGamesModels = {
  id: number,
  title: string,
  price: number,
  images: string[],
  description: string,
  category: string,
  gameCondition: string,
  location: {
    city: string,
    country: string,
  }
};

export type GamesModels = PrivateGamesModels & RowDataPacket;

export type GamesData = Omit<PrivateGamesModels, 'id'>;

export type PartialGameData = Partial<GamesData>;
