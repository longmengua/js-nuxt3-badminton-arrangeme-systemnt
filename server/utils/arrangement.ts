// Define the Player type to represent each player's properties
export type Player = {
    name: string; // Player's name
    level: number; // Player's level
    matchesPlayed: number; // Number of matches the player has played
    avoidPlayers: string[]; // List of players this player wants to avoid
};

// Define the ConditionType type for future extensibility of matchmaking conditions
export type ConditionType = {
    noLowLevel: string; // Example condition to avoid players of low levels
};

// Define the conditions object with predefined keys
export const Condition: ConditionType = {
    noLowLevel: 'noLowLevel',
};

// Function to select players for a match starting from a specific index
export const getSelectedPlayers = (players: Player[], startIndex: number): Player[] => {
    let avoidPlayers: string[] = []; // List of players to avoid
    let selectedPlayers: Player[] = []; // List of selected players
    const level: number[] = []; // List of levels represented in the match

    players.forEach((player, index) => {
        if (index < startIndex) return; // Skip players before the starting index

        if (selectedPlayers.length >= 4) return; // Stop if 4 players are already selected

        if (avoidPlayers.includes(player.name)) return; // Skip players in the avoid list

        if (level.length >= 2 && !level.includes(player.level)) return; // Skip players not matching existing levels

        if (level.length === 0) {
            level.push(player.level); // Add the first level to the level list
        } else {
            if (Math.abs(level[0] - player.level) > 1) return; // Skip players with level difference > 1
        }

        player.matchesPlayed++; // Increment the match count for the selected player
        avoidPlayers = [...avoidPlayers, ...player.avoidPlayers]; // Update the avoid list

        const selectedPlayer = { ...player }; // Clone the player object
        selectedPlayers = [...selectedPlayers, selectedPlayer]; // Add the player to the selected list
    });

    return selectedPlayers; // Return the list of selected players
};

// Function to select players for a match based on sorting and selection rules
export const getPlayersForMatch = (players: Player[]): Player[] => {
    players.sort((a, b) => {
        if (a.matchesPlayed !== b.matchesPlayed) {
            return a.matchesPlayed - b.matchesPlayed; // Sort by matches played
        }
        return a.level - b.level; // Sort by level if matches played are equal
    });

    let index = 0; // Initialize the starting index for selection
    while (true) {
        const selectedPlayers = getSelectedPlayers(players, index); // Attempt to select players
        index++;
        return selectedPlayers; // Return the selected players
    }
};