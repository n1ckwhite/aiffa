import type { ToneKey } from "../types";

export const progressMechanicsContent = {
  header: {
    overline: "Механика прогресса",
    title: "Рост фиксируется в действиях",
    description:
      "Профиль, XP и достижения показывают не “что ты знаешь”, а что ты реально сделал и как стабильно растёшь.",
  },
  profile: {
    overline: "Прогресс в профиле",
    title: "Прогресс → профиль → работодатели",
    description:
      "Когда рост стабилен и подтверждён действиями — это видно и становится сильным аргументом при найме.",
    bullets: [
      {
        id: "progress",
        title: "Прогресс",
        text: "Практика и результаты фиксируются автоматически.",
        tone: "blue" as ToneKey,
      },
      {
        id: "profile",
        title: "Профиль",
        text: "История действий превращается в понятное резюме.",
        tone: "purple" as ToneKey,
      },
      {
        id: "employer",
        title: "Работодатели",
        text: "Сильные кейсы повышают шанс быстрого оффера.",
        tone: "green" as ToneKey,
      },
    ],
  },
};
