import { CheckCircleIcon, TimeIcon, StarIcon, SettingsIcon } from '../icons';
import type { FeatureItem } from './types';

export const features: FeatureItem[] = [
  {
    icon: CheckCircleIcon,
    title: 'Задачи и решения',
    description: 'Короткие задания с разбором. Прокачка навыков без «воды»',
  },
  {
    icon: TimeIcon,
    title: 'Собственный темп',
    description: 'Изучайте в удобное время, без дедлайнов и ограничений по времени',
  },
  {
    icon: StarIcon,
    title: 'Актуальные технологии',
    description: 'Изучайте современный стек: React, Node.js, TypeScript и многое другое',
  },
  {
    icon: SettingsIcon,
    title: 'Бесплатно и доступно',
    description: 'Материалы открыты без регистрации. Удобно читать даже в метро',
  },
];


