import type { HeroAction } from "../types";

export const heroContent = {
  overline: "AIFFA",
  titleLines: ["Растёшь, когда действуешь.", "Вся сила в практике."],
  description:
    "AIFFA — платформа, где ты растёшь через практику: решаешь задачи, получаешь фидбек и видишь прогресс в профиле. Без “когда‑нибудь начну” — только следующий шаг.",
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
