import React from "react";

const EVENT_NAME = "aiffa:lesson-nav-pending";

type LessonNavPendingEventDetail = {
  pending: boolean;
};

/**
 * Глобальный (window-level) флаг "идёт переход между уроками".
 * Используем, чтобы показывать локальные skeleton'ы (TOC + LessonSwitchBar),
 * не включая full-page loading.
 */
export const setLessonNavPending = (pending: boolean) => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<LessonNavPendingEventDetail>(EVENT_NAME, {
      detail: { pending },
    }),
  );
};

export const useLessonNavPending = () => {
  const [isPending, setIsPending] = React.useState(false);

  React.useEffect(() => {
    const handle = (event: Event) => {
      const detail = (event as CustomEvent<LessonNavPendingEventDetail>).detail;
      setIsPending(Boolean(detail?.pending));
    };

    window.addEventListener(EVENT_NAME, handle);
    return () => {
      window.removeEventListener(EVENT_NAME, handle);
    };
  }, []);

  return isPending;
};


