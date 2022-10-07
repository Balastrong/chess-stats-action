import { twoGames } from './data';
import { formatGamesTable, boldifyPlayer } from '../uti';

describe('Utility methods', () => {
  describe('formatGamesTable', () => {
    it('should return a table with the games', () => {
      const player = 'player';
      const showDate = true;
      const showFen = true;
      const showTimeClass = true;

      const expected = `| White ⚪ | Black ⚫ | Result 🏆 | Date 📅 | Position 🗺️ | Type 🕕 |
|:---:|:---:|:---:|:---:|:---:|:---:|
| **player** | opponent | win 🥇 | 1/6/2022 | <a href="http://www.ee.unb.ca/cgi-bin/tervo/fen.pl?select=fen">Link</a> | Rapid |
| opponent | **player** | checkmated ❌ | 1/6/2022 | <a href="http://www.ee.unb.ca/cgi-bin/tervo/fen.pl?select=fen">Link</a> | Rapid |
`;

      const result = formatGamesTable(
        twoGames,
        player,
        showDate,
        showFen,
        showTimeClass
      );

      expect(result).toEqual(expected);
    });
  });

  describe('boldifyPlayer', () => {
    it('should return the player name in bold if it is the current player', () => {
      const player = 'player';
      const otherPlayer = 'player';
      const expected = '**player**';
      const result = boldifyPlayer(player, otherPlayer);
      expect(result).toEqual(expected);
    });

    it('should return the player name in normal if it is not current the player', () => {
      const player = 'player';
      const otherPlayer = 'otherPlayer';
      const expected = 'player';
      const result = boldifyPlayer(player, otherPlayer);
      expect(result).toEqual(expected);
    });
  });
});
