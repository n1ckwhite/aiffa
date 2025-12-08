import React from 'react';
import type { VoteChoice } from '../types';

export const useFeedbackController = (lessonKey: string) => {
  const [choice, setChoice] = React.useState<VoteChoice | null>(null);
  const [mounted, setMounted] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const [showThanks, setShowThanks] = React.useState(false);
  const [pulsing, setPulsing] = React.useState<VoteChoice | null>(null);

  React.useEffect(() => {
    setChoice(null);
    setVisible(true);
    setShowThanks(false);
    setMounted(true);
  }, [lessonKey]);

  React.useEffect(() => {
    let t1: number | undefined;
    let t2: number | undefined;
    return () => {
      if (t1) window.clearTimeout(t1);
      if (t2) window.clearTimeout(t2);
    };
  }, []);

  const vote = (v: VoteChoice) => {
    setChoice(v);
    setPulsing(v);
    const t1 = window.setTimeout(() => { setShowThanks(true); }, 300);
    // даём пользователю больше времени прочитать сообщение благодарности
    const t2 = window.setTimeout(() => { setVisible(false); setPulsing(null); }, 4500);
    return { t1, t2 };
  };

  return { choice, mounted, visible, showThanks, pulsing, vote };
};


