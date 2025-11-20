import { moduleDescriptions } from 'widgets/ModuleLessons/parts/ModuleLessonsView/parts/ProjectLink/data';

export const getModuleProjectsDescription = (moduleId: string): string => {
  return (
    moduleDescriptions[moduleId] ||
    'Практичный модуль: разрабатываем и улучшаем проекты, закрепляя материал и набирая опыт на реальных задачах.'
  );
};


