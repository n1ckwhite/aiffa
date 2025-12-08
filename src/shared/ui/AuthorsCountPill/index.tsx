import React from 'react';
import { Box } from '@chakra-ui/react';
import type { AuthorsCountPillProps } from './types';
import { createPillHandlers } from './utils/createPillHandlers';

const AuthorsCountPill: React.FC<AuthorsCountPillProps> = ({
  count,
  color = 'blue.300',
  borderColor = 'whiteAlpha.300',
  showPlus = false,
  onClick,
}) => {
  if (!Number.isFinite(count) || count <= 0) {
    return null;
  }

  const label = `${showPlus ? '+' : ''}${count} Авторы`;

  const commonHandlers = createPillHandlers(onClick);

  return (
    <Box
      as="span"
      fontSize="xs"
      color={color}
      bg="transparent"
      px={2.5}
      py={1}
      borderRadius="full"
      borderWidth="1px"
      borderStyle="dashed"
      borderColor={borderColor}
      display="inline-flex"
      alignItems="center"
      gap={2}
      {...commonHandlers}
    >
      {label}
    </Box>
  );
};

export default AuthorsCountPill;


