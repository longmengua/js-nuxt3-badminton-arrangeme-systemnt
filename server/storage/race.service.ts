export class Participant {
  constructor(public id: number, public level: number) {}
}

export class Match {
  constructor(public team1: Participant[], public team2: Participant[], public fun?: boolean) {}

  toJSON(): object {
      return {
          team1: this.team1.map(p => ({ id: p.id, level: p.level })),
          team2: this.team2.map(p => ({ id: p.id, level: p.level })),
          fun: this.fun || false,
      };
  }
}

export function generateMatches(participants: Participant[]): Match[] {
  const matches: Match[] = [];

  for (let i = 0; i < participants.length; i += 4) {
      const team1: Participant[] = participants.slice(i, i + 2);
      const team2: Participant[] = participants.slice(i + 2, i + 4);

      const isFunMatch = Math.abs(team1[0].level - team2[0].level) > 4;
      matches.push(new Match(team1, team2, isFunMatch));
  }

  return matches;
}

export function printMatches(matches: Match[]): string {
  const matchJSON: object[] = matches.map(match => match.toJSON());
  return JSON.stringify(matchJSON, null, 2);
}