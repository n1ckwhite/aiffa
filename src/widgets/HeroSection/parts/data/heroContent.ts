import type { HeroAction } from "../types";

export const heroContent = {
  overline: "AIFFA",
  titleLines: ["Материалы для собеседований по фронтенду.", "Короткие конспекты и ключевые вопросы."],
  description:
    "Собрали темы, формулировки и примеры, чтобы быстро повторить базу и уверенно отвечать на интервью.",
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
