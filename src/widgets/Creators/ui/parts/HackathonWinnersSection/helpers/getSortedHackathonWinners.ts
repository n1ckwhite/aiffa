import type { HackathonWinner } from "../../../model/hackathonWinners";

export const getSortedHackathonWinners = (winners: HackathonWinner[] = []) =>
  [...winners].sort((a, b) => a.place - b.place).slice(0, 3);


