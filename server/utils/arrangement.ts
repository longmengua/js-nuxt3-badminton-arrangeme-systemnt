export interface Player {
    name: string;
    level: number;
    matchesPlayed: number;
    avoidPlayers: string[];
}

export enum Condition {
    noLowLevel = 'noLowLevel',
}

export const getSelectedPlayers = (players: Player[], startIndex: number): Player[] => {
    let avoidPlayers: string[] = [];
    let selectedPlayers: Player[] = [];
    const level: number[] = [];

    players.forEach((player, index) => {
        if (index < startIndex) return;
        if (selectedPlayers.length >= 4) return;
        if (avoidPlayers.includes(player.name)) return;
        if (level.length >= 2 && !level.includes(player.level)) return;

        if (level.length === 0) {
            level.push(player.level);
        } else {
            if (Math.abs(level[0] - player.level) > 1) return;
        }

        player.matchesPlayed++;
        avoidPlayers = [...avoidPlayers, ...player.avoidPlayers];
        selectedPlayers.push({ ...player });
    });

    return selectedPlayers;
};

export const getPlayersForMatch = (players: Player[]): Player[] => {
    players.sort((a, b) => {
        if (a.matchesPlayed !== b.matchesPlayed) {
            return a.matchesPlayed - b.matchesPlayed;
        }
        return a.level - b.level;
    });

    let index = 0;
    while (index < players.length) {
        const selectedPlayers = getSelectedPlayers(players, index);
        if (selectedPlayers.length === 4) return selectedPlayers;
        index++;
    }

    return [];
};
