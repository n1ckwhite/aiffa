import { useMarkdownColors } from '../../../colors/useMarkdownColors';

export const useDetailsBlockColors = () => {
  const c = useMarkdownColors();
  return {
    detailsCardBorder: c.detailsCardBorder,
    detailsCardBg: c.detailsCardBg,
    detailsBadgeColor: c.detailsBadgeColor,
    detailsTitle: c.detailsTitle,
  };
};


