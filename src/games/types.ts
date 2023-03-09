import { RowDataPacket } from 'mysql2';

export type PrivateViewGameModel = {
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
  },
  ownerId: number
};

export type GameViewModels = PrivateViewGameModel & RowDataPacket;

export type GameData = Omit<PrivateViewGameModel, 'id'>;

export type GameBody = Omit<GameData, 'ownerId'>;

export type PartialGameBody = Partial<GameBody>;
