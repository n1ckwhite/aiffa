import React from "react";
import type { PeopleListItem } from "../../../types";
import { UsePeopleFollowStateResult } from "./types";

export const usePeopleFollowState = (items: PeopleListItem[]): UsePeopleFollowStateResult => {
  const initialFollowById = React.useMemo(() => {
    const entries = items.map((i) => [i.id, !!i.initialIsFollowing] as const);
    return Object.fromEntries(entries) as Record<string, boolean>;
  }, [items]);

  const [isFollowingById, setIsFollowingById] = React.useState<Record<string, boolean>>(initialFollowById);

  React.useEffect(() => {
    setIsFollowingById(initialFollowById);
  }, [initialFollowById]);

  const onToggleFollowById = React.useCallback((userId: string) => {
    setIsFollowingById((prev) => {
      const next = { ...prev };
      const current = !!next[userId];
      next[userId] = !current;
      return next;
    });
  }, []);

  return { isFollowingById, onToggleFollowById };
};

