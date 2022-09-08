export type Game = {
  url: string;
  white: Player;
  black: Player;
  time_class: string;
  end_time: number;
  fen: string;
};
type Ratings = {
  last?: {
    rating: number;
  };
  best?: {
    rating: number;
  };
};
type GameType = 'chess_rapid' | 'chess_bullet' | 'chess_blitz';
export type Stats = Record<GameType, Ratings>;
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
