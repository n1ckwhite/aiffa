import React from 'react';
import PillBadge from 'shared/ui/PillBadge';

export const TagBadge: React.FC<{ tag: string; colorScheme?: string }> = ({ tag, colorScheme }) => {
  return (
    <PillBadge colorScheme={(colorScheme as any) || 'blue'} variant="outline">
      {tag}
    </PillBadge>
  );
};


