import {useEffect} from 'react';

export const useModalScrollLock = () => {
  useEffect(() => {
    try {
      const body = document.body;
      const prevOverflow = body.style.overflow;
      const prevTouchAction = (body.style as any).touchAction;
      const prevOverscroll = (body.style as any).overscrollBehavior;
      body.style.overflow = 'hidden';
      (body.style as any).touchAction = 'none';
      (body.style as any).overscrollBehavior = 'contain';
      return () => {
        body.style.overflow = prevOverflow;
        (body.style as any).touchAction = prevTouchAction || '';
        (body.style as any).overscrollBehavior = prevOverscroll || '';
      };
    } catch (error) {
      console.error('Failed to lock scroll:', error);
    }
  }, []);
};


