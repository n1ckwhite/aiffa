"use client";
import React from "react";

import {
  ArticleCardItem,
  HackathonCardItem,
  MaterialCardItem,
  PlainListItem,
  ProjectCardItem,
  SessionCardItem,
  WeeklyCardItem,
} from "../parts";
import { CardVariant, RenderStatModePanelItemProps } from "./types";

export const RenderStatModePanelItem: React.FC<RenderStatModePanelItemProps> = ({ item, ...props }) => {
  const { cardVariant = "plain" } = item;
  
  const components: Record<CardVariant, React.FC<any>> = {
    weekly: WeeklyCardItem,
    material: MaterialCardItem,
    project: ProjectCardItem,
    hackathon: HackathonCardItem,
    session: SessionCardItem,
    article: ArticleCardItem,
    plain: PlainListItem,
  };

  const Component = components[cardVariant];
  return <Component item={item} {...props} />;
};
