import { useMemo } from "react";

export const useIsLowPerformanceDevice = (): boolean => {
  return useMemo(() => {
    if (typeof window === "undefined" || typeof navigator === "undefined") {
      return false;
    }

    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return true;
    }

    const nav = navigator as any;
    const userAgent = nav.userAgent || "";

    // Считаем «ПК» всем, что не похоже на мобильные/планшеты.
    const isMobileOrTablet = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(
      userAgent
    );

    // На мобильных и планшетах всегда считаем устройство «слабым» —
    // рендерим только статичный fallback (webp/картинку), без Lottie.
    // На десктопах анимации включены по умолчанию (если нет reduced‑motion).
    return isMobileOrTablet;
  }, []);
};


