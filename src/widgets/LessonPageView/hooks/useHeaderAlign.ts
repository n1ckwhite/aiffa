import React from 'react';

const getDynamicScrollOffset = () => {
  try {
    const headerEl = document.querySelector('header') as HTMLElement | null;
    const headerHeight = headerEl?.offsetHeight ?? 0;
    const padding = 24;
    return headerHeight + padding;
  } catch {
    return 68;
  }
};

export const useHeaderAlign = (
  anchorRef: React.RefObject<HTMLDivElement | null>,
  deps: React.DependencyList
) => {
  React.useEffect(() => {
    // Если пользователь уже начал скроллить (особенно при медленном рендере/подгрузке),
    // не делаем автоскролл "к якорю", чтобы не вырывать его обратно наверх.
    const initialScrollY = window.scrollY;
    let userScrolled = false;

    const handleScroll = () => {
      // Маленький порог, чтобы не реагировать на микро-сдвиги/overscroll.
      if (Math.abs(window.scrollY - initialScrollY) > 4) userScrolled = true;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    let rafId: number | null = null;
    let t1: number | null = null;
    let t2: number | null = null;

    const alignToHeader = () => {
      // Если уже ушли вниз — не вмешиваемся.
      if (userScrolled) return;
      const el = anchorRef.current;
      if (!el) return;
      try {
        const y = el.getBoundingClientRect().top + window.pageYOffset - getDynamicScrollOffset();
        // Если пользователь уже сильно проскроллил вниз — не вмешиваемся.
        if (window.scrollY > 80) return;
        window.scrollTo({ top: y, left: 0, behavior: 'auto' });
      } catch {}
    };
    alignToHeader();
    rafId = window.requestAnimationFrame(alignToHeader);
    t1 = window.setTimeout(alignToHeader, 120);
    t2 = window.setTimeout(alignToHeader, 280);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId != null) window.cancelAnimationFrame(rafId);
      if (t1 != null) window.clearTimeout(t1);
      if (t2 != null) window.clearTimeout(t2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};


