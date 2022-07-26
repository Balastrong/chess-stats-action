import { getInput, setFailed, setOutput } from '@actions/core';
import * as fs from 'fs';
import { commitFile, END_TOKEN, getGames, START_TOKEN } from './uti';

async function run(): Promise<void> {
  const chessUsername: string = getInput('CHESS_USERNAME');

  const games = await getGames(chessUsername);

  const content =
    games
      .map(game => `${game.white.username} vs ${game.black.username}`)
      .join('<br/>\n') + '\n';

  const readmeContent = fs.readFileSync('./README.md', 'utf-8');

  const startIdx = readmeContent.indexOf(START_TOKEN);
  if (startIdx === -1) {
    return setFailed(`Couldn't find the START_TOKEN. Exiting!`);
  }

  const endIdx = readmeContent.indexOf(END_TOKEN);

  if (!content.length) {
    setFailed('No PullRequest/Issue/IssueComment events found');
  }

  const oldPart = readmeContent.slice(startIdx, endIdx);

  const readmeSafeParts = readmeContent.split(oldPart);

  const newReadme = `${readmeSafeParts[0]}${START_TOKEN}\n${content}${readmeSafeParts[1]}`;

  // Update README
  fs.writeFileSync('./README.md', newReadme);

  // Commit to the remote repository
  try {
    await commitFile();
  } catch (err) {
    if (err instanceof Error) {
      return setFailed(err);
    } else {
      return setFailed("Couldn't commit the file");
    }
  }

  setOutput('response', 'Successfully updated the README file');
}

run();
