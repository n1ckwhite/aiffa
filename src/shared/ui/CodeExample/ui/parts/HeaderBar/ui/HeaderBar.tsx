import React from 'react';
import { HStack, Tooltip, IconButton, Text } from '@chakra-ui/react';
import { CopyIcon, CheckIcon } from '@chakra-ui/icons';
import type { HeaderBarProps } from '../types/HeaderBar.types';

export const HeaderBar: React.FC<HeaderBarProps> = ({
  title,
  displayLang,
  langColor,
  hasCopied,
  onCopy,
  headerBg,
  headerBorder,
  copyHoverBg,
  copyActiveBg,
}) => {
  const radius = 14;
  const checkIconColor = 'green.400';
  const copyIconColor = 'currentColor';

  return (
    <HStack
      bg={headerBg}
      borderWidth={headerBg === 'transparent' ? 0 : 1}
      borderColor={headerBorder}
      borderBottomWidth={headerBg === 'transparent' ? 0 : 0}
      px={headerBg === 'transparent' ? 0 : { base: 3, md: 4 }}
      py={headerBg === 'transparent' ? 0 : 2}
      borderTopLeftRadius={headerBg === 'transparent' ? 0 : radius}
      borderTopRightRadius={headerBg === 'transparent' ? 0 : radius}
      justify="space-between"
    >
      {title && <Text fontWeight="semibold">{title}</Text>}
      <HStack spacing={3}>
        {displayLang && (
          <Text fontSize="sm" fontWeight="bold" letterSpacing="wide" color={langColor}>
            {displayLang}
          </Text>
        )}
        <Tooltip label={hasCopied ? 'Скопировано' : 'Копировать'}>
          <IconButton
            aria-label="Скопировать пример"
            size="xs"
            variant="ghost"
            bg="transparent"
            icon={hasCopied ? <CheckIcon boxSize={3} color={checkIconColor} /> : <CopyIcon boxSize={3} color={copyIconColor} />}
            onClick={onCopy}
            borderRadius="md"
            _hover={{ bg: copyHoverBg }}
            _active={{ bg: copyActiveBg }}
          />
        </Tooltip>
      </HStack>
    </HStack>
  );
};


