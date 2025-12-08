export const useAuthorSupportTexts = (
  isStarred: boolean,
  context: 'lesson' | 'project' = 'lesson',
) => {
  const targetLabel = context === 'project' ? 'проект' : 'материал';

  const tooltipLabel = isStarred
    ? 'Спасибо! Автор увидит вашу поддержку ✨'
    : `Отметить ${targetLabel} полезным`;

  const supportLabel = isStarred ? 'Вы уже поддержали' : 'Спасибо автору';

  return {
    tooltipLabel,
    supportLabel,
  };
};



