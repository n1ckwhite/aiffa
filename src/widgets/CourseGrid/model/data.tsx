import React from 'react';
import { Box } from '@chakra-ui/react';
import type { CourseItem } from './types';

export const courses: CourseItem[] = [
  { id: 0, moduleId: 'bazovye-komandy', category: 'base', title: 'Базовые команды', description: 'Терминал, Git, npx и базовые инструменты', lessonsCount: 15, studyTime: '3–7 дней', level: 'Начальный',
    icon: (<Box as="svg" w="20px" h="20px" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></Box>) },
  { id: 1, moduleId: 'html-css', category: 'frontend', title: 'HTML & CSS', description: 'Создание веб-страниц с красивым дизайном', lessonsCount: 47, studyTime: '2–4 недели', level: 'Начальный',
    icon: (
      <Box
        as="svg"
        w="20px"
        h="20px"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293L19 8.586A1 1 0 0120 9.293V19a2 2 0 01-2 2z"
        />
      </Box>
    ) },
  { id: 2, moduleId: 'javascript', category: 'frontend', title: 'JavaScript', description: 'Изучение языка программирования JavaScript', lessonsCount: 92, studyTime: '5–8 недель', level: 'Начальный',
    icon: (<Box as="svg" w="20px" h="20px" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></Box>) },
  { id: 3, moduleId: 'setevoe-vzaimodeistvie', category: 'frontend', title: 'Сетевое взаимодействие', description: 'Работа с API и веб-сетями', lessonsCount: 35, studyTime: '2–3 недели', level: 'Средний',
    icon: (<Box as="svg" w="20px" h="20px" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" /></Box>) },
  { id: 4, moduleId: 'fundamentalnye-navyki', category: 'base', title: 'Фундаментальные навыки', description: 'Основы алгоритмов и структур данных', lessonsCount: 11, studyTime: '3–5 недель', level: 'Средний',
    icon: (<Box as="svg" w="20px" h="20px" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></Box>) },
  { id: 5, moduleId: 'inzhenernaya-kultura', category: 'base', title: 'Инженерная культура', description: 'Принципы и практики современной разработки', lessonsCount: 19, studyTime: '1–2 недели', level: 'Средний',
    icon: (<Box as="svg" w="20px" h="20px" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></Box>) },
  { id: 6, moduleId: 'npm', category: 'devops', title: 'NPM', description: 'Управление пакетами и зависимостями', lessonsCount: 34, studyTime: '1 неделя', level: 'Средний',
    icon: (
      <Box
        as="svg"
        w="20px"
        h="20px"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </Box>
    ) },
  { id: 7, moduleId: 'sborka-bundle', category: 'devops', title: 'Сборка bundle', description: 'Современные инструменты сборки проектов', lessonsCount: 14, studyTime: '2–3 недели', level: 'Средний',
    icon: (
      <Box
        as="svg"
        w="20px"
        h="20px"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </Box>
    ) },
  { id: 8, moduleId: 'react', category: 'frontend', title: 'React', description: 'Современная библиотека для создания пользовательских интерфейсов', lessonsCount: 19, studyTime: '4–6 недель', level: 'Продвинутый',
    icon: (<Box as="svg" w="20px" h="20px" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></Box>) },
  { id: 9, moduleId: 'react-native', category: 'frontend', title: 'React Native', description: 'Разработка мобильных приложений на React', lessonsCount: 8, studyTime: '4–6 недель', level: 'Продвинутый',
    icon: (<Box as="svg" w="20px" h="20px" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 01-2 2z" /></Box>) },
  { id: 10, moduleId: 'nodejs', category: 'backend', title: 'Node.js', description: 'JavaScript на сервере', lessonsCount: 13, studyTime: '4–6 недель', level: 'Продвинутый',
    icon: (
      <Box
        as="svg"
        w="20px"
        h="20px"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
        />
      </Box>
    ) },
  { id: 11, moduleId: 'typescript', category: 'frontend', title: 'TypeScript', description: 'Типизированный JavaScript', lessonsCount: 8, studyTime: '2–4 недели', level: 'Продвинутый',
    icon: (
      <Box
        as="svg"
        w="20px"
        h="20px"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293L19 8.586A1 1 0 0120 9.293V19a2 2 0 01-2 2z"
        />
      </Box>
    ) },
  { id: 12, moduleId: 'accessibility', category: 'frontend', title: 'Accessibility', description: 'Создание доступных веб-приложений', lessonsCount: 26, studyTime: '2–3 недели', level: 'Продвинутый',
    icon: (<Box as="svg" w="20px" h="20px" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></Box>) },
];


