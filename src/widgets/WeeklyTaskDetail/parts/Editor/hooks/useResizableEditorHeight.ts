import React from 'react';

type ResizeSession = {
  startY: number;
  startHeight: number;
};

type UseResizableEditorHeightOptions = {
  initialHeight?: string | number;
  minHeight?: number;
  maxHeight?: number;
};

export const useResizableEditorHeight = (options?: UseResizableEditorHeightOptions) => {
  const {
    initialHeight = 'clamp(240px, 60vh, 720px)',
    minHeight = 220,
    maxHeight = 900,
  } = options || {};

  const [editorHeight, setEditorHeight] = React.useState<string | number>(initialHeight);
  const editorContainerRef = React.useRef<HTMLDivElement | null>(null);
  const resizeSessionRef = React.useRef<ResizeSession | null>(null);

  const handleResizeStart = React.useCallback((
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    const pointY =
      'touches' in event ? event.touches?.[0]?.clientY ?? null : (event as React.MouseEvent).clientY;
    if (pointY == null) return;

    const containerElement = editorContainerRef.current;
    const currentHeight = containerElement?.getBoundingClientRect().height || Number(minHeight);

    resizeSessionRef.current = {
      startY: pointY,
      startHeight: currentHeight,
    };

    const handlePointerMove = (nativeEvent: MouseEvent | TouchEvent) => {
      const movePointY =
        'touches' in nativeEvent
          ? (nativeEvent as TouchEvent).touches?.[0]?.clientY ?? null
          : (nativeEvent as MouseEvent).clientY;
      if (movePointY == null || !resizeSessionRef.current) return;

      const deltaY = movePointY - resizeSessionRef.current.startY;
      const nextHeight = Math.min(
        maxHeight,
        Math.max(minHeight, resizeSessionRef.current.startHeight + deltaY),
      );
      setEditorHeight(nextHeight);
    };

    const handlePointerEnd = () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerEnd);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerEnd);
      resizeSessionRef.current = null;
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerEnd);
    window.addEventListener('touchmove', handlePointerMove);
    window.addEventListener('touchend', handlePointerEnd);

    event.preventDefault();
  }, [maxHeight, minHeight]);

  return {
    editorHeight,
    editorContainerRef,
    handleResizeStart,
  };
};



