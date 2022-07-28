# Chess Stats Action

Automatically add and keep up to date your latest games from [chess.com](https://www.chess.com/).

|    White ⚪     |    Black ⚫    |                 Result 🏆                  |  Date 📅  |
| :-------------: | :------------: | :----------------------------------------: | :-------: |
|   **Hikaru**    |  TigrVShlyape  |   <span style="color: green">win</span>    | 27/7/2022 |
|   **Hikaru**    |    Salem-AR    | <span style="color: gray">stalemate</span> | 27/7/2022 |
|     mbojan      |   **Hikaru**   |   <span style="color: green">win</span>    | 27/7/2022 |
|   **Hikaru**    |  honestgames   |   <span style="color: green">win</span>    | 27/7/2022 |
| Russian_berezka |   **Hikaru**   |   <span style="color: green">win</span>    | 27/7/2022 |
|   **Hikaru**    |    bipe137     |   <span style="color: green">win</span>    | 27/7/2022 |
|      Witik      |   **Hikaru**   |  <span style="color: red">resigned</span>  | 26/7/2022 |
|   **Hikaru**    | Manukyan_Artak |   <span style="color: green">win</span>    | 26/7/2022 |
|   K_A_S_T_O_R   |   **Hikaru**   |  <span style="color: red">resigned</span>  | 26/7/2022 |
|   **Hikaru**    |   jinbojinbo   |   <span style="color: green">win</span>    | 26/7/2022 |

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
|   FILE_NAME    |       Define a specific file in your repo        |              README.md              |    No    |

## Contributing

There are many possible ways to expand the functionalities or improve the current logic. Feel free to have a look at the open issues or create a new one youself if something is missing.

PRs are also welcome!
