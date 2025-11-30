import React from 'react';
import { HStack, Button } from '@chakra-ui/react';

export type ActionsRowProps = {
  onOpenEdit: () => void;
  onReset: () => void;
  resetColor: string;
  resetHoverBg: string;
  resetActiveBg: string;
   resetHoverBgDark: string;
   resetActiveBgDark: string;
};

const ActionsRow: React.FC<ActionsRowProps> = ({
  onOpenEdit,
  onReset,
  resetColor,
  resetHoverBg,
  resetActiveBg,
  resetHoverBgDark,
  resetActiveBgDark,
}) => {
  return (
    <HStack spacing={3} justify="center">
      <Button colorScheme="blue" onClick={onOpenEdit}>Изменить</Button>
      <Button
        variant="ghost"
        onClick={onReset}
        color={resetColor}
        _light={{ _hover: { bg: resetHoverBg }, _active: { bg: resetActiveBg } }}
        _dark={{ _hover: { bg: resetHoverBgDark }, _active: { bg: resetActiveBgDark } }}
      >
        Сбросить
      </Button>
    </HStack>
  );
};

export default ActionsRow;


