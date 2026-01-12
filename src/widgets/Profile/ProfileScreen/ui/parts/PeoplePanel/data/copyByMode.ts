import type { PeoplePanelMode } from "../types";

export type PanelCopy = {
  title: string;
  description: string;
  emptyTitle: string;
  emptyDescription: string;
  ctaLabel: string;
  ctaHref: string;
};

export const copyByMode: Record<PeoplePanelMode, PanelCopy> = {
  followers: {
    title: "Подписчики",
    description: "Люди, которые подписались на ваш профиль.",
    emptyTitle: "Пока нет подписчиков",
    emptyDescription: "Когда кто-то подпишется, он появится здесь.",
    ctaLabel: "Открыть создателей",
    ctaHref: "/creators",
  },
  following: {
    title: "Подписки",
    description: "Люди, на которых вы подписаны.",
    emptyTitle: "Вы ни на кого не подписаны",
    emptyDescription: "Подпишитесь на создателей — и они появятся в этом списке.",
    ctaLabel: "Найти создателей",
    ctaHref: "/creators",
  },
};

