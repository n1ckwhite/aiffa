import React from 'react';
import { Box, Button, Collapse, HStack, Text } from '@chakra-ui/react';
import { ChevronDownIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import type { TaskHintProps } from './types';
import { useTaskHintColors } from './colors';
import { useTaskHint } from './model/useTaskHint';

export const TaskHint: React.FC<TaskHintProps> = ({ content, accent }) => {
  const { isOpen, handleToggle, shownContent } = useTaskHint(content);
  const { borderCol, textCol, chipBg, chipBorder, chipText, chipHoverBg, panelBg, panelShadow, infoColor } = useTaskHintColors();
  return (
    <Box mb={3}>
      <Button onClick={handleToggle} size="xs" variant="outline" borderRadius="full" px={3} py={1.5 as any} borderColor={chipBorder} bg={chipBg} color={chipText} _hover={{ bg: chipHoverBg }} rightIcon={<ChevronDownIcon boxSize={3.5} transform={isOpen ? 'rotate(180deg)' : 'rotate(0deg)'} transition="transform 0.2s ease" />}>
        <HStack spacing={2}>
          <Box w="8px" h="8px" borderRadius="full" bg={accent} />
          <Text fontSize="xs">Подсказка</Text>
        </HStack>
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <Box mt={2} position="relative" borderRadius="xl" borderWidth="1px" borderColor={borderCol} overflow="hidden" bg={panelBg} boxShadow={panelShadow}>
          <HStack spacing={3} px={{ base: 3, md: 4 }} py={{ base: 2.5, md: 3 }} color={textCol} align={{ base: 'flex-start', md: 'center' }}>
            <InfoOutlineIcon boxSize={4} color={infoColor} />
            <Text fontSize="sm" lineHeight={1.7} wordBreak="break-word" style={{ overflowWrap: 'anywhere' }}>
              {shownContent}
            </Text>
          </HStack>
        </Box>
      </Collapse>
    </Box>
  );
};


