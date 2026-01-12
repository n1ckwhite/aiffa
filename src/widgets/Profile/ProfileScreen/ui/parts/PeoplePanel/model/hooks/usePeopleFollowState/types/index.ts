export type UsePeopleFollowStateResult = {
    isFollowingById: Record<string, boolean>;
    onToggleFollowById: (userId: string) => void;
  };