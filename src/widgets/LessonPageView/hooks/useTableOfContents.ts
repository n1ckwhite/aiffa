import React from 'react';
import type { TocItem } from '../types';

export const useTableOfContents = (md: string | null) => {
  const [tocItems, setTocItems] = React.useState<TocItem[]>([]);
  const [activeTocId, setActiveTocId] = React.useState<string | null>(null);
  const [isTocReady, setIsTocReady] = React.useState<boolean>(false);

  React.useEffect(() => {
    // Если markdown поменялся — сбрасываем, чтобы не показывать "старое" содержание
    setIsTocReady(false);
    setTocItems([]);
    setActiveTocId(null);

    if (!md) {
      setIsTocReady(true);
      return;
    }

    let timeoutId: number | null = null;
    let rafId: number | null = null;
    let items: TocItem[] = [];

    const headerOffsetPx = 96;
    let attempts = 0;
    const maxAttempts = 12;

    const computeActiveId = () => {
      if (items.length === 0) return null;

      const docBottom = window.scrollY + window.innerHeight;
      const nearBottom = docBottom >= document.documentElement.scrollHeight - 8;
      if (nearBottom) return items[items.length - 1].id;

      let current: string | null = null;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - headerOffsetPx <= 8) current = it.id;
      }
      return current ?? items[0].id;
    };

    const scheduleUpdate = () => {
      if (rafId != null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        const next = computeActiveId();
        if (!next) return;
        setActiveTocId((prev) => (prev === next ? prev : next));
      });
    };

    const init = () => {
      const container = document.querySelector('.md-content') as HTMLElement | null;
      if (!container) {
        attempts += 1;
        if (attempts >= maxAttempts) {
          setIsTocReady(true);
          return;
        }
        timeoutId = window.setTimeout(init, 50);
        return;
      }

      const nodes = Array.from(container.querySelectorAll('h2, h3')) as HTMLElement[];
      items = nodes
        .filter((el) => Boolean(el.id))
        .map((el) => ({
          id: el.id,
          text: el.textContent || '',
          level: el.tagName === 'H2' ? 2 : 3,
        }));

      setTocItems(items);
      setIsTocReady(true);
      if (items.length === 0) {
        setActiveTocId(null);
        return;
      }

      const hash = window.location.hash.replace('#', '');
      setActiveTocId(hash || computeActiveId() || items[0].id);

      window.addEventListener('scroll', scheduleUpdate, { passive: true });
      window.addEventListener('resize', scheduleUpdate);
      scheduleUpdate();
    };

    // На всякий случай даём React отрисовать markdown перед querySelector.
    timeoutId = window.setTimeout(init, 0);

    return () => {
      if (timeoutId != null) window.clearTimeout(timeoutId);
      if (rafId != null) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, [md]);

  return { tocItems, activeTocId, setActiveTocId, isTocReady };
};


