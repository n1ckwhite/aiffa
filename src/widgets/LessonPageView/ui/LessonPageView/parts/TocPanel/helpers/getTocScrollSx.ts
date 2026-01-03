export const getTocScrollSx = () =>
  ({
    overflowY: 'auto',
    overflowX: 'hidden',
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgba(120,120,120,0.45) transparent',
    '&::-webkit-scrollbar': { width: '6px' },
    '&::-webkit-scrollbar-thumb': { background: 'rgba(120,120,120,0.45)', borderRadius: '999px' },
    '&::-webkit-scrollbar-track': { background: 'transparent' },
  }) as const;


