import { Match, Participant, generateMatches, printMatches } from "../storage/race.service";

export default defineEventHandler(() => {
  // 創建16個參賽者，分別具有等級1到16
  const participants: Participant[] = Array.from({ length: 16 }, (_, i) => new Participant(i + 1, i + 1));

  // 打亂參賽者的順序，以確保比賽隨機性
  participants.sort(() => Math.random() - 0.5);

  // 生成所有可能的比賽組合
  const allMatches: Match[] = generateMatches(participants);

  // 輸出比賽組合
  const matchesJSON: string = printMatches(allMatches);
  
  return matchesJSON
})