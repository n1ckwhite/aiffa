import type { QuickActionId } from "../../../data/quickActions/types";
import { useProfileScreenUiColors } from "../../../../colors/useProfileScreenUiColors";
import type { ActionStyle } from "../types";

type UiColors = ReturnType<typeof useProfileScreenUiColors>;

export const actionStyleById: Record<QuickActionId, (colors: UiColors) => ActionStyle> = {
  write: (c) => ({ bg: c.qaWriteBg, border: c.qaWriteBorder, hoverBg: c.qaWriteHoverBg, activeBg: c.qaWriteActiveBg }),
  learn: (c) => ({ bg: c.qaMaterialsBg, border: c.qaMaterialsBorder, hoverBg: c.qaMaterialsHoverBg, activeBg: c.qaMaterialsActiveBg }),
  weekly: (c) => ({ bg: c.qaWeeklyBg, border: c.qaWeeklyBorder, hoverBg: c.qaWeeklyHoverBg, activeBg: c.qaWeeklyActiveBg }),
  blog: (c) => ({ bg: c.qaBlogBg, border: c.qaBlogBorder, hoverBg: c.qaBlogHoverBg, activeBg: c.qaBlogActiveBg }),
  hackathons: (c) => ({ bg: c.qaHackathonsBg, border: c.qaHackathonsBorder, hoverBg: c.qaHackathonsHoverBg, activeBg: c.qaHackathonsActiveBg }),
  sessions: (c) => ({ bg: c.qaSessionsBg, border: c.qaSessionsBorder, hoverBg: c.qaSessionsHoverBg, activeBg: c.qaSessionsActiveBg }),
};


