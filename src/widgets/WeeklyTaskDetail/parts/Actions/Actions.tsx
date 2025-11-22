import React from 'react';
import { HStack, Stack, Button, Icon, Link as ChakraLink } from '@chakra-ui/react';
import { FaUpRightFromSquare } from 'react-icons/fa6';
import { ActionsProps } from './types';

const Actions: React.FC<ActionsProps> = ({ onCheck, checking, done, externalLinks, isEditorReady }) => {
  return (
    <Stack
      direction={{ base: 'column', md: 'row' }}
      spacing={3}
      align={{ base: 'stretch', md: 'center' }}
      mt={{ base: 3, md: 4 }}
    >
      <Button
        colorScheme="blue"
        onClick={onCheck}
        isLoading={checking}
        loadingText="Проверка"
        isDisabled={!!done || !isEditorReady}
        cursor={!isEditorReady ? 'not-allowed' : undefined}
        w={{ base: '100%', md: 'auto' }}
      >
        Проверить
      </Button>
      {externalLinks.length > 0 && (
        <HStack spacing={2} flexWrap="wrap" w={{ base: '100%', md: 'auto' }}>
          {externalLinks.map((l) => (
            <Button key={l.href} as={ChakraLink} href={l.href} target="_blank" rel="noopener noreferrer" leftIcon={<Icon as={FaUpRightFromSquare as unknown as React.ElementType} />} w={{ base: '100%', sm: 'auto' }}>
              {l.label}
            </Button>
          ))}
        </HStack>
      )}
    </Stack>
  );
};

export default Actions;


