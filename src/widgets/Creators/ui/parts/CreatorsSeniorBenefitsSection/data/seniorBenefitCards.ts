import { FiMessageCircle, FiShare2, FiTrendingUp } from "react-icons/fi";
import type { SeniorBenefitCard } from "../types";

export const seniorBenefitCards: SeniorBenefitCard[] = [
  {
    title: "Глубже прокачиваете экспертизу",
    description:
      "Объясняя сложные вещи, вы структурируете знания и закрываете пробелы — это ускоряет рост синьоров и лидов.",
    icon: FiTrendingUp,
    paletteIndex: 0,
  },
  {
    title: "Получаете обратную связь и идеи",
    description:
      "Люди применяют ваши материалы и задачи, задают вопросы, предлагают улучшения — это даёт свежий взгляд на архитектуру и практики.",
    icon: FiMessageCircle,
    paletteIndex: 1,
  },
  {
    title: "Строите сеть и усиливаете репутацию",
    description:
      "Вы становитесь заметнее в сообществе: люди, которым вы помогли, готовы прийти на ревью, в спринт или в хакатон и закрыть сложные задачи плечом к плечу.",
    icon: FiShare2,
    paletteIndex: 2,
  },
];


