import React from 'react';
import { useToast, type UseToastOptions } from '@chakra-ui/react';

/**
 * Хук для глобального «одиночного» тоста.
 * Перед показом нового тоста закрывает все предыдущие.
 */
export const useSingletonToast = (): ((options: UseToastOptions) => void) => {
  const toast = useToast();

  const showToast = React.useCallback(
    (options: UseToastOptions) => {
      toast.closeAll();
      const id = options.id ?? 'app-toast';
      toast({ ...options, id });
    },
    [toast],
  );

  return showToast;
};


