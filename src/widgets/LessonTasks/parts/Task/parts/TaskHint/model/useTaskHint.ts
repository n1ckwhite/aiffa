import { useDisclosure } from '@chakra-ui/react';

export const useTaskHint = (content?: string) => {
  const { isOpen, onToggle } = useDisclosure();
  const shownContent =
    content && content.trim().length > 0
      ? content
      : 'Попробуйте ещё раз внимательно перечитать условие и проверьте формулировки. Если не получается — загляните в материалы урока.';

  const handleToggle = () => onToggle();
  return { isOpen, handleToggle, shownContent };
};


