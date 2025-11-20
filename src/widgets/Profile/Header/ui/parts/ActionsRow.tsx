import React from 'react';
import { HStack, Button } from '@chakra-ui/react';

export type ActionsRowProps = {
  onOpenEdit: () => void;
  onReset: () => void;
  resetColor: string;
  resetHoverBg: string;
  resetActiveBg: string;
};

const ActionsRow: React.FC<ActionsRowProps> = ({ onOpenEdit, onReset, resetColor, resetHoverBg, resetActiveBg }) => {
  return (
    <HStack spacing={3} justify="center">
      <Button colorScheme="blue" onClick={onOpenEdit}>Изменить</Button>
      <Button variant="ghost" onClick={onReset} color={resetColor} _hover={{ bg: resetHoverBg }} _active={{ bg: resetActiveBg }}>
        Сбросить
      </Button>
    </HStack>
  );
};

export default ActionsRow;


