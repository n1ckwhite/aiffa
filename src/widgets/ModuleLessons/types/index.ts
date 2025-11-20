import type { Module } from 'shared/lessons/manifest';

export type ModuleLessonsViewProps = {
  mod: Module;
  profileSolvedTaskIds?: Record<string, true>;
};


