import React from 'react';
import { Icon } from '@chakra-ui/react';
import { FaReact, FaNodeJs, FaNpm, FaAccessibleIcon, FaLightbulb, FaLaptopCode } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiHtml5 } from 'react-icons/si';
import { FiTerminal, FiCloud, FiBox } from 'react-icons/fi';

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
  'bazovye-komandy':(<Icon as={FiTerminal} boxSize="20px" />),
  'html-css': (<Icon as={SiHtml5} boxSize="20px" />),
  'javascript': (<Icon as={SiJavascript} boxSize="20px" />),
  'setevoe-vzaimodeistvie': (<Icon as={FiCloud} boxSize="20px" />),
  'fundamentalnye-navyki': (<Icon as={FaLightbulb} boxSize="20px" />),
  'inzhenernaya-kultura': (<Icon as={FaLaptopCode} boxSize="20px" />),
  'npm': (<Icon as={FaNpm} boxSize="20px" />),
  'sborka-bundle': (<Icon as={FiBox} boxSize="20px" />),
  'react': (<Icon as={FaReact} boxSize="20px" />),
  'react-native': (<Icon as={FaReact} boxSize="20px" />),
  'nodejs': (<Icon as={FaNodeJs} boxSize="20px" />),
  'typescript': (<Icon as={SiTypescript} boxSize="20px" />),
  'accessibility': (<Icon as={FaAccessibleIcon} boxSize="20px" />)
};
