import React from 'react';
import { FaCircleCheck, FaListCheck, FaFire, FaTrophy, FaStar, FaFlagCheckered, FaRocket, FaMedal, FaHeart, FaMessage, FaBookOpen, FaCalendarCheck, FaUserPen } from 'react-icons/fa6';

export const useAchievementsData = (profile: any) => {
  const solved = React.useMemo(() => profile?.solvedTaskIds ?? {}, [profile]);
  const weeklyDoneCount = React.useMemo(() => {
    const tasks = Array.isArray(profile?.weeklyTasks) ? profile.weeklyTasks : [];
    return tasks.reduce((n: number, t: any) => n + (t?.done ? 1 : 0), 0);
  }, [profile]);
  const weeklyCompleted = weeklyDoneCount > 0;
  const totalSolvedCount = React.useMemo(() => Object.keys(solved).length + weeklyDoneCount, [solved, weeklyDoneCount]);

  const items = React.useMemo(() => ([
    { id: 'profile-edited', label: 'Изменил профиль', achieved: (profile.name?.trim() !== 'Пользователь') || (profile.bio?.trim() !== 'Описание'), color: '#60a5fa', icon: FaUserPen, from: '#93c5fd', to: '#3b82f6' },
    { id: 'first-weekly', label: '1-я задача недели', achieved: weeklyCompleted, color: '#14b8a6', icon: FaCalendarCheck, from: '#5eead4', to: '#14b8a6' },
    { id: 'first-task', label: 'Первая задача', achieved: totalSolvedCount > 0, color: '#60a5fa', icon: FaCircleCheck, from: '#93c5fd', to: '#3b82f6' },
    { id: 'five-tasks', label: '5 задач', achieved: totalSolvedCount >= 5, color: '#a78bfa', icon: FaListCheck, from: '#c4b5fd', to: '#8b5cf6' },
    { id: 'ten-tasks', label: '10 задач', achieved: totalSolvedCount >= 10, color: '#f59e0b', icon: FaFire, from: '#fbbf24', to: '#f59e0b' },
    { id: 'streak', label: 'Серия решений 3 дня', achieved: false, color: '#f97316', icon: FaTrophy, from: '#fdba74', to: '#f97316' },
    { id: 'fifteen-tasks', label: '15 задач', achieved: totalSolvedCount >= 15, color: '#f43f5e', icon: FaStar, from: '#fb7185', to: '#f43f5e' },
    { id: 'twentyfive-tasks', label: '25 задач', achieved: totalSolvedCount >= 25, color: '#22d3ee', icon: FaRocket, from: '#67e8f9', to: '#22d3ee' },
    { id: 'fifty-tasks', label: '50 задач', achieved: totalSolvedCount >= 50, color: '#eab308', icon: FaMedal, from: '#fde047', to: '#eab308' },
    { id: 'streak-7', label: 'Серия 7 дней', achieved: false, color: '#84cc16', icon: FaCalendarCheck, from: '#a3e635', to: '#84cc16' },
    { id: 'streak-30', label: 'Серия 30 дней', achieved: false, color: '#a3a3a3', icon: FaFlagCheckered, from: '#d4d4d4', to: '#a3a3a3' },
    { id: 'reader', label: 'Изучил модуль', achieved: false, color: '#38bdf8', icon: FaBookOpen, from: '#7dd3fc', to: '#38bdf8' },
    { id: 'feedback', label: 'Оставил отзыв', achieved: false, color: '#fb7185', icon: FaMessage, from: '#fda4af', to: '#fb7185' },
    { id: 'supporter', label: 'Поддержал проект', achieved: false, color: '#ef4444', icon: FaHeart, from: '#f87171', to: '#ef4444' },
  ]), [profile, weeklyCompleted, totalSolvedCount]);

  return { weeklyCompleted, totalSolvedCount, items };
};


