import { getInput } from '@actions/core';
import axios from 'axios';
import { spawn } from 'child_process';
import { Game } from './types';

export const START_TOKEN = '<!--START_SECTION:chessStats-->';
export const END_TOKEN = '<!--END_SECTION:chessStats-->';
export const COMMIT_MSG = getInput('COMMIT_MSG');

export const getGames = async (chessUsername: string): Promise<Game[]> => {
  if (!chessUsername) {
    throw new Error('milliseconds not a number');
  }

  const { data } = await axios.get<{ games: Game[] }>(
    `https://api.chess.com/pub/player/${chessUsername}/games/2022/07`
  );

  return data.games.slice(0, 5);
};

export const commitFile = async () => {
  await exec('git', [
    'config',
    '--global',
    'user.email',
    '41898282+github-actions[bot]@users.noreply.github.com'
  ]);
  await exec('git', ['config', '--global', 'user.name', 'chess-stats-bot']);
  await exec('git', ['add', 'README.md']);
  await exec('git', ['commit', '-m', COMMIT_MSG]);
  await exec('git', ['push']);
};

const exec = (cmd: string, args: string[] = []) =>
  new Promise((resolve, reject) => {
    const app = spawn(cmd, args, { stdio: 'pipe' });
    let stdout = '';
    app.stdout.on('data', data => {
      stdout = data;
    });
    app.on('close', code => {
      if (code !== 0 && !stdout.includes('nothing to commit')) {
        const err = new Error(`Invalid status code: ${code}`);
        return reject(err);
      }
      return resolve(code);
    });
    app.on('error', reject);
  });
