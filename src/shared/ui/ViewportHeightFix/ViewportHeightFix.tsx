"use client";

import React, { useEffect } from "react";

export const ViewportHeightFix: React.FC = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let rafId = 0;

    const getViewportHeight = () => {
      const vv = window.visualViewport;
      // `visualViewport.height` reacts to mobile browser UI (URL bar) changes.
      if (vv && typeof vv.height === "number" && vv.height > 0) {
        return vv.height;
      }
      // Fallbacks.
      return document.documentElement.clientHeight || window.innerHeight;
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
    // iOS Chrome/Safari: URL bar show/hide often triggers `visualViewport` changes instead of `window.resize`.
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


