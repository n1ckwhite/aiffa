import React from 'react';
import type { SolvedById } from '../types';

export const useTasksProgress = (tasks: any[]) => {
  const [solvedById, setSolvedById] = React.useState<SolvedById>({});
  const [celebrate, setCelebrate] = React.useState(false);
  const [celebratedOnce, setCelebratedOnce] = React.useState(false);

  const solvedCount = Object.values(solvedById).filter(Boolean).length;

  React.useEffect(() => {
    if (!celebratedOnce && tasks.length > 0 && solvedCount === tasks.length) {
      setCelebrate(true);
      setCelebratedOnce(true);
    }
  }, [solvedCount, tasks.length, celebratedOnce]);

  return {
    solvedById,
    setSolvedById,
    solvedCount,
    celebrate,
    setCelebrate,
  };
};


