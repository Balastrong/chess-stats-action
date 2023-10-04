import { setFailed } from '@actions/core';
import { spawn } from 'child_process';
import { iswitch } from 'iswitch';
import { getChessComArchives, getChessComGames } from './api';
import { COMMIT_EMAIL, COMMIT_MSG, COMMIT_USERNAME, FILE_NAME } from './main';
import { Game, Result, Stats } from './types';

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
  const archives = await getChessComArchives(chessUsername);

  for (const archive of archives) {
    if (games.length < amount) {
      const gamesInArchive = await getChessComGames(archive);
      games.push(...gamesInArchive.reverse());
    } else break;
  }

  return games.slice(0, amount);
};

export const commitFile = async () => {
  await exec('git', ['config', '--global', 'user.email', COMMIT_EMAIL]);
  await exec('git', ['config', '--global', 'user.name', COMMIT_USERNAME]);
  await exec('git', ['add', FILE_NAME]);
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

export const formatGamesTable = (
  games: Game[],
  player: string,
  showDate: boolean,
  showFen: boolean,
  showTimeClass: boolean
): string => {
  const tableHeader = `| White ⚪ | Black ⚫ | Result 🏆 |${
    showDate ? ' Date 📅 |' : ''
  }${showFen ? ' Position 🗺️ |' : ''}${showTimeClass ? ' Type 🕕 |' : ''}`;

  const extraColumnsSize = [showDate, showFen, showTimeClass].filter(
    Boolean
  ).length;
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

      if (showTimeClass) {
        const timeClass =
          game.time_class.charAt(0).toUpperCase() + game.time_class.slice(1);
        data.push(`${timeClass}`);
      }

      return `| ${data.join(' | ')} |`;
    })
    .join('\n');

  return `${tableHeader}\n${tableSeparator}\n${gameRows}\n`;
};

export const formatStatsTable = (stats: Stats): string => {
  const tableHeader = `| Type | Rapid ⏲️ | Blitz ⚡ | Bullet 🔫 |`;
  const tableSeparator =
    '|' + Array.from({ length: 4 }, () => ':---:|').join('');
  const lastRatings = [
    stats.chess_rapid?.last?.rating ?? 'No Rating',
    stats.chess_blitz?.last?.rating ?? 'No Rating',
    stats.chess_bullet?.last?.rating ?? 'No Rating'
  ];
  const bestRatings = [
    stats.chess_rapid?.best?.rating ?? 'No Rating',
    stats.chess_blitz?.best?.rating ?? 'No Rating',
    stats.chess_bullet?.best?.rating ?? 'No Rating'
  ];
  const lastRatingRow = `| Current | ${lastRatings.join(' | ')} |`;
  const bestRatingRow = `| Best | ${bestRatings.join(' | ')} |`;

  return `${tableHeader}\n${tableSeparator}\n${lastRatingRow}\n${bestRatingRow}\n`;
};

export const boldifyPlayer = (test: string, player: string): string =>
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

export const setFailure = (error: string) => {
  console.error(error);
  setFailed(error);
};
