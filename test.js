const Condition = {
    noLowLevel: 'noLowLevel',
}
const players = [
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

const getSelectedPlayers = (players, startIndex) => {
    let avoidPlayers = []
    let selectedPlayers = []
    const level = []

    players.forEach((v, i) => {
        // 跳過n個players
        if (i < startIndex) return
        // 已選出四人
        if (selectedPlayers.length >= 4) return
        // 在任何一人的避免配對的清單內
        if (avoidPlayers.includes(v.name)) return
        // 當級距已滿，不在等級級距內。
        if (level.length >= 2 && !level.includes(v.level)) return
        // 當級距未滿，級距相關邏輯
        if (level.length == 0) {
            level.push(v.level)
        } else {
            // 等級差距超過1時，跳過
            if (Math.abs(level[0] - v.level) > 1) return
        }

        v.matchesPlayed++
        avoidPlayers = [...avoidPlayers, ...v.avoidPlayers]
        const selectedPlayer = { ...v }
        // delete selectedPlayer.avoidPlayers
        selectedPlayers = [...selectedPlayers, selectedPlayer]
    })
    return selectedPlayers;
}

const getPlayersForMatch = (players) => {
    // 排序
    players.sort((a, b) => {
        if (a.matchesPlayed !== b.matchesPlayed) {
            return a.matchesPlayed - b.matchesPlayed;
        }
        return a.level - b.level;
    });

    // 選擇四名玩家
    let index = 0
    while (true) {
        const selectedPlayers = getSelectedPlayers(players, index)
        index++
        return selectedPlayers
    }
};

for (let index = 0; index < 21; index++) {
    const selectedPlayers = getPlayersForMatch(players);
    console.log(`No:${index}:`, selectedPlayers.map(v => {
        delete v.avoidPlayers
        return v
    }));
}
console.log("\nALL:", players.map(v => {
    delete v.avoidPlayers
    return v
}))
