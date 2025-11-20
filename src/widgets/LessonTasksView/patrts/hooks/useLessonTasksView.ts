import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { LessonTasksViewProps } from '../../types';
import { useLessonTasksColors } from '../../colors';
import { useTasksProgress } from '../../hooks/useTasksProgress';
import { useValidateScroll } from '../../hooks/useValidateScroll';

export const useLessonTasksView = ({ mod, lesson, onTaskSolvedChange }: LessonTasksViewProps) => {
  const colors = useLessonTasksColors();
  const tasks = (lesson as any)?.tasks || [];
  const { solvedById, setSolvedById, solvedCount, celebrate, setCelebrate } = useTasksProgress(tasks);
  const hasTasks = tasks.length > 0;

  const taskAuthors = React.useMemo(() => {
    const authors: Array<{ username: string; name: string }> = [];
    const seen = new Set<string>();

    tasks.forEach((task: any) => {
      (task?.authors || []).forEach((a: any) => {
        const key = `${a?.username || ''}|${a?.name || ''}`;
        if (!key.trim() || seen.has(key)) {
          return;
        }
        seen.add(key);
        authors.push({ username: a.username, name: a.name });
      });
    });

    return authors;
  }, [tasks]);

  const onValidatedScroll = useValidateScroll();
  const navigate = useNavigate();

  const handleSetSolved = React.useCallback(
    (taskId: string, ok: boolean) => {
      setSolvedById((prev) => ({ ...prev, [taskId]: ok }));
      try {
        onTaskSolvedChange(taskId, ok);
      } catch (error) {
        console.error(error);
      }
    },
    [onTaskSolvedChange, setSolvedById],
  );

  const handleValidated = React.useCallback(
    (headerId: string) => {
      onValidatedScroll();
      try {
        const el = document.getElementById(headerId);
        if (!el) {
          return;
        }
        const headerEl = document.querySelector('header') as HTMLElement | null;
        const headerHeight = headerEl?.offsetHeight ?? 0;
        const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        const pad = Math.round(Math.min(28, Math.max(10, vh * 0.035)));
        const rect = el.getBoundingClientRect();
        const y = rect.top + window.pageYOffset - (headerHeight + pad);
        window.scrollTo({ top: y, behavior: 'smooth' });
      } catch (error) {
        console.error(error);
      }
    },

    [onValidatedScroll],
  );

  const handleCloseModal = React.useCallback(() => {
    setCelebrate(false);
  }, [setCelebrate]);

  const handleContinueAfterModal = React.useCallback(() => {
    try {
      const list = (mod?.lessons || []) as any[];
      const idx = Math.max(0, list.findIndex((l: any) => l.id === (lesson as any)?.id));
      const next = idx >= 0 ? list[idx + 1] : null;
      if (next && next.id) {
        navigate(`/learn/${mod?.id}/${next.id}`);
      } else {
        navigate(`/learn/${mod?.id}`);
      }
    } catch {
      navigate(`/learn/${mod?.id}`);
    }
  }, [lesson, mod, navigate]);

  return {
    colors,
    tasks,
    hasTasks,
    taskAuthors,
    solvedById,
    solvedCount,
    celebrate,
    handleSetSolved,
    handleValidated,
    handleCloseModal,
    handleContinueAfterModal,
  };
};



