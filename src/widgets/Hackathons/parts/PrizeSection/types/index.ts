export type PrizeTierId = "first" | "second" | "third";

export type PrizeTier = {
  id: PrizeTierId;
  placeLabel: string;
  amountLabel: string;
  description: string;
  accentColor: string;
};
