import axios from 'axios';
import { Game } from './types';

export async function getGames(chessUsername: string): Promise<Game[]> {
  if (!chessUsername) {
    throw new Error('milliseconds not a number');
  }

  const { data } = await axios.get<{ games: Game[] }>(
    `https://api.chess.com/pub/player/${chessUsername}/games/2022/07`
  );

  return data.games.slice(0, 5);
}
