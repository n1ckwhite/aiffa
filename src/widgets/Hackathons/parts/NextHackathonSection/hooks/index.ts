import { useEffect, useState } from "react";
import type { CountdownState } from "../types";

const HACKATHON_START = new Date("2025-05-15T18:00:00+03:00");

const getCountdownState = (): CountdownState => {
  const now = new Date().getTime();
  const diff = HACKATHON_START.getTime() - now;

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      isStarted: true,
    };
  }

  const totalMinutes = Math.floor(diff / (1000 * 60));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  return {
    days,
    hours,
    minutes,
    isStarted: false,
  };
};

export const useNextHackathonCountdown = (): CountdownState => {
  const [countdown, setCountdown] = useState<CountdownState>(() => getCountdownState());

  useEffect(() => {
    const handleTick = () => {
      setCountdown(getCountdownState());
    };

    handleTick();

    const intervalId = window.setInterval(handleTick, 60_000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return countdown;
};


