import { useEffect, useRef, useState } from 'react';

export const useRotatingIndex = (length: number, intervalMs: number): number => {
  const [index, setIndex] = useState(0);
  const lengthRef = useRef(length);
  lengthRef.current = length;

  useEffect(() => {
    if (!Number.isFinite(length) || length <= 0) {
      setIndex(0);
      return;
    }
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % lengthRef.current);
    }, Math.max(300, intervalMs || 6000));
    return () => window.clearInterval(id);
  }, [intervalMs, length]);

  useEffect(() => {
    if (index >= length && length > 0) {
      setIndex(0);
    }
  }, [length, index]);

  return index;
};



