export type Game = {
  url: string;
  white: Player;
  black: Player;
  time_class: string;
  end_time: number;
  fen: string;
};

export type Player = {
  rating: number;
  result: Result;
  username: string;
};

export type Result =
  | 'win'
  | 'timeout'
  | 'checkmated'
  | 'stalemate'
  | 'resigned'
  | 'insufficient'
  | 'agreed'
  | 'repetition'
  | 'timevsinsufficient';
