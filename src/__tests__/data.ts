import { Game } from '../types';

export const twoGames: Game[] = [
  {
    white: {
      username: 'player',
      rating: 2000,
      result: 'win'
    },
    black: {
      username: 'opponent',
      rating: 2000,
      result: 'checkmated'
    },
    end_time: new Date(2022, 5, 1).getTime() / 1000,
    fen: 'fen',
    time_class: 'rapid',
    url: 'url'
  },
  {
    white: {
      username: 'opponent',
      rating: 2000,
      result: 'win'
    },
    black: {
      username: 'player',
      rating: 2000,
      result: 'checkmated'
    },
    end_time: new Date(2022, 5, 1).getTime() / 1000,
    fen: 'fen',
    time_class: 'rapid',
    url: 'url'
  }
];
