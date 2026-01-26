import { FiArrowRightCircle, FiCheckCircle, FiCompass, FiMessageCircle, FiTrendingUp } from "react-icons/fi";
import type { HowItWorksStep } from "../types/steps";

export const howItWorksSteps: HowItWorksStep[] = [
  {
    title: "Выбираешь шаг",
    desc: "Берёшь weekly или тему — чтобы не тратить силы на “с чего начать”.",
    icon: FiCompass,
    accent: "blue",
  },
  {
    title: "Делаешь практику",
    desc: "Решаешь во встроенной IDE и получаешь опыт через действие.",
    icon: FiCheckCircle,
    accent: "green",
  },
  {
    title: "Помогаешь другим",
    desc: "Подсказываешь, отвечаешь и даёшь фидбек — так растёшь быстрее и легче работаешь в команде.",
    icon: FiMessageCircle,
    accent: "purple",
  },
  {
    title: "Фиксируешь прогресс",
    desc: "Получаешь ревью, улучшаешь решение и видишь рост по действиям — шаг за шагом.",
    icon: FiTrendingUp,
    accent: "orange",
  },
  {
    title: "Берёшь следующий шаг",
    desc: "Собираешь план и идёшь дальше — к проектам и более сложным задачам.",
    icon: FiArrowRightCircle,
    accent: "teal",
  },
];
