import React from 'react';
import { Box, VStack, HStack, Heading, Accordion, AccordionItem, AccordionButton, AccordionPanel, Icon } from '@chakra-ui/react';
import { AddIcon, QuestionOutlineIcon } from '@chakra-ui/icons';
import { useAppColors } from 'shared/theme/colors';
import SupportBlock from 'widgets/SupportBlock';
import type { ModulesFAQProps } from './types/ModulesFAQ.types';
import { modulesFaqConfig } from './data';

const FAQ: React.FC<ModulesFAQProps> = ({ title, variant, showSupportBlock = true }) => {
  const theme = useAppColors();
  const faqHeadingColor = theme.blue.accent;
  const faqBorderColor = theme.borderColor;
  const faqTitleColor = theme.blue.accent;
  const faqTextColor = theme.descColor;
  const key = variant ?? 'materials';
  const { items: list, title: defaultHeading } = modulesFaqConfig[key];
  const heading = title || defaultHeading;

  return (
    <Box>
      <VStack align="stretch" gap={{ base: 5, md: 7 }} maxW={{ base: '100%', md: '900px' }} mx="auto" zIndex={100}>
        <HStack mb={2} spacing={3} color={faqHeadingColor} align="center">
          <Icon as={QuestionOutlineIcon} />
          <Heading as="h2" size="md" letterSpacing="wider">
            {heading}
          </Heading>
        </HStack>
        <Box borderWidth="1px" borderColor={faqBorderColor} borderRadius="2xl" p={{ base: 3, md: 4 }} bg="transparent">
          <Accordion allowToggle>
            {list.map((it, idx) => (
              <AccordionItem key={idx} border="none">
                {({ isExpanded }) => (
                  <>
                    <h2>
                      <AccordionButton
                        px={0}
                        py={3}
                        borderRadius="xl"
                        borderBottomRadius={isExpanded ? 0 : 'xl'}
                        borderWidth={0}
                        bg="transparent"
                        _hover={{ bg: 'transparent' }}
                        _focus={{ boxShadow: 'none' }}
                        mb={isExpanded ? 0 : 2}
                        justifyContent="space-between"
                      >
                        <HStack flex="1" spacing={3}>
                          <Box as="span" fontWeight="semibold" fontSize="md" textAlign="left">
                            {it.title}
                          </Box>
                        </HStack>
                        <Box
                          w="24px"
                          h="24px"
                          borderRadius="full"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          flexShrink={0}
                          transform={isExpanded ? 'rotate(45deg)' : 'rotate(0deg)'}
                          transition="transform 180ms ease"
                        >
                          <AddIcon boxSize={3} color={faqTitleColor} />
                        </Box>
                      </AccordionButton>
                    </h2>
                    <AccordionPanel
                      px={0}
                      pt={0}
                      pb={3}
                      fontSize="sm"
                      lineHeight={1.8}
                      color={faqTextColor}
                      bg="transparent"
                      borderWidth={0}
                      mb={2}
                      textAlign="left"
                    >
                      {it.content}
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </Box>
        {showSupportBlock && <SupportBlock variant="modules" />}
      </VStack>
    </Box>
  );
};

export default FAQ;


