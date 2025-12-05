import React from 'react';

type UseTaskCompletionContentArgs = {
  completed?: boolean;
  context?: 'lesson' | 'weekly';
};

export const useTaskCompletionContent = ({
  completed = true,
  context = 'lesson',
}: UseTaskCompletionContentArgs) => {
  const title = React.useMemo(() => {
    if (context === 'weekly') {
      return 'Задача недели выполнена';
    }
    return completed ? 'Отлично! Все задачи выполнены' : 'Задача выполнена';
  }, [context, completed]);

  const description = React.useMemo(() => {
    if (context === 'weekly') {
      return 'Можно вернуться к списку задач недели или заняться другими материалами.';
    }
    return completed
      ? 'Можно переходить к следующему материалу или повторить упражнения.'
      : 'Продолжай — награда зачислена, двигаемся дальше.';
  }, [context, completed]);

  return {
    title,
    description,
  };
};
















































