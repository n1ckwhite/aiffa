export const norm = (str: string) =>
  (str || '')
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[\s/._-]+/g, ' ')
    .trim();

export const subseqScore = (query: string, text: string): number => {
  if (!query || !text) return 0;
  let qi = 0;
  let ti = 0;
  while (qi < query.length && ti < text.length) {
    if (query[qi] === text[ti]) qi += 1;
    ti += 1;
  }
  const matched = qi;
  return matched / Math.max(1, query.length);
};

export const scoreCandidate = (q: string, title: string, moduleTitle: string, id: string): number => {
  if (!q) return 0;
  const Q = norm(q);
  const T = norm(title);
  const M = norm(moduleTitle);
  const I = norm(id);
  if (!Q) return 0;
  let score = 0;
  if (T.includes(Q)) score += 90;
  if (M.includes(Q)) score += 30;
  if (I.includes(Q)) score += 20;
  const tokens = Q.split(' ').filter(Boolean);
  for (const tok of tokens) {
    if (T.includes(tok)) score += 20;
    else if (M.includes(tok)) score += 8;
    else score += Math.floor(subseqScore(tok, T) * 12);
    if (T.startsWith(tok)) score += 6;
  }
  score += Math.max(0, 20 - Math.floor(T.length / 12));
  return score;
};



