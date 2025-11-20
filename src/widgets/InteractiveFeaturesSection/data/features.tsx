import { Box } from '@chakra-ui/react';
import type { Feature } from '../types';

export const features: Feature[] = [
  {
    icon: (
      <Box as="svg" w="24px" h="24px" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </Box>
    ),
    title: 'Сообщество и вклад',
    description: 'Каждый может вносить вклад в материалы, задачи, хакатоны и проекты — вклад виден и ценится.',
    color: 'blue',
  },
  {
    icon: (
      <Box as="svg" w="24px" h="24px" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </Box>
    ),
    title: 'Профиль и GitHub',
    description: 'Привязывайте GitHub, накапливайте вклад и показывайте свой профиль участникам и работодателям.',
    color: 'green',
  },
  {
    icon: (
      <Box as="svg" w="24px" h="24px" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
      </Box>
    ),
    title: 'Обучение через практику',
    description: 'Учитесь на реальных задачах и помогайте новичкам — обучая других, растёте сами.',
    color: 'purple',
  },
  {
    icon: (
      <Box as="svg" w="24px" h="24px" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </Box>
    ),
    title: 'Открытая экосистема',
    description: 'Материалы и код открыты: предлагайте улучшения через Pull Request.',
    color: 'orange',
  },
  {
    icon: (
      <Box as="svg" w="24px" h="24px" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </Box>
    ),
    title: 'Хакатоны и проекты',
    description: 'Участвуйте в совместных проектах и ивентах, собирайте портфолио и опыт.',
    color: 'cyan',
  },
  {
    icon: (
      <Box as="svg" w="24px" h="24px" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </Box>
    ),
    title: 'Поддержка и рост',
    description: 'Подготовка к собеседованиям, разбор вопросов и менторская поддержка сообщества.',
    color: 'teal',
  },
];



