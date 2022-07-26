export type Game = {
  url: string;
  white: Player;
  black: Player;
  time_class: string;
};

export type Player = {
  rating: number;
  result: 'win' | 'timeout' | 'checkmated';
  username: string;
};
