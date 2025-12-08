import type { FeedbackContext } from '../types';

export type ImprovementTexts = {
  shortLabel: string;
  hardLabel: string;
  errorsLabel: string;
  shortExplanation: string;
  hardExplanation: string;
  errorsExplanation: string;
};

const lessonTexts: ImprovementTexts = {
  shortLabel: 'Хочу больше примеров',
  hardLabel: 'Сложно читать',
  errorsLabel: 'Нашёл неточность',
  shortExplanation: 'Добавим больше практических примеров и разборов кода.',
  hardExplanation: 'Постараемся упростить формулировки и улучшить структуру материала.',
  errorsExplanation: 'Перепроверим текст и исправим неточности и опечатки.',
};

const tasksTexts: ImprovementTexts = {
  shortLabel: 'Слишком поверхностно',
  hardLabel: 'Сложно разобраться',
  errorsLabel: 'Что-то сломано',
  shortExplanation: 'Добавим больше примеров и деталей, чтобы задача была понятнее.',
  hardExplanation:
    'Постараемся упростить формулировки, разбить решение на шаги и подсветить ключевые идеи.',
  errorsExplanation: 'Перепроверим условие и проверку задачи, исправим баги и неточности.',
};

const projectTexts: ImprovementTexts = {
  shortLabel: 'Сложно запуститься',
  hardLabel: 'Неясны шаги',
  errorsLabel: 'Мало контекста',
  shortExplanation: 'Улучшим инструкцию по запуску: добавим шаги и проверим окружение.',
  hardExplanation: 'Разобьём описание проекта на более понятные шаги и чек-лист.',
  errorsExplanation: 'Добавим больше пояснений, ссылок и примеров использования проекта.',
};

const MAP: Record<FeedbackContext, ImprovementTexts> = {
  lesson: lessonTexts,
  tasks: tasksTexts,
  project: projectTexts,
};

export const getImprovementTexts = (context: FeedbackContext): ImprovementTexts => {
  return MAP[context] ?? lessonTexts;
};


