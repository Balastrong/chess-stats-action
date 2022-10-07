import fetch from './fetch';
import { Game, Stats } from './types';

export const getChessComGames = async (archive: string): Promise<Game[]> => {
  const data = await fetch<{ games: Game[] }>(archive);

  return data.games.map((game: Game) => ({
    url: game.url,
    fen: game.fen,
    white: {
      rating: game.white.rating,
      result: game.white.result,
      username: game.white.username
    },
    black: {
      rating: game.black.rating,
      result: game.black.result,
      username: game.black.username
    },
    time_class: game.time_class,
    end_time: game.end_time
  }));
};

export const getChessComArchives = async (
  username: string
): Promise<string[]> => {
  const data = await fetch<{ archives: string[] }>(
    `https://api.chess.com/pub/player/${username}/games/archives`
  );

  // Try the last 5 archives at most
  return data.archives.reverse().slice(0, 5);
};

export const getStats = async (username: string): Promise<Stats> => {
  const data = await fetch<Stats>(
    `https://api.chess.com/pub/player/${username}/stats`
  );

  return data;
};
