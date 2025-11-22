import React from 'react';

type UseCodeEditorReadyParams = {
  enabled?: boolean;
  preferNative?: boolean;
  isReady: boolean;
  onReady?: () => void;
};

export const useCodeEditorReady = ({
  enabled,
  preferNative,
  isReady,
  onReady,
}: UseCodeEditorReadyParams): void => {
  const hasNotifiedReadyRef = React.useRef(false);

  React.useEffect(() => {
    if (!onReady) return;
    if (hasNotifiedReadyRef.current) return;
    if (!enabled || preferNative) return;
    if (!isReady) return;
    hasNotifiedReadyRef.current = true;
    try {
      onReady();
    } catch (error) {
      console.error(error);
    }
  }, [enabled, preferNative, isReady, onReady]);
};


