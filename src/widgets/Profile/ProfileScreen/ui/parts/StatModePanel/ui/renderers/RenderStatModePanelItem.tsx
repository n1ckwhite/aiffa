"use client";

import React from "react";
import type {
  MaterialStatModePanelItem,
  PlainStatModePanelItem,
  ProjectStatModePanelItem,
  StatModePanelItem,
  WeeklyStatModePanelItem,
} from "../../model";
import { MaterialCardItem, PlainListItem, ProjectCardItem, WeeklyCardItem } from "../parts";

type CardVariant = "weekly" | "material" | "project" | "plain";

const getVariant = (item: StatModePanelItem): CardVariant => item.cardVariant ?? "plain";

export type RenderStatModePanelItemProps = {
  item: StatModePanelItem;
  titleDomId: string;
  mutedColor: string;
  cardBorder: string;
};

const renderByVariant: Record<CardVariant, (props: RenderStatModePanelItemProps) => React.ReactNode> = {
  weekly: ({ item, titleDomId, mutedColor }) => (
    <WeeklyCardItem item={item as WeeklyStatModePanelItem} titleDomId={titleDomId} mutedColor={mutedColor} />
  ),
  material: ({ item }) => <MaterialCardItem item={item as MaterialStatModePanelItem} />,
  project: ({ item }) => <ProjectCardItem item={item as ProjectStatModePanelItem} />,
  plain: ({ item, titleDomId, mutedColor, cardBorder }) => (
    <PlainListItem
      item={item as PlainStatModePanelItem}
      titleDomId={titleDomId}
      cardBorder={cardBorder}
      mutedColor={mutedColor}
    />
  ),
};

export const RenderStatModePanelItem: React.FC<RenderStatModePanelItemProps> = (props) => {
  const variant = getVariant(props.item);
  return <>{renderByVariant[variant](props)}</>;
};

