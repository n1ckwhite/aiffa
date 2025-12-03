export type HowItWorksStepId =
  | "announce"
  | "teams"
  | "task"
  | "work"
  | "submission"
  | "review"
  | "awards";

export type HowItWorksStep = {
  id: HowItWorksStepId;
  number: string;
  title: string;
  description: string;
};


