import { describe, it, expect } from '@jest/globals';
import { Player, getPlayersForMatch } from '@/server/utils/arrangement';

describe('Player Matchmaking Tests', () => {
  let players: Player[];

  beforeEach(() => {
    players = [
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
  });

  it('should select 4 players with compatible levels', () => {
    const selectedPlayers = getPlayersForMatch(players);
    expect(selectedPlayers.length).toBe(4);
    const levels = selectedPlayers.map(player => player.level);
    const levelRange = Math.max(...levels) - Math.min(...levels);
    expect(levelRange).toBeLessThanOrEqual(1);
  });

  it('should avoid players in the avoid list', () => {
    players[0].avoidPlayers = ['Player2'];
    const selectedPlayers = getPlayersForMatch(players);
    expect(selectedPlayers.map(player => player.name)).not.toContain('Player2');
  });

  it('should prioritize players with fewer matches played', () => {
    players[0].matchesPlayed = 5;
    const selectedPlayers = getPlayersForMatch(players);
    expect(selectedPlayers).not.toContainEqual(expect.objectContaining({ name: 'Player1' }));
  });

  it('should handle cases where not enough players are available', () => {
    const limitedPlayers = players.slice(0, 3); // Only 3 players available
    const selectedPlayers = getPlayersForMatch(limitedPlayers);
    expect(selectedPlayers.length).toBeLessThan(4);
  });

  it('should correctly update matchesPlayed for selected players', () => {
    const selectedPlayers = getPlayersForMatch(players);
    selectedPlayers.forEach(player => {
      const updatedPlayer = players.find(p => p.name === player.name);
      expect(updatedPlayer?.matchesPlayed).toBe(1);
    });
  });
});
