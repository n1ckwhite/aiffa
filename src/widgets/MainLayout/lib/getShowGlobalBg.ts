export const getShowGlobalBg = (pathname: string): boolean => {
  if (!pathname) return false;
  const cleanPath = pathname.split(/[?#]/)[0].replace(/\/+$/, '') || '/';

  const exactMatches = new Set<string>(['/', '/profile']);
  if (exactMatches.has(cleanPath)) return true;

  const prefixMatches = ['/weekly', '/partners'];
  if (prefixMatches.some((prefix) => cleanPath.startsWith(prefix))) return true;

  if (!cleanPath.startsWith('/learn')) return false;

  const segments =
    cleanPath === '/learn' ? ['learn'] : cleanPath.slice(1).split('/');

  if (segments.length === 1 || segments.length === 2) return true;

  return segments.length === 3 && segments[2] === 'projects';
};



