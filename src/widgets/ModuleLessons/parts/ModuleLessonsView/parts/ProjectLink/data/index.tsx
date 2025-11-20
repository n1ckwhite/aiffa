import React from 'react';
import { Box } from '@chakra-ui/react';

export const PROJECT_LINK_TEXTS = {
  title: 'Проекты',
  open: 'Открыть проекты',
};

export const getAuthorsTitle = (count: number): string => {
  return count === 1 ? 'Автор' : 'Авторы';
};

export const moduleDescriptions: Record<string, string> = {
  'bazovye-komandy': 'Практичный вводный блок по Git: от базовых команд до решения конфликтов. После изучения вы уверенно управляете ветками и понимаете, что происходит под капотом.',
  'html-css': 'Фундамент вёрстки: семантика HTML и современный CSS. Научимся аккуратно располагать элементы, понимать единицы, управлять сетками и фокусом.',
  'javascript': 'Основы языка: переменные, функции, события, асинхронность. Разбираем то, чем вы будете пользоваться каждый день в браузере.',
  'setevoe-vzaimodeistvie': 'Как работает веб «по проводам»: HTTP, коды ответов, REST, кеширование и безопасность. Понимание сети = меньше магии в запросах.',
  'fundamentalnye-navyki': 'Инженерное мышление на практике: KISS, DRY, YAGNI. Учимся писать простой, понятный и поддерживаемый код.',
  'inzhenernaya-kultura': 'Код‑ревью, качество и процессы. Как держать проект в форме и помогать команде расти.',
  'npm': 'Экосистема npm: зависимости, версии и частые команды. Наводим порядок в package.json и избегаем типичных ловушек.',
  'sborka-bundle': 'Сборка фронтенда: бандлинг, минификация, код‑сплиттинг. Разбираемся, что делает сборщик и как ускорить приложение.',
  'react': 'React без магии: компоненты, состояние, хук‑подход и оптимизации. Понимание базовых паттернов и уверенная работа с UI.',
  'react-native': 'Мобильная разработка на React: отличия от веба, стили, платформа и бридж. Старт для приложений на iOS и Android.',
  'nodejs': 'Серверный JavaScript: события, потоки, HTTP и Express. Понимаем, как крутится ваш бэкенд.',
  'typescript': 'Типы как помощники: интерфейсы, дженерики и утилиты. Пишем надёжный код и ловим ошибки до запуска.',
  'accessibility': 'Доступность как часть UX: роли, aria‑атрибуты, фокус и навигация. Делаем интерфейсы удобными для всех.',
};

export const moduleIconById: Record<string, React.ReactNode> = {
  'bazovye-komandy': (<Box as="svg" w="20px" h="20px" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></Box>),
  'html-css': (<Box as="svg" w="20px" h="20px" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></Box>),
  'javascript': (<Box as="svg" w="20px" h="20px" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></Box>),
  'setevoe-vzaimodeistvie': (<Box as="svg" w="20px" h="20px" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" /></Box>),
  'fundamentalnye-navyki': (<Box as="svg" w="20px" h="20px" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></Box>),
  'inzhenernaya-kultura': (<Box as="svg" w="20px" h="20px" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></Box>),
  'npm': (<Box as="svg" w="20px" h="20px" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10л8 4" /></Box>),
  'sborka-bundle': (<Box as="svg" w="20px" h="20px" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547л-2.387-.477a6 6 0 00-3.86.517л-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8л-1 1v5.172a2 2 0 00.586 1.414л5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414л5-5A2 2 0 009 10.172В5Л8 4z" /></Box>),
  'react': (<Box as="svg" w="20px" h="20px" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7л9-11h-7z" /></Box>),
  'react-native': (<Box as="svg" w="20px" h="20px" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2в14a2 2 0 002 2z" /></Box>),
  'nodejs': (<Box as="svg" w="20px" h="20px" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2в4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2м-2-4h.01M17 16h.01" /></Box>),
  'typescript': (<Box as="svg" w="20px" h="20px" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6м-6 4h6м2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293л5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></Box>),
  'accessibility': (<Box as="svg" w="20px" h="20px" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></Box>),
};
