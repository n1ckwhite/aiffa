import React from 'react';
import type { VoteChoice } from '../types';

export type UseFeedbackControllerOptions = {
  thanksDelayMs?: number;
  autoHideDelayMs?: number;
};

export const useFeedbackController = (lessonKey: string, options?: UseFeedbackControllerOptions) => {
  const [choice, setChoice] = React.useState<VoteChoice | null>(null);
  const [visible, setVisible] = React.useState(true);
  const [showThanks, setShowThanks] = React.useState(false);
  const [pulsing, setPulsing] = React.useState<VoteChoice | null>(null);

  const timersRef = React.useRef<{ thanks?: number; hide?: number }>({});

  const thanksDelayMs = options?.thanksDelayMs ?? 300;
  const autoHideDelayMs = options?.autoHideDelayMs ?? 4500;

  const clearTimers = React.useCallback(() => {
    if (timersRef.current.thanks != null) {
      window.clearTimeout(timersRef.current.thanks);
    }
    if (timersRef.current.hide != null) {
      window.clearTimeout(timersRef.current.hide);
    }
    timersRef.current = {};
  }, []);

  React.useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  React.useEffect(() => {
    clearTimers();
    setChoice(null);
    setVisible(true);
    setShowThanks(false);
    setPulsing(null);
  }, [lessonKey, clearTimers]);

  const vote = React.useCallback((v: VoteChoice) => {
    clearTimers();
    setChoice(v);
    setPulsing(v);
    setVisible(true);
    setShowThanks(false);
    timersRef.current.thanks = window.setTimeout(() => {
      setShowThanks(true);
    }, thanksDelayMs);
    timersRef.current.hide = window.setTimeout(() => {
      setVisible(false);
      setPulsing(null);
    }, autoHideDelayMs);
  }, [autoHideDelayMs, clearTimers, thanksDelayMs]);

  return { choice, visible, showThanks, pulsing, vote };
};


