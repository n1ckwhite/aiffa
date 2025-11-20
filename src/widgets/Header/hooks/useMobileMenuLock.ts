import { useEffect } from 'react';

export const useMobileMenuLock = (
  isMobileMenuOpen: boolean,
  searchOpen: boolean,
  restoreOverrideYRef: React.MutableRefObject<number | null>,
  mobileScrollYRef: React.MutableRefObject<number>
) => {
  useEffect(() => {
    if (!(isMobileMenuOpen && searchOpen)) return;
    const { body } = document;
    const html = document.documentElement;

    const prevBodyOverflow = body.style.overflow;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyTouchAction = (body.style as any).touchAction;
    const prevBodyPosition = body.style.position;
    const prevBodyTop = body.style.top;
    const prevBodyLeft = body.style.left;
    const prevBodyRight = body.style.right;
    const prevBodyWidth = body.style.width;

    try {
      body.style.overflow = 'hidden';
      html.style.overflow = 'hidden';
      (body.style as any).touchAction = 'none';
      mobileScrollYRef.current = window.scrollY || (window as any).pageYOffset || 0;
      body.style.position = 'fixed';
      body.style.top = `-${mobileScrollYRef.current}px`;
      body.style.left = '0';
      body.style.right = '0';
      body.style.width = '100%';
    } catch {}

    return () => {
      body.style.overflow = prevBodyOverflow;
      html.style.overflow = prevHtmlOverflow;
      (body.style as any).touchAction = prevBodyTouchAction || '';
      body.style.position = prevBodyPosition;
      body.style.top = prevBodyTop;
      body.style.left = prevBodyLeft;
      body.style.right = prevBodyRight;
      body.style.width = prevBodyWidth;
      try {
        const targetY = restoreOverrideYRef.current ?? (mobileScrollYRef.current || 0);
        window.scrollTo(0, targetY);
      } catch {}
      restoreOverrideYRef.current = null;
    };
  }, [isMobileMenuOpen, searchOpen, restoreOverrideYRef, mobileScrollYRef]);
};



