import React from 'react';
import type { TocItem } from '../types';

export const useTableOfContents = (md: string | null) => {
  const [tocItems, setTocItems] = React.useState<TocItem[]>([]);
  const [activeTocId, setActiveTocId] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!md) return;
    const container = document.querySelector('.md-content') as HTMLElement | null;
    if (!container) return;
    const nodes = Array.from(container.querySelectorAll('h2, h3')) as HTMLElement[];
    const items = nodes.filter((el) => !!el.id).map((el) => ({ id: el.id, text: el.textContent || '', level: el.tagName === 'H2' ? 2 : 3 }));
    setTocItems(items);
    if (items.length > 0) setActiveTocId(items[0].id);

    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => (a.target as HTMLElement).offsetTop - (b.target as HTMLElement).offsetTop);
      if (visible.length > 0) {
        const topMost = visible[0].target as HTMLElement;
        const id = topMost.id || null;
        setActiveTocId((prev) => (prev === id ? prev : id));
      } else {
        const scrollY = window.scrollY;
        const headerOffset = 90;
        let current: string | null = null;
        for (const it of items) {
          const el = document.getElementById(it.id);
          if (!el) continue;
          const top = el.offsetTop - headerOffset;
          if (scrollY >= top) current = it.id;
        }
        const fallback = current ?? (items[0]?.id || null);
        setActiveTocId((prev) => (prev === fallback ? prev : fallback));
      }
    }, { root: null, rootMargin: '-90px 0px -70% 0px', threshold: 0.1 });

    nodes.forEach((n) => observer.observe(n));

    let initialCurrent: string | null = null;
    const hash = window.location.hash.replace('#', '');
    if (hash) initialCurrent = hash;
    if (!initialCurrent) {
      const pivot = window.scrollY + window.innerHeight * 0.3;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (!el) continue;
        const top = el.offsetTop;
        if (pivot >= top) initialCurrent = it.id;
      }
      const docBottom = window.scrollY + window.innerHeight;
      const nearBottom = docBottom >= document.documentElement.scrollHeight - 8;
      if (nearBottom && items.length > 0) initialCurrent = items[items.length - 1].id;
    }
    setActiveTocId(initialCurrent ?? (items[0]?.id || null));

    return () => {
      observer.disconnect();
    };
  }, [md]);

  return { tocItems, activeTocId, setActiveTocId };
};


