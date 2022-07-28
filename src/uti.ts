import { spawn } from 'child_process';
import { iswitch } from 'iswitch';
import { getChessComArchives, getChessComGames } from './api';
import { COMMIT_MSG } from './main';
import { Game, Result } from './types';

// Internal consts
export const START_TOKEN = '<!--START_SECTION:chessStats-->';
export const END_TOKEN = '<!--END_SECTION:chessStats-->';
export const INFO_LINE =
  '<!-- Automatically generated with https://github.com/Balastrong/chess-stats-action -->\n';

export const getGames = async (
  chessUsername: string,
  amount: number
): Promise<Game[]> => {
  if (!chessUsername) {
    throw new Error('Username not provided!');
  }

  const games: Game[] = [];
  // Try the last 5 archives at most
  const archives = (await getChessComArchives(chessUsername)).slice(0, 5);

  for (const archive of archives) {
    const gamesInArchive = await getChessComGames(archive);
    if (gamesInArchive.length > 0) {
      games.push(...gamesInArchive.reverse());
    }

    if (games.length >= amount) {
      return games.slice(0, amount);
    }
  }

  return games;
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

export const formatTable = (
  games: Game[],
  player: string,
  showDate: boolean,
  showFen: boolean
): string => {
  const tableHeader = `| White ⚪ | Black ⚫ | Result 🏆 |${
    showDate ? ' Date 📅 |' : ''
  }${showFen ? ' Position 🗺️ |' : ''}`;

  const extraColumnsSize = [showDate, showFen].filter(Boolean).length;
  const tableSeparator =
    '|' + Array.from({ length: 3 + extraColumnsSize }, () => ':---:|').join('');

  const lowerCasePlayer = player.toLowerCase();

  const gameRows = games
    .map(game => {
      const { white, black } = game;

      const player =
        white.username.toLowerCase() === lowerCasePlayer ? white : black;

      const data = [
        boldifyPlayer(white.username, player.username),
        boldifyPlayer(black.username, player.username),
        formatResult(player.result)
      ];

      if (showDate) {
        const date = new Date(game.end_time * 1000);
        data.push(
          `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
        );
      }

      if (showFen) {
        data.push(
          `<a href="http://www.ee.unb.ca/cgi-bin/tervo/fen.pl?select=${game.fen}">Link</a>`
        );
      }

      return `| ${data.join(' | ')} |`;
    })
    .join('\n');

  return `${tableHeader}\n${tableSeparator}\n${gameRows}\n`;
};

const boldifyPlayer = (test: string, player: string): string =>
  test === player ? `**${test}**` : test;

const formatResult = (result: Result): string => {
  const icon =
    iswitch<Result, string>(
      result,
      ['win', () => '🥇'],
      [['timeout', 'checkmated', 'resigned'], () => '❌'],
      [
        [
          'stalemate',
          'insufficient',
          'agreed',
          'repetition',
          'timevsinsufficient'
        ],
        () => '⏸️'
      ]
    ) || '';

  return `${result} ${icon}`;
};
