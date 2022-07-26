import { getInput, setFailed, debug } from '@actions/core';
import { getGames } from './uti';

async function run(): Promise<void> {
  const chessUsername: string = getInput('CHESS_USERNAME');

  const games = await getGames(chessUsername);
}

run();
