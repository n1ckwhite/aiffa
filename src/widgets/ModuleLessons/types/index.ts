import type { Module } from 'shared/lessons/manifest';

export type ModuleLessonsViewProps = {
  mod: Module;
  profileSolvedTaskIds?: Record<string, true>;
  /**
   * Если задано — пагинация управляется URL (no-JS friendly через href).
   * Сервер отдаёт нужный page через props.
   */
  currentPage?: number;
  getPageHref?: (page: number) => string;
};


