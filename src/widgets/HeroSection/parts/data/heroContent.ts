import type { HeroAction } from "../types";

export const heroContent = {
  overline: "AIFFA",
  titleLines: ["Растёшь, когда действуешь.", "Вся сила в практике."],
  description:
    "Материалы по фронтенду для собеседований: короткие темы, практический фокус и ясные формулировки, чтобы быстро освежить базу.",
  actions: [
    {
      id: "primary",
      label: "Начать с материалов",
      to: "/learn",
      ariaLabel: "Начать с материалов",
      kind: "primary",
    },
  ] satisfies HeroAction[],
};
