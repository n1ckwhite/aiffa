export const pickAchievedItems = (items: unknown) => {
  if (!Array.isArray(items)) return [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const list = items as any[];
  return list.filter((i) => i?.achieved).slice(0, 6);
};

