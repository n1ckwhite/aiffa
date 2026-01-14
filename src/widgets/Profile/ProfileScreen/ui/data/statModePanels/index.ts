import type { StatModePanelsByMode } from "./shared/types";
import { materialsPanel } from "./materials";
import { projectsPanel } from "./projects";
import { hackathonsPanel } from "./hackathons";
import { sessionsPanel } from "./sessions";
import { contribArticlesPanel, contribMaterialsPanel, contribProjectsPanel, contribWeeklyPanel } from "./contrib";

export const STAT_MODE_PANELS_BY_MODE: StatModePanelsByMode = {
  materials: materialsPanel,
  projects: projectsPanel,
  hackathons: hackathonsPanel,
  sessions: sessionsPanel,
  "contrib-materials": contribMaterialsPanel,
  "contrib-projects": contribProjectsPanel,
  "contrib-weekly": contribWeeklyPanel,
  "contrib-articles": contribArticlesPanel,
};

export * from "./shared/types";

