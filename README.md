# Chess Stats Action

Automatically add and keep up to date your latest games from [chess.com](https://www.chess.com/).

|    White ⚪    |    Black ⚫    |   Result 🏆   |  Date 📅  |                                                          Position 🗺️                                                           |
| :------------: | :------------: | :-----------: | :-------: | :----------------------------------------------------------------------------------------------------------------------------: |
| Mykola-Bortnyk |   **Hikaru**   |    win 🥇     | 28/7/2022 |          <a href="http://www.ee.unb.ca/cgi-bin/tervo/fen.pl?select=2k5/2p5/3p4/3Pr2p/3R3P/n3n1N1/K7/8 w - -">Link</a>          |
|   **Hikaru**   | Mykola-Bortnyk |    win 🥇     | 28/7/2022 |               <a href="http://www.ee.unb.ca/cgi-bin/tervo/fen.pl?select=8/4k3/4nR2/5KP1/8/8/8/8 b - -">Link</a>                |
| Mykola-Bortnyk |   **Hikaru**   |    win 🥇     | 28/7/2022 |          <a href="http://www.ee.unb.ca/cgi-bin/tervo/fen.pl?select=2k5/8/2p5/1pP5/1P2b3/2r1p3/1R6/3K4 w - -">Link</a>          |
|   **Hikaru**   | Mykola-Bortnyk | repetition ⏸️ | 28/7/2022 |        <a href="http://www.ee.unb.ca/cgi-bin/tervo/fen.pl?select=R4n2/6pk/4p2p/1p5P/3P1PKQ/3q3R/6P1/7r b - -">Link</a>         |
| NikoTheodorou  |   **Hikaru**   |    win 🥇     | 27/7/2022 | <a href="http://www.ee.unb.ca/cgi-bin/tervo/fen.pl?select=r4rk1/5pb1/1p2qnn1/2p1pR2/3pP1p1/BP1b2P1/4Q1BP/4NRK1 w - -">Link</a> |
|   **Hikaru**   | NikoTheodorou  |    win 🥇     | 27/7/2022 |              <a href="http://www.ee.unb.ca/cgi-bin/tervo/fen.pl?select=4r3/5R2/1kP5/8/8/8/5KB1/8 b - -">Link</a>               |
| NikoTheodorou  |   **Hikaru**   | repetition ⏸️ | 27/7/2022 |          <a href="http://www.ee.unb.ca/cgi-bin/tervo/fen.pl?select=7R/4k3/p3Pp2/4nB2/2rp2P1/8/P7/5K2 w - -">Link</a>           |
|   smallxhafa   |   **Hikaru**   | repetition ⏸️ | 27/7/2022 |    <a href="http://www.ee.unb.ca/cgi-bin/tervo/fen.pl?select=4rrk1/pp4pp/6q1/3p1p2/PQ1P4/5P1P/1P3P2/R3RN1K b - -">Link</a>     |
|    Knukleks    |   **Hikaru**   |    win 🥇     | 27/7/2022 |        <a href="http://www.ee.unb.ca/cgi-bin/tervo/fen.pl?select=2r3k1/6p1/1R5p/pB2pp2/P7/3KP1P1/8/3q4 w - -">Link</a>         |
|      blyp      |   **Hikaru**   |    win 🥇     | 27/7/2022 |        <a href="http://www.ee.unb.ca/cgi-bin/tervo/fen.pl?select=8/5p2/2k1p3/4P2p/pBp2P1P/P2b4/1p1Kp3/8 w - -">Link</a>        |

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
