export const getMedal = (index?: number | null) => {
  if (index === undefined || index === null) return null;
  if (index === 1) return "🥇";
  if (index === 2) return "🥈";
  if (index === 3) return "🥉";
  return "🏅";
};


