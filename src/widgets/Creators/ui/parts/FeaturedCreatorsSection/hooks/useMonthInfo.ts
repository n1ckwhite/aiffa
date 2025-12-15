import React from "react";
import type { MonthInfo } from "../types";

export const useMonthInfo = () => {
  const [monthInfo, setMonthInfo] = React.useState<MonthInfo>(() => ({
    progress: 0,
    remainingDays: 0,
    remainingHours: 0,
    monthLabel: "",
  }));

  React.useEffect(() => {
    const updateMonthInfo = () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      const totalMs = end.getTime() - start.getTime();
      const elapsedMs = now.getTime() - start.getTime();
      const remainingMs = Math.max(end.getTime() - now.getTime(), 0);

      const progress = totalMs > 0 ? Math.min(Math.max(elapsedMs / totalMs, 0), 1) : 0;
      const remainingDays = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
      const remainingHours = Math.floor((remainingMs / (1000 * 60 * 60)) % 24);

      const rawMonth = now.toLocaleDateString("ru-RU", {
        month: "long",
      });
      const monthLabel = rawMonth.charAt(0).toUpperCase() + rawMonth.slice(1);

      setMonthInfo({ progress, remainingDays, remainingHours, monthLabel });
    };

    updateMonthInfo();
    const id = window.setInterval(updateMonthInfo, 1000);
    return () => window.clearInterval(id);
  }, []);

  return monthInfo;
};


