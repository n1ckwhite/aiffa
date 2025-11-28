import React from 'react';
import {
  FaCircleCheck,
  FaListCheck,
  FaFire,
  FaTrophy,
  FaStar,
  FaFlagCheckered,
  FaRocket,
  FaMedal,
  FaHeart,
  FaMessage,
  FaBookOpen,
  FaCalendarCheck,
  FaUserPen,
} from 'react-icons/fa6';
import type { IconType } from 'react-icons';

export const useAchievementsData = (profile: any) => {
  const solved = React.useMemo(() => profile?.solvedTaskIds ?? {}, [profile]);
  const weeklyDoneCount = React.useMemo(() => {
    const tasks = Array.isArray(profile?.weeklyTasks) ? profile.weeklyTasks : [];
    return tasks.reduce((n: number, t: any) => n + (t?.done ? 1 : 0), 0);
  }, [profile]);

  const weeklyCompleted = weeklyDoneCount > 0;
  const totalSolvedCount = React.useMemo(
    () => Object.keys(solved).length + weeklyDoneCount,
    [solved, weeklyDoneCount],
  );

  const items = React.useMemo(() => {
    const profileEdited = (profile.name?.trim() !== 'Пользователь') || (profile.bio?.trim() !== 'Описание');

    // Эволюция одного бейджа задач: 1 → 5 → 10 → 15 → 25 → 50
    type TaskStage = {
      threshold: number;
      id: string;
      label: string;
      icon: IconType;
      color: string;
      from: string;
      to: string;
    };

    const taskStages: TaskStage[] = [
      { threshold: 1, id: 'first-task', label: 'Первая задача', icon: FaCircleCheck, color: '#60a5fa', from: '#93c5fd', to: '#3b82f6' },
      { threshold: 5, id: 'five-tasks', label: '5 задач', icon: FaListCheck, color: '#a78bfa', from: '#c4b5fd', to: '#8b5cf6' },
      { threshold: 10, id: 'ten-tasks', label: '10 задач', icon: FaFire, color: '#f59e0b', from: '#fbbf24', to: '#f59e0b' },
      { threshold: 15, id: 'fifteen-tasks', label: '15 задач', icon: FaStar, color: '#f43f5e', from: '#fb7185', to: '#f43f5e' },
      { threshold: 25, id: 'twentyfive-tasks', label: '25 задач', icon: FaRocket, color: '#22d3ee', from: '#67e8f9', to: '#22d3ee' },
      { threshold: 50, id: 'fifty-tasks', label: '50 задач', icon: FaMedal, color: '#eab308', from: '#fde047', to: '#eab308' },
    ];

    let currentTaskStage = taskStages[0];
    if (totalSolvedCount > 0) {
      for (const stage of taskStages) {
        if (totalSolvedCount >= stage.threshold) {
          currentTaskStage = stage;
        }
      }
    }

    const hasAnyTasks = totalSolvedCount > 0;
    const tasksBadge = {
      id: currentTaskStage.id,
      label: hasAnyTasks ? currentTaskStage.label : taskStages[0].label,
      achieved: hasAnyTasks,
      color: currentTaskStage.color,
      icon: currentTaskStage.icon,
      from: currentTaskStage.from,
      to: currentTaskStage.to,
    };

    return [
      {
        id: 'profile-edited',
        label: 'Изменил профиль',
        achieved: profileEdited,
        color: '#60a5fa',
        icon: FaUserPen,
        from: '#93c5fd',
        to: '#3b82f6',
      },
      {
        id: 'first-weekly',
        label: '1-я задача недели',
        achieved: weeklyCompleted,
        color: '#14b8a6',
        icon: FaCalendarCheck,
        from: '#5eead4',
        to: '#14b8a6',
      },
      tasksBadge,
      {
        id: 'streak',
        label: 'Серия решений 3 дня',
        achieved: false,
        color: '#f97316',
        icon: FaTrophy,
        from: '#fdba74',
        to: '#f97316',
      },
      {
        id: 'streak-7',
        label: 'Серия 7 дней',
        achieved: false,
        color: '#84cc16',
        icon: FaCalendarCheck,
        from: '#a3e635',
        to: '#84cc16',
      },
      {
        id: 'streak-30',
        label: 'Серия 30 дней',
        achieved: false,
        color: '#a3a3a3',
        icon: FaFlagCheckered,
        from: '#d4d4d4',
        to: '#a3a3a3',
      },
      {
        id: 'reader',
        label: 'Изучил модуль',
        achieved: false,
        color: '#38bdf8',
        icon: FaBookOpen,
        from: '#7dd3fc',
        to: '#38bdf8',
      },
      {
        id: 'feedback',
        label: 'Оставил отзыв',
        achieved: false,
        color: '#fb7185',
        icon: FaMessage,
        from: '#fda4af',
        to: '#fb7185',
      },
      {
        id: 'supporter',
        label: 'Поддержал проект',
        achieved: false,
        color: '#ef4444',
        icon: FaHeart,
        from: '#f87171',
        to: '#ef4444',
      },
    ];
  }, [profile, weeklyCompleted, totalSolvedCount]);

  return { weeklyCompleted, totalSolvedCount, items };
};

