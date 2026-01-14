import type { ComponentType } from "react";
import type { ProfilePeopleMode } from "../../../../model/types";
import type { StatModePanelItem, StatModePanelPaginationConfig } from "../../../parts/StatModePanel/model";

export type StatModePanelConfig = {
  title: string;
  description: string;
  icon?: ComponentType<any>;
  items: readonly StatModePanelItem[];
  pagination?: StatModePanelPaginationConfig;
};

export type StatModePanelsByMode = Partial<Record<ProfilePeopleMode, StatModePanelConfig>>;

