import React from 'react';

type UseEditorReadyOptions = {
  onReady?: () => void;
};

export const useEditorReady = ({ onReady }: UseEditorReadyOptions) => {
  const [isEditorReady, setIsEditorReady] = React.useState(false);

  const handleEditorReady = React.useCallback(() => {
    setIsEditorReady(true);
    onReady?.();
  }, [onReady]);

  return {
    isEditorReady,
    handleEditorReady,
  };
};



