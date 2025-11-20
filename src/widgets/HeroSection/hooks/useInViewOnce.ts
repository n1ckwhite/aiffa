import { useEffect, useState } from 'react';

type Options = IntersectionObserverInit;

export const useInViewOnce = (
  targetRef: React.RefObject<Element | null>,
  options?: Options
): boolean => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (isInView) return; 
    const element = targetRef.current;
    if (!element) return;
    let observer: IntersectionObserver | undefined;
    try {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      }, options ?? { threshold: 0.3 });
      observer.observe(element);
    } catch {
      console.error('Error observing element');
    }
    return () => {
      try {
        observer?.unobserve?.(element);
      } catch {}
    };
  }, [targetRef, isInView, options]);

  return isInView;
};



