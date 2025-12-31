import React from 'react';
import { HStack, Button, useColorModeValue } from '@chakra-ui/react';
import { useActionsRowColors } from './colors/useActionsRowColors';

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

  const { editActiveBg, editBg, editHoverBg } = useActionsRowColors()

  return (
    <HStack spacing={3} justify="center">
      <Button
        onClick={onOpenEdit}
        bg={editBg}
        color="white"
        _hover={{ bg: editHoverBg }}
        _active={{ bg: editActiveBg }}
      >
        Изменить
      </Button>
      <Button
        variant="ghost"
        onClick={onReset}
        color={resetColor}
        _hover={{ bg: resetHoverBg }}
        _light={{ _hover: { bg: resetHoverBg }, _active: { bg: resetActiveBg } }}
        _dark={{ _hover: { bg: resetHoverBgDark }, _active: { bg: resetActiveBgDark } }}
      >
        Сбросить
      </Button>
    </HStack>
  );
};

export default ActionsRow;


