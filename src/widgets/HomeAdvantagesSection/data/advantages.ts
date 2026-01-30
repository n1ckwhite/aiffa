import type { IconType } from 'react-icons';
import { FaClock, FaQuoteRight, FaSitemap, FaUnlock } from 'react-icons/fa';

export type IconColorKey = 'blue' | 'purple' | 'green' | 'teal';

export type AdvantageItem = {
  title: string;
  description: string;
  icon: IconType;
  iconColorKey: IconColorKey;
};

export const advantagesItems: AdvantageItem[] = [
  {
    title: 'Короткие блоки',
    description: 'Только суть, без воды. Повторить тему за 10–15 минут.',
    icon: FaClock,
    iconColorKey: 'blue',
  },
  {
    title: 'Ключевые формулировки',
    description: 'Термины, примеры и структура ответов на типичные вопросы.',
    icon: FaQuoteRight,
    iconColorKey: 'purple',
  },
  {
    title: 'Структура по темам',
    description: 'От основ до продвинутых: по порядку или по нужной теме.',
    icon: FaSitemap,
    iconColorKey: 'green',
  },
  {
    title: 'Бесплатно и открыто',
    description: 'Доступно всем, без подписок и ограничений.',
    icon: FaUnlock,
    iconColorKey: 'teal',
  },
];
