export const getChipColors = (colorMode: 'light' | 'dark', level: 'beginner' | 'intermediate' | 'advanced') => {
  if (colorMode === 'light') {
    return level === 'beginner'
      ? { bg: 'green.50', border: 'green.100', text: 'green.700' }
      : level === 'intermediate'
        ? { bg: 'yellow.50', border: 'yellow.100', text: 'yellow.700' }
        : { bg: 'red.50', border: 'red.100', text: 'red.600' };
  }
  return level === 'beginner'
    ? { bg: 'whiteAlpha.200', border: 'whiteAlpha.300', text: 'green.200' }
    : level === 'intermediate'
      ? { bg: 'whiteAlpha.200', border: 'whiteAlpha.300', text: 'yellow.200' }
      : { bg: 'whiteAlpha.200', border: 'whiteAlpha.300', text: 'red.200' };
};



