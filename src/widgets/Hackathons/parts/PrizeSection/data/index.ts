import type { PrizeTier } from "../types";

export const useHackathonsPrizeTiers = (): PrizeTier[] => [
  {
    id: "first",
    placeLabel: "1 место",
    amountLabel: "50 000 ₽",
    description:
      "Для команды, которая лучше всех раскрыла задачу и собрала сильное демо.",
    accentColor: "yellow.400",
  },
  {
    id: "second",
    placeLabel: "2 место",
    amountLabel: "30 000 ₽",
    description:
      "Для команды с сильным решением и качественной подачей проекта.",
    accentColor: "purple.300",
  },
  {
    id: "third",
    placeLabel: "3 место",
    amountLabel: "20 000 ₽",
    description:
      "Для команды, которая показала классный прогресс и интересный подход к задаче.",
    accentColor: "blue.300",
  },
];


