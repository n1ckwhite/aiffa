import { FiMessageCircle, FiTarget, FiUsers } from "react-icons/fi";
import type { HeroBullet } from "../types";

export const heroBullets: HeroBullet[] = [
  {
    icon: FiUsers,
    text: "Помогают улучшать материалы и задачи, чтобы обучение оставалось актуальным.",
    paletteIndex: 0,
  },
  {
    icon: FiTarget,
    text: "Задают направление развития и помогают не застрять на сложных темах.",
    paletteIndex: 1,
  },
  {
    icon: FiMessageCircle,
    text: "Создают поддерживающее сообщество, где можно задать вопрос и получить отзыв.",
    paletteIndex: 2,
  },
];


