import type { SubmissionCard } from "../types";
import { CheckCircleIcon, EditIcon, ExternalLinkIcon, ViewIcon } from "@chakra-ui/icons";
import React from "react";

export const useHackathonsSubmissionCards = (): SubmissionCard[] => [
  {
    id: "requirements",
    title: "Требования",
    description:
      "Кратко опишите, что именно вы реализовали и какие критерии задачи закрыли. Это помогает жюри быстро понять, на чём вы сфокусировались.",
  },
  {
    id: "github",
    title: "GitHub",
    description:
      "Репозиторий с кодом и понятной структурой: отдельные директории, аккуратные коммиты и доступ для чтения. Это главный источник правды по вашему решению.",
  },
  {
    id: "readme",
    title: "README",
    description:
      "Несколько абзацев о запуске проекта, стеке, архитектуре и том, как вы распределили роли в команде. Хороший README — это мини-презентация вашего решения.",
  },
  {
    id: "demo",
    title: "Демо",
    description:
      "Ссылка на развернутый прототип или запись демонстрации, если деплой невозможен. Так жюри и партнёрам проще увидеть решение в действии.",
  },
];

export const createCardConfigMap = (
  requirementsCircleBg: string,
  githubCircleBg: string,
  readmeCircleBg: string,
  demoCircleBg: string
): Record<string, { circleBg: string; iconNode: React.ReactNode }> => ({
  requirements: {
    circleBg: requirementsCircleBg,
    iconNode: <CheckCircleIcon color="white" boxSize={4} />,
  },
  github: {
    circleBg: githubCircleBg,
    iconNode: <ExternalLinkIcon color="white" boxSize={4} />,
  },
  readme: {
    circleBg: readmeCircleBg,
    iconNode: <EditIcon color="white" boxSize={4} />,
  },
  demo: {
    circleBg: demoCircleBg,
    iconNode: <ViewIcon color="white" boxSize={4} />,
  },
});

