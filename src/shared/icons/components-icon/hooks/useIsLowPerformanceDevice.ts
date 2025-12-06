import { useEffect, useState } from "react";

/**
 * Определяет, нужно ли считать устройство слабым для анимаций.
 *
 * ВАЖНО: вычисление делаем только в useEffect, чтобы
 * серверный рендер и первый клиентский рендер совпадали
 * и не вызывали hydration‑ошибки.
 */
export const useIsLowPerformanceDevice = (): boolean => {
  // По умолчанию считаем устройство «низкопроизводительным»,
  // чтобы на момент гидратации везде отрисовался только fallback.
  const [isLowPerf, setIsLowPerf] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined" || typeof navigator === "undefined") {
      return;
    }

    const computeIsLowPerf = (): boolean => {
      const prefersReducedMotion = window.matchMedia?.(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        return true;
      }

      const nav = navigator as Navigator & {
        deviceMemory?: number;
      };

      const cores = typeof nav.hardwareConcurrency === "number"
        ? nav.hardwareConcurrency
        : undefined;
      const memory =
        typeof nav.deviceMemory === "number" && nav.deviceMemory > 0
          ? nav.deviceMemory
          : undefined;

      // Если совсем нет данных по ресурсам — осторожно считаем устройство слабым.
      if (cores === undefined && memory === undefined) {
        return true;
      }

      // Единый простой порог для всех типов устройств:
      // low-perf только при совсем малом числе ядер или памяти.
      const hasLowCpu = typeof cores === "number" && cores <= 2;
      const hasLowMemory = typeof memory === "number" && memory <= 2;

      return hasLowCpu || hasLowMemory;
    };

    setIsLowPerf(computeIsLowPerf());
  }, []);

  return isLowPerf;
};




