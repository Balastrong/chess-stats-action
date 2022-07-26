import axios from 'axios';
import { Game } from './types';

export async function getGames(chessUsername: string): Promise<Game[]> {
  if (!chessUsername) {
    throw new Error('milliseconds not a number');
  }

  const { data } = await axios
    .get(`https://api.chess.com/pub/player/${chessUsername}/games/2022/07`)
    .then(res => JSON.parse(res.data));

  console.log(data);

  return data.games;
}
