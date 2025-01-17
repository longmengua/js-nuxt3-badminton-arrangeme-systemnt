import { describe, it, expect } from '@jest/globals';
import { Player, getPlayersForMatch } from '@/server/utils/arrangement';

// Test suite for the matchmaking logic
describe('Matchmaking Logic', () => {
  // Test case to check if 4 valid players are selected
  it('should select 4 players with valid conditions', () => {
    const players: Player[] = [
      { name: 'Player1', level: 3, matchesPlayed: 0, avoidPlayers: ['Player7'] },
      { name: 'Player2', level: 3, matchesPlayed: 0, avoidPlayers: [] },
      { name: 'Player3', level: 1, matchesPlayed: 0, avoidPlayers: ['Player6'] },
      { name: 'Player4', level: 3, matchesPlayed: 0, avoidPlayers: [] },
      { name: 'Player5', level: 2, matchesPlayed: 0, avoidPlayers: [] },
      { name: 'Player6', level: 4, matchesPlayed: 0, avoidPlayers: [] },
      { name: 'Player7', level: 2, matchesPlayed: 0, avoidPlayers: [] },
      { name: 'Player8', level: 4, matchesPlayed: 0, avoidPlayers: [] },
      { name: 'Player9', level: 3, matchesPlayed: 0, avoidPlayers: [] },
      { name: 'Player10', level: 4, matchesPlayed: 0, avoidPlayers: [] },
      { name: 'Player11', level: 4, matchesPlayed: 0, avoidPlayers: [] },
      { name: 'Player12', level: 5, matchesPlayed: 0, avoidPlayers: [] },
      { name: 'Player13', level: 4, matchesPlayed: 0, avoidPlayers: [] },
      { name: 'Player14', level: 1, matchesPlayed: 0, avoidPlayers: [] },
    ];

    const selectedPlayers = getPlayersForMatch(players); // Get selected players

    expect(selectedPlayers).toHaveLength(4); // Verify 4 players are selected
    selectedPlayers.forEach(player => {
      expect(player.matchesPlayed).toBeGreaterThan(0); // Verify match count is incremented
    });
  });

  // Test case to check if players in avoid list are excluded
  it('should avoid players from avoid list', () => {
    const players: Player[] = [
      { name: 'Player1', level: 3, matchesPlayed: 0, avoidPlayers: ['Player2'] },
      { name: 'Player2', level: 3, matchesPlayed: 0, avoidPlayers: [] },
      { name: 'Player3', level: 3, matchesPlayed: 0, avoidPlayers: [] },
      { name: 'Player4', level: 3, matchesPlayed: 0, avoidPlayers: [] },
    ];

    const selectedPlayers = getPlayersForMatch(players); // Get selected players

    expect(selectedPlayers).toHaveLength(3); // Expected: 3 players selected
    expect(selectedPlayers.map(p => p.name)).not.toContain('Player2'); // Verify avoid list is respected
  });

  // Test case to check if players with large level differences are excluded
  it('should not select players with level difference greater than 1', () => {
    const players: Player[] = [
      { name: 'Player1', level: 1, matchesPlayed: 0, avoidPlayers: [] },
      { name: 'Player2', level: 3, matchesPlayed: 0, avoidPlayers: [] },
      { name: 'Player3', level: 2, matchesPlayed: 0, avoidPlayers: [] },
      { name: 'Player4', level: 3, matchesPlayed: 0, avoidPlayers: [] },
    ];

    const selectedPlayers = getPlayersForMatch(players); // Get selected players

    expect(selectedPlayers).toHaveLength(2); // Verify only 2 players are selected
    expect(selectedPlayers.map(p => p.level)).toEqual(expect.arrayContaining([1, 2])); // Verify levels are within range
  });

  it('should calculate the correct number of rounds for all players to play 6 matches and log each round', () => {
    const players: Player[] = [
      { name: 'Player1', level: 3, matchesPlayed: 0, avoidPlayers: [] },
      { name: 'Player2', level: 3, matchesPlayed: 0, avoidPlayers: [] },
      { name: 'Player3', level: 1, matchesPlayed: 0, avoidPlayers: [] },
      { name: 'Player4', level: 3, matchesPlayed: 0, avoidPlayers: [] },
      { name: 'Player5', level: 2, matchesPlayed: 0, avoidPlayers: [] },
      { name: 'Player6', level: 4, matchesPlayed: 0, avoidPlayers: [] },
      { name: 'Player7', level: 2, matchesPlayed: 0, avoidPlayers: [] },
      { name: 'Player8', level: 4, matchesPlayed: 0, avoidPlayers: [] },
      { name: 'Player9', level: 3, matchesPlayed: 0, avoidPlayers: [] },
      { name: 'Player10', level: 4, matchesPlayed: 0, avoidPlayers: [] },
      { name: 'Player11', level: 4, matchesPlayed: 0, avoidPlayers: [] },
      { name: 'Player12', level: 5, matchesPlayed: 0, avoidPlayers: [] },
      { name: 'Player13', level: 4, matchesPlayed: 0, avoidPlayers: [] },
      { name: 'Player14', level: 1, matchesPlayed: 0, avoidPlayers: [] },
    ];

    // Calculate total matches required
    const totalPlayers = players.length;
    const matchesPerPlayer = 6;
    const totalMatches = totalPlayers * matchesPerPlayer;

    // Calculate the number of rounds needed
    const playersPerRound = 4;
    const roundsNeeded = Math.ceil(totalMatches / playersPerRound);

    console.log(`Total Players: ${totalPlayers}`);
    console.log(`Rounds Needed: ${roundsNeeded}\n`);

    // Simulate rounds to ensure all players play 6 matches
    for (let round = 1; round <= roundsNeeded; round++) {
      const selectedPlayers = getPlayersForMatch(players); // Select players for this round
      console.log(`Round ${round}:`, selectedPlayers.map(player => player.name));
      expect(selectedPlayers).toHaveLength(playersPerRound); // Ensure exactly 4 players are selected
    }

    // Verify that all players have played 6 matches
    players.forEach(player => {
      expect(player.matchesPlayed).toBe(6); // Ensure each player has played exactly 6 matches
    });
  });
});
