import type { ModulesFaqItem, ModulesFaqVariant } from '../types/ModulesFAQ.types';

export const materialsFaqItems: ModulesFaqItem[] = [
  {
    title: 'Что это за материалы?',
    content:
      'Материалы по фронтенду для подготовки к собеседованиям: короткие темы с понятной структурой, ключевыми концепциями и типичными вопросами. Помогают быстро освежить базу, закрыть пробелы и собрать «картину целиком» перед интервью.',
  },
  {
    title: 'Подходят ли для подготовки к собеседованию?',
    content:
      'Да. Каждая тема — это компактный конспект с опорными тезисами и терминологией, которую обычно ожидают на собеседовании. Удобно использовать как чек‑лист: что повторить, что закрепить и какие формулировки держать в голове.',
  },
];
type ModulesFaqConfig = {
  title: string;
  items: ModulesFaqItem[];
};

export const modulesFaqConfig: Record<ModulesFaqVariant, ModulesFaqConfig> = {

  materials: {
    title: 'Частые вопросы о материалах',
    items: materialsFaqItems,
  },
};
