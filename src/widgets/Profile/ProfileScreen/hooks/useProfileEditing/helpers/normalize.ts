export const normalizeText = (value: string, fallback: string) => {
  const trimmed = (value || '').trim();
  return trimmed || fallback;
};

export const extractGithubUsername = (url: string) => {
  const match = (url || '').trim().match(/github\.com\/(?:users\/)?([A-Za-z0-9-_.]+)/i);
  return match?.[1] || '';
};

