import { copy } from 'fs-extra';
import child_process from 'node:child_process';
import { copyFile, mkdir, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { promisify } from 'node:util';
import simpleGit from 'simple-git';

const exec = promisify(child_process.exec);

const git = simpleGit();

const outputDirPath = join('src', 'lib', 'generated');

const iconsDirPath = join(outputDirPath, 'icons');
const iconsMapFilePath = join(outputDirPath, 'icon-map.json');

const vsCodeExtDirName = 'vscode-extension';
const vsCodeExtDirPath = join('tmp', vsCodeExtDirName);

console.info('Preparing directories');

await rm(vsCodeExtDirPath, { recursive: true, force: true });
await rm(outputDirPath, { recursive: true, force: true });
await mkdir(iconsDirPath, { recursive: true });

console.info(
  'Cloning material-extensions/vscode-material-icon-theme GitHub repo',
);

await git.clone(
  'git@github.com:material-extensions/vscode-material-icon-theme.git',
  vsCodeExtDirPath,
);

console.info('Running `bun install`');

await exec('bun install', {
  cwd: vsCodeExtDirPath,
  stdio: 'inherit',
});

console.info('Running `bun run generateJson`');

await mkdir(join(vsCodeExtDirPath, 'dist'));
await exec('bun run generateJson', {
  cwd: vsCodeExtDirPath,
  stdio: 'inherit',
});

console.info('Copying icons');

await copy(join(vsCodeExtDirPath, 'icons'), iconsDirPath);

console.info('Copying icon mapping');

await copyFile(
  join(vsCodeExtDirPath, 'dist', 'material-icons.json'),
  join(iconsMapFilePath),
);

console.info('Cleanup');

await rm(vsCodeExtDirPath, { recursive: true });

console.info('All done');
