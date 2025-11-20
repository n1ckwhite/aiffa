export const useTaskMeta = (difficulty?: 'easy' | 'medium' | 'hard', minutes?: number) => {
  const parts: string[] = [];
  if (difficulty) parts.push(difficulty === 'easy' ? 'легко' : difficulty === 'hard' ? 'сложно' : 'средне');
  if (typeof minutes === 'number' && minutes > 0) parts.push(`${minutes} мин`);
  const text = parts.length ? parts.join(' · ') : null;
  return { text };
};


