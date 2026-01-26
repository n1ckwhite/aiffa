import type { HeroAction } from "../types";

export const heroContent = {
  overline: "AIFFA",
  titleLines: ["Растёшь, когда действуешь.", "Вся сила в практике."],
  description:
    "AIFFA — платформа, где ты растёшь через практику: решаешь задачи, получаешь фидбек и видишь прогресс в профиле. Без “когда‑нибудь начну” — только следующий шаг.",
  actions: [
    {
      id: "primary",
      label: "Решить первую задачу",
      to: "/weekly",
      ariaLabel: "Решить первую задачу",
      kind: "primary",
    },
    {
      id: "secondary",
      label: "Построить роудмэп",
      to: "/learn",
      ariaLabel: "Построить роудмэп",
      kind: "secondary",
    },
  ] satisfies HeroAction[],
};
