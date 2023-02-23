export type GamesModels = {
  id: string,
  title: string,
  price: number,
  images: string[],
  description: string,
  category: string,
  condition: string,
  location: {
    city: string,
    country: string,
  }
};

export type GamesData = Omit<GamesModels, 'id'>;

export type PartialGameData = Partial<GamesData>;
