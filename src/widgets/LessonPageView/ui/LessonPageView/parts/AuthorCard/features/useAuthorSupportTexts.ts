export const useAuthorSupportTexts = (isStarred: boolean) => {
  const tooltipLabel = isStarred
    ? 'Спасибо! Автор увидит вашу поддержку ✨'
    : 'Отметить материал полезным';

  const supportLabel = isStarred ? 'Вы уже поддержали' : 'Спасибо автору';

  return {
    tooltipLabel,
    supportLabel,
  };
};



