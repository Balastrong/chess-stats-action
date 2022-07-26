import { getInput, setFailed, debug } from '@actions/core';
import { getGames } from './uti';

async function run(): Promise<void> {
  try {
    const chessUsername: string = getInput('CHESS_USERNAME');
    debug('Detected username ' + chessUsername + '<<--');

    //const games = await getGames(chessUsername);

    //debug(JSON.stringify(games[0]));
  } catch (error) {
    if (error instanceof Error) setFailed('XX' + error.message);
  }
}

run();
