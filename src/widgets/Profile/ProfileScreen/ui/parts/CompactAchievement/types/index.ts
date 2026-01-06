export type CompactAchievementProps = {
  // Achievements data comes from `useAchievementsData` and isn't strongly typed today.
  // Keeping `any` here isolates that looseness to a single UI component.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
};


