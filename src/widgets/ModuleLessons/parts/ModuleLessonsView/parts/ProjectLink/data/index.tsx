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

export const getProjectLinkMeta = (mod: any, colors: any) => {
  const indexBg =
    (colors as any).indexBg ?? (colors as any).blue?.indexBg ?? "blue.50";
  const accentColor =
    (colors as any).blue?.accent ?? colors.accent ?? "blue.600";

  const starsCount = Number((mod?.project as any)?.ratingCount ?? 0);
  const views = Number((mod?.project as any)?.views ?? 0);
  const commentsCount = Number((mod?.project as any)?.commentsCount ?? 0);

  const metaColor = (colors as any).descColor ?? "gray.500";

  return {
    indexBg,
    accentColor,
    starsCount,
    views,
    commentsCount,
    metaColor,
  };
};

