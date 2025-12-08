export const getItemCardMeta = (lesson: any, colors: any) => {
  const totalTasks = ((lesson as any).tasks?.length ?? 0) as number;

  const authors = (lesson as any).authors as
    | Array<{ username: string; name?: string }>
    | undefined;

  const starsCount = Number((lesson as any).ratingCount ?? 0);
  const views = Number((lesson as any).views ?? 0);

  const metaColor = (colors as any).descColor ?? "gray.500";
  const accentColor =
    (colors as any).accent ?? (colors as any).blue?.accent ?? "blue.400";
  const chipBorder =
    (colors as any).chipBorder ??
    (colors as any).blue?.chipBorder ??
    "blackAlpha.200";

  return {
    totalTasks,
    authors,
    starsCount,
    views,
    metaColor,
    accentColor,
    chipBorder,
  };
};


