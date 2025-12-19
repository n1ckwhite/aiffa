export const computeWillAllDone = (profile: unknown, taskId: string) => {
  const list = Array.isArray((profile as any)?.weeklyTasks) ? (profile as any).weeklyTasks : [];
  if (!list.length) return false;
  return list.every((t: any) => (t?.id === taskId ? true : !!t?.done));
};

