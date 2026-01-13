import type { ReactNode } from "react";

export type UseMaterialCardItemMetaArgs = {
  to: string;
  dateIso?: string;
};

export type UseMaterialCardItemMetaResult = {
  dateLabel: string;
  cardIndexLabel: ReactNode;
  isStarred: boolean;
};