import React from "react";
import type { WeekInfo } from "../types";

export const useWeekInfo = () => {
  const [weekInfo, setWeekInfo] = React.useState<WeekInfo>(() => ({
    progress: 0,
    remainingDays: 0,
    remainingHours: 0,
    weekLabel: "",
  }));

  React.useEffect(() => {
    const updateWeekInfo = () => {
      const now = new Date();
      const day = now.getDay(); // 0 (Sun) - 6 (Sat)
      const mondayOffset = (day + 6) % 7;
      const start = new Date(now);
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() - mondayOffset);
      const end = new Date(start);
      end.setDate(start.getDate() + 7);

      const totalMs = end.getTime() - start.getTime();
      const elapsedMs = now.getTime() - start.getTime();
      const remainingMs = Math.max(end.getTime() - now.getTime(), 0);

      const progress = totalMs > 0 ? Math.min(Math.max(elapsedMs / totalMs, 0), 1) : 0;
      const remainingDays = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
      const remainingHours = Math.floor((remainingMs / (1000 * 60 * 60)) % 24);

      const startLabel = start.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "short",
      });
      const endLabelDate = new Date(end);
      endLabelDate.setDate(end.getDate() - 1);
      const endLabel = endLabelDate.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "short",
      });

      const weekLabel = `${startLabel} — ${endLabel}`;

      setWeekInfo({ progress, remainingDays, remainingHours, weekLabel });
    };

    updateWeekInfo();
    const id = window.setInterval(updateWeekInfo, 1000);
    return () => window.clearInterval(id);
  }, []);

  return weekInfo;
};


