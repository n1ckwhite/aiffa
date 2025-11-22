export const getShowGlobalBg = (pathname: string): boolean => {
  if (!pathname) return false;
  const clean = (pathname.split(/[?#]/)[0].replace(/\/+$/, '')) || '/';
  if (clean === '/' || clean === '/profile' || clean.startsWith('/weekly')) return true;
  if (!clean.startsWith('/learn')) return false;
  const segs = clean === '/learn' ? ['learn'] : clean.slice(1).split('/');
  if (segs.length === 1) return true;
  return segs.length === 2 || (segs.length === 3 && segs[2] === 'projects');
};



