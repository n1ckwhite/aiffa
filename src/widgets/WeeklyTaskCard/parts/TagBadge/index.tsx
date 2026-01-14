import React from 'react';
import PillBadge from 'shared/ui/PillBadge';

export const TagBadge: React.FC<{ tag: string; colorScheme?: string }> = ({ tag, colorScheme }) => {
  const normalizedTag = (tag ?? "").trim().toLowerCase();
  const resolvedScheme =
    normalizedTag === "css"
      ? "blue"
      : ((colorScheme as any) || "blue");

  return (
    <PillBadge colorScheme={resolvedScheme} variant="outline">
      {tag}
    </PillBadge>
  );
};


