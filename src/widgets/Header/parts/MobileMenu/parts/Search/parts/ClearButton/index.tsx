import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import type { ClearButtonProps } from './types';

export const ClearButton: React.FC<ClearButtonProps> = ({ visible, color, hoverColor, hoverBg, onClear }) => {
  if (!visible) return null;
  return (
    <IconButton
      aria-label="Очистить поиск"
      icon={<CloseIcon />}
      size="xs"
      variant="ghost"
      position="absolute"
      right="8px"
      top="50%"
      transform="translateY(-50%)"
      color={color}
      className="clear-button"
      zIndex={1201}
      _hover={{ color: hoverColor, bg: hoverBg }}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClear}
    />
  );
};



