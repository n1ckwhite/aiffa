import React from 'react';

export const useMenuScrollIntoView = (
  isOpen: boolean,
  currentIndex: number,
  menuButtonRef: React.RefObject<HTMLButtonElement | null>,
  menuListRef: React.RefObject<HTMLDivElement | null>
) => {
  React.useEffect(() => {
    if (!isOpen) return;
    const btn = menuButtonRef.current;
    if (btn && typeof (btn as any).scrollIntoView === 'function') {
      requestAnimationFrame(() => {
        try { btn.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'smooth' }); } catch {}
      });
    }
    const list = menuListRef.current;
    if (!list) return;
    const active = list.querySelector(`[data-lesson-index="${currentIndex}"]`) as HTMLElement | null;
    if (!active) return;
    requestAnimationFrame(() => {
      try {
        if (typeof (active as any).scrollIntoView === 'function') {
          active.scrollIntoView({ block: 'center', inline: 'nearest' });
        } else {
          const target = Math.max(0, active.offsetTop - list.clientHeight / 2);
          list.scrollTop = target;
        }
      } catch {
        const target = Math.max(0, active.offsetTop - list.clientHeight / 2);
        list.scrollTop = target;
      }
    });
  }, [isOpen, currentIndex, menuButtonRef, menuListRef]);
};


