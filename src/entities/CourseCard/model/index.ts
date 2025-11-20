export const getLevelColor = (level?: string): string => {
  switch (level) {
    case 'Начальный':
      return 'green';
    case 'Средний':
      return 'yellow';
    case 'Продвинутый':
      return 'red';
    default:
      return 'gray';
  }
};


