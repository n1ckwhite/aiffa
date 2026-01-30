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
    description: 'Только суть, без воды. Удобно повторить тему за 10–15 минут перед собеседованием или освежить в памяти перед задачей.',
    icon: FaClock,
    iconColorKey: 'blue',
  },
  {
    title: 'Ключевые формулировки',
    description: 'Термины, примеры и структура ответов на типичные вопросы интервью. Как говорить коротко и по делу, без лишних слов.',
    icon: FaQuoteRight,
    iconColorKey: 'purple',
  },
  {
    title: 'Структура по темам',
    description: 'От основ до продвинутых: идите по порядку или прыгайте к нужной теме. Удобно закрывать пробелы точечно.',
    icon: FaSitemap,
    iconColorKey: 'green',
  },
  {
    title: 'Бесплатно и открыто',
    description: 'Доступно всем, без подписок и ограничений. Учитесь в своём темпе, возвращайтесь к темам когда удобно.',
    icon: FaUnlock,
    iconColorKey: 'teal',
  },
];
