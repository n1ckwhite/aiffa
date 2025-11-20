import React from 'react';

const getNextWeeklyReset = (): Date => {
  const now = new Date();
  const day = now.getDay();
  const daysUntilMonday = (8 - day) % 7 || 7;
  const next = new Date(now);
  next.setHours(0, 0, 0, 0);
  next.setDate(now.getDate() + daysUntilMonday);
  return next;
};

export const useWeeklyResetCountdown = () => {
  const [target, setTarget] = React.useState<Date>(() => getNextWeeklyReset());
  const [nowTs, setNowTs] = React.useState<number>(() => Date.now());

  React.useEffect(() => {
    const id = window.setInterval(() => setNowTs(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  React.useEffect(() => {
    if (nowTs >= target.getTime()) {
      setTarget(getNextWeeklyReset());
    }
  }, [nowTs, target]);

  const msLeft = Math.max(0, target.getTime() - nowTs);
  const totalSeconds = Math.floor(msLeft / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
};


