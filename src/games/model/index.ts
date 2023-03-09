import { getGames } from './get-games';
import { getGame } from './get-game';
import { createGame } from './create-game';
import { deleteGame } from './delete-game';
import { updateGame } from './update-game';

const GamesModel = {
  getGames,
  getGame,

  createGame,
  deleteGame,
  updateGame,
};

export default GamesModel;

/*
1. Jeigu yra lokacija turiu padaryti 3 dalykus
  1. suformuoti bindingus
  2. Įdėti "Insert into locations" pagal bindingus
  3. įdėti bindingus į preparedSqlData
  4. papildyti "UPDATE games SET..."
*/
