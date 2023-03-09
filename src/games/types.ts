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
  owner: {
    id: number,
    name: string,
    surname: string,
    email: string
  }
};

export type GameViewModels = PrivateViewGameModel & RowDataPacket;

export type GameData = Omit<PrivateViewGameModel, 'id' | 'owner'> & {
  ownerId: number,
};

export type GameBody = Omit<GameData, 'ownerId'>;

export type PartialGameBody = Partial<GameBody>;
