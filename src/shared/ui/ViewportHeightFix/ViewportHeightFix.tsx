"use client";

import React, { useEffect } from "react";

export const ViewportHeightFix: React.FC = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let rafId = 0;

    const update = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    const handleResize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("resize", handleResize, { passive: true } as AddEventListenerOptions);
    window.addEventListener("orientationchange", handleResize, { passive: true } as AddEventListenerOptions);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize as EventListener);
      window.removeEventListener("orientationchange", handleResize as EventListener);
    };
  }, []);

  return null;
};


