import type { QuickActionsGridProps } from "../types";
import type { QuickActionItem } from "../../../data/quickActions/types";
import { contributionQuickActions, progressQuickActions } from "../../../data/quickActions/quickActions";

export const quickActionsByKind: Record<QuickActionsGridProps["kind"], QuickActionItem[]> = {
  progress: progressQuickActions,
  contribution: contributionQuickActions,
};


