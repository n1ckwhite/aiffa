import { HackathonWinner } from "@/widgets/Creators/model/hackathonWinners";

export type HackathonWinnerCardProps = {
  teamName: string;
  place: HackathonWinner["place"];
  hackathonTitle: string;
  description: string;
  members: HackathonWinner["members"];
};


