# Chess Stats Action

Automatically add and keep up to date your latest games from [chess.com](https://www.chess.com/).

|    White ⚪    |    Black ⚫    |   Result 🏆   |  Date 📅  |
| :------------: | :------------: | :-----------: | :-------: |
| Mykola-Bortnyk |   **Hikaru**   |    win 🥇     | 28/7/2022 |
|   **Hikaru**   | Mykola-Bortnyk |    win 🥇     | 28/7/2022 |
| Mykola-Bortnyk |   **Hikaru**   |    win 🥇     | 28/7/2022 |
|   **Hikaru**   | Mykola-Bortnyk | repetition ⏸️ | 28/7/2022 |
| NikoTheodorou  |   **Hikaru**   |    win 🥇     | 27/7/2022 |
|   **Hikaru**   | NikoTheodorou  |    win 🥇     | 27/7/2022 |
| NikoTheodorou  |   **Hikaru**   | repetition ⏸️ | 27/7/2022 |
|   smallxhafa   |   **Hikaru**   | repetition ⏸️ | 27/7/2022 |
|    Knukleks    |   **Hikaru**   |    win 🥇     | 27/7/2022 |
|      blyp      |   **Hikaru**   |    win 🥇     | 27/7/2022 |

## Usage

Add these two placeholders somewhere in your `README.md`, they will get replaced by the action.

```html
<!--START_SECTION:chessStats-->

<!--END_SECTION:chessStats-->
```

Create a GitHub Action in your repository, you can call it `chess-stats-action.yml`.

```yaml
name: Chess Stats Action

on:
  schedule:
    - cron: '0 0 * * *' # Runs at 00:00 UTC every day
  workflow_dispatch:

jobs:
  update-readme:
    name: Update readme with your chess stats and games
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: Balastrong/chess-stats-action@main
        with:
          CHESS_USERNAME: <Your chess.com Username>
```

## Configuration

There are a few configuration options you can use in your GitHub Action.

|   Parameter    |                   Description                    |               Default               | Required |
| :------------: | :----------------------------------------------: | :---------------------------------: | :------: |
| CHESS_USERNAME |             Your chess.com username              |               hikaru                | **Yes**  |
|   COMMIT_MSG   | Commit message used while committing to the repo | Update README with your chess games |    No    |
|   GAMES_SIZE   |              How many games to load              |                 10                  |    No    |
|   SHOW_DATE    |              Toggle the Date column              |                true                 |    No    |
|    SHOW_FEN    |            Toggle the Position column            |                true                 |    No    |
|   FILE_NAME    |       Define a specific file in your repo        |              README.md              |    No    |

## Contributing

There are many possible ways to expand the functionalities or improve the current logic. Feel free to have a look at the open issues or create a new one youself if something is missing.

PRs are also welcome!
