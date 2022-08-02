# Contributing

- [Contributing](#contributing)
- [Creating an issue](#creating-an-issue)
- [Setup](#setup)
- [Versioned dist](#versioned-dist)
- [Debug](#debug)
- [Submitting a PR](#submitting-a-pr)
  <br/>

Thank you for sharing your interest in contributing to the project! You can find here some useful information.

## Creating an issue

If you have ideas, feature requests or want to report a bug, feel free to submit an issue. I will get back with feedback as soon as possible.

## Setup

After fork/clone of the project, you can install the dependencies with the usual

```sh
npm install
```

This will also install the pre-commit hook with husky. What it basically does is making sure everything is ok before commit (formatting, lint and tests).
A build is also required before committing, as it updates the `dist` folder.

### Versioned dist

As we write code in Typescript, the dist folder is versioned and contains the javascript code that will serve as entry point for the action.

Make sure you update the content before submitting a commit. If you installed the dependencies correctly, husky will do it for you, otherwise you can manually run `npm run build`.

## Debug

In order to test the action locally we suggest using `vscode` as editor. This repo contains a `launch.json` file that can be used by just running the debugger (F5). The action will be launched automatically without generating the js files (with `ts-node`).

## Submitting a PR

When you have the code pushed on your branch, feel free to open a Pull Request.
