import React from 'react';
import { Box, HStack, AccordionItem, AccordionButton, AccordionPanel } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import type { FAQItemProps } from './types';

const FAQItem: React.FC<FAQItemProps> = ({ item, titleColor, textColor }) => {
  return (
    <AccordionItem border="none">
      {({ isExpanded }) => (
        <>
          <h2>
            <AccordionButton px={0} py={3} borderRadius="xl" borderBottomRadius={isExpanded ? 0 : 'xl'} borderWidth={0} bg="transparent" _hover={{ bg: 'transparent' }} _focus={{ boxShadow: 'none' }} mb={isExpanded ? 0 : 2} justifyContent="space-between">
              <HStack flex="1" spacing={3}>
                <Box as="span" textAlign="left" fontWeight="semibold" fontSize="md">{item.title}</Box>
              </HStack>
              <Box w="24px" h="24px" borderRadius="full" display="flex" alignItems="center" justifyContent="center" flexShrink={0} transform={isExpanded ? 'rotate(45deg)' : 'rotate(0deg)'} transition="transform 180ms ease">
                <AddIcon boxSize={3} color={titleColor} />
              </Box>
            </AccordionButton>
          </h2>
          <AccordionPanel px={0} pt={0} pb={3} fontSize="sm" lineHeight={1.8} color={textColor} bg="transparent" borderWidth={0} textAlign="left">
            <span dangerouslySetInnerHTML={{ __html: item.content }} />
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
};

export default FAQItem;


