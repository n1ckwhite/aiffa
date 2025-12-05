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
    const userAgent = (nav.userAgent || "").toLowerCase();
    const hardwareConcurrency: number | undefined = nav.hardwareConcurrency;
    const deviceMemory: number | undefined = nav.deviceMemory;

    const isPhone = /iphone|ipod|android.+mobile|windows phone/.test(userAgent);
    const isTablet = /ipad|android(?!.*mobile)/.test(userAgent);

    // Смартфоны — всегда без анимаций, только статичные fallback‑иконки.
    if (isPhone) {
      return true;
    }

    // Планшеты: включаем анимацию только на «сильных» устройствах.
    if (isTablet) {
      const hasManyCores =
        typeof hardwareConcurrency === "number" && hardwareConcurrency >= 6;
      const hasEnoughMemory =
        typeof deviceMemory === "number" ? deviceMemory >= 4 : true;

      // low-perf, если планшет явно не тянет.
      return !(hasManyCores && hasEnoughMemory);
    }

    // Десктопы/ноутбуки: в целом считаем сильными, но отрубаем анимации
    // на совсем слабых машинах.
    const veryLowCores =
      typeof hardwareConcurrency === "number" && hardwareConcurrency <= 2;
    const veryLowMemory =
      typeof deviceMemory === "number" && deviceMemory > 0 && deviceMemory <= 2;

    return veryLowCores || veryLowMemory;
  }, []);
};


