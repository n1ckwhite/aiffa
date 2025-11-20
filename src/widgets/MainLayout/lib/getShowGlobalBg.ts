export const getShowGlobalBg = (pathname: string): boolean => {
  if (!pathname) return false;
  return pathname === '/' || pathname === '/profile' || pathname.startsWith('/weekly');
};



