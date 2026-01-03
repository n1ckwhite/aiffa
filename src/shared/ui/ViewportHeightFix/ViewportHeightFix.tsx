"use client";

import React, { useEffect } from "react";

export const ViewportHeightFix: React.FC = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let rafId = 0;

    const getViewportHeight = () => {
      // IMPORTANT: use layout viewport height (`window.innerHeight`) as requested.
      // This is the most common approach to make `vh` react to mobile URL bar show/hide.
      if (typeof window.innerHeight === "number" && window.innerHeight > 0) {
        return window.innerHeight;
      }
      return document.documentElement.clientHeight || 0;
    };

    const getViewportBottomOverlay = () => {
      const vv = window.visualViewport;
      const layoutHeight = window.innerHeight || document.documentElement.clientHeight;
      if (!vv) return 0;
      // On iOS Chrome/Safari, browser UI can cover part of the layout viewport.
      // The covered bottom area can be approximated by:
      // layoutHeight - visualHeight - offsetTop
      const raw = layoutHeight - vv.height - vv.offsetTop;
      return Math.max(0, Math.round(raw));
    };

    const update = () => {
      const vh = getViewportHeight() * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
      document.documentElement.style.setProperty("--vvb", `${getViewportBottomOverlay()}px`);
    };

    const handleResize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("resize", handleResize, { passive: true } as AddEventListenerOptions);
    window.addEventListener("orientationchange", handleResize, { passive: true } as AddEventListenerOptions);
    // iOS Chrome/Safari: URL bar show/hide can trigger scroll/visualViewport events instead of `window.resize`.
    window.addEventListener("scroll", handleResize, { passive: true } as AddEventListenerOptions);

    const vv = window.visualViewport;
    vv?.addEventListener("resize", handleResize, { passive: true } as AddEventListenerOptions);
    vv?.addEventListener("scroll", handleResize, { passive: true } as AddEventListenerOptions);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize as EventListener);
      window.removeEventListener("orientationchange", handleResize as EventListener);
      window.removeEventListener("scroll", handleResize as EventListener);
      vv?.removeEventListener("resize", handleResize as EventListener);
      vv?.removeEventListener("scroll", handleResize as EventListener);
    };
  }, []);

  return null;
};


