import type { IconType } from 'react-icons';
import { FaClock, FaQuoteRight, FaSitemap, FaUnlock } from 'react-icons/fa';

export type AdvantageItem = {
  title: string;
  description: string;
  icon: IconType;
};

export const advantagesItems: AdvantageItem[] = [
  {
    title: 'Короткие блоки',
    description: 'Только суть, без воды. Повторить тему за 10–15 минут.',
    icon: FaClock,
  },
  {
    title: 'Ключевые формулировки',
    description: 'Термины, примеры и структура ответов на типичные вопросы.',
    icon: FaQuoteRight,
  },
  {
    title: 'Структура по темам',
    description: 'От основ до продвинутых: по порядку или по нужной теме.',
    icon: FaSitemap,
  },
  {
    title: 'Бесплатно и открыто',
    description: 'Доступно всем, без подписок и ограничений.',
    icon: FaUnlock,
  },
];
