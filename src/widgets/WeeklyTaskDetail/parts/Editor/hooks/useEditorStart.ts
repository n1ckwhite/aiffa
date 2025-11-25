import React from 'react';

type UseEditorStartArgs = {
  onStart: () => void;
};

export const useEditorStart = ({ onStart }: UseEditorStartArgs) => {
  const [isStarting, setIsStarting] = React.useState(false);

  const handleStartClick = React.useCallback(() => {
    if (isStarting) {
      return;
    }
    setIsStarting(true);
    onStart();
  }, [isStarting, onStart]);

  const resetStartState = React.useCallback(() => {
    setIsStarting(false);
  }, []);

  return {
    isStarting,
    handleStartClick,
    resetStartState,
  };
};



