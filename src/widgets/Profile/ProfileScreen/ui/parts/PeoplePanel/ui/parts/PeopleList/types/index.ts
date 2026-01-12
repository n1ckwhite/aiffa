import type { PeopleListItem } from "../../../../types";

export type PeopleListProps = {
  items: PeopleListItem[];
  isFollowingById: Record<string, boolean>;
  onToggleFollowById: (userId: string) => void;
};


