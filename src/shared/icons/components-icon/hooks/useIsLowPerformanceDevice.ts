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
    const hardwareConcurrency: number | undefined = nav.hardwareConcurrency;
    const deviceMemory: number | undefined = nav.deviceMemory;
    const userAgent = nav.userAgent || "";

    const isMobile = /Android|iPhone|iPad|iPod/i.test(userAgent);

    // Для мобильных устройств становимся более консервативными:
    // анимацию включаем только при заметно более мощном железе.
    if (isMobile) {
      const hasManyCores =
        typeof hardwareConcurrency === "number" && hardwareConcurrency >= 8;
      const hasEnoughMemory =
        typeof deviceMemory === "number" && deviceMemory >= 6;

      // Если нет явных признаков мощного устройства — считаем его слабым.
      return !(hasManyCores && hasEnoughMemory);
    }

    // Для десктопов оставляем более мягкий порог.
    const isLowCoreCount =
      typeof hardwareConcurrency === "number" && hardwareConcurrency <= 2;
    const isLowMemory =
      typeof deviceMemory === "number" && deviceMemory > 0 && deviceMemory <= 4;

    return isLowCoreCount || isLowMemory;
  }, []);
};


