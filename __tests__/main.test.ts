import * as process from 'process';
import * as cp from 'child_process';
import * as path from 'path';
import { test } from '@jest/globals';

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['INPUT_DEBUG'] = 'true'; // DO NOT REMOVE or it will mess git configs and README.md
  process.env['INPUT_CHESS_USERNAME'] = 'hikaru';
  process.env['INPUT_GAMES_SIZE'] = '10';
  process.env['INPUT_SHOW_DATE'] = 'true';
  const np = process.execPath;
  const ip = path.join(__dirname, '..', 'lib', 'main.js');
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  };
  console.log(cp.execFileSync(np, [ip], options).toString());
});
