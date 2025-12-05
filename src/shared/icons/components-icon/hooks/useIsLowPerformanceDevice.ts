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
    const isLowCoreCount =
      typeof hardwareConcurrency === "number" && hardwareConcurrency <= 4;
    const isLowMemory =
      typeof deviceMemory === "number" && deviceMemory > 0 && deviceMemory <= 4;

    return Boolean(isMobile && (isLowCoreCount || isLowMemory));
  }, []);
};


