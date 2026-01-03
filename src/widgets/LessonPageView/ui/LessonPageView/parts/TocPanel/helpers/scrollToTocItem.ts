import { TOC_SCROLL_TO_OFFSET_PX } from '../constans';

export const scrollToTocItem = (id: string, setActiveTocId: (id: string) => void) => {
  if (typeof window === 'undefined') return;

  const el = document.getElementById(id);
  if (!el) return;

  const y = el.getBoundingClientRect().top + window.scrollY - TOC_SCROLL_TO_OFFSET_PX;
  window.scrollTo({ top: y, behavior: 'smooth' });
  setActiveTocId(id);
  window.history.replaceState(null, '', `#${id}`);
};


