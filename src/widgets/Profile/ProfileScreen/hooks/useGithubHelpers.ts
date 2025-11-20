export const GH_PREFIX = 'https://github.com/';

export const parseGithubUsername = (url?: string) => {
  if (!url) return '';
  const m = url.match(/github\.com\/(?:users\/)?([A-Za-z0-9-_.]+)\/?$/i);
  return m?.[1] || '';
};


