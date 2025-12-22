import React from 'react';
import { Box, HStack, Heading, Icon, Text, VStack } from '@chakra-ui/react';
import { AddIcon, QuestionOutlineIcon } from '@chakra-ui/icons';
import SupportBlock from 'widgets/SupportBlock';
import type { ModulesFAQProps } from './types/ModulesFAQ.types';
import { modulesFaqConfig } from './data';
import { useModulesFaqColors } from './colors/useModulesFaqColors';
import { useModulesFaqController } from './hooks/useModulesFaqController';
import { getFaqAnswerId, getFaqQuestionId, getFaqSectionTitleId } from './helpers/ids';

const FAQ: React.FC<ModulesFAQProps> = ({ title, variant, showSupportBlock = true }) => {
  const { headingColor, titleColor, textColor, sectionBg, focusShadow } = useModulesFaqColors();
  const key = variant ?? 'materials';
  const { items: list, title: defaultHeading } = modulesFaqConfig[key];
  const heading = title || defaultHeading;
  const supportVariant = key === 'blog' ? 'blog' : 'modules';
  const sectionTitleId = getFaqSectionTitleId(key);

  const { openIdx, toggleIdx } = useModulesFaqController({
    variantKey: key,
    itemsCount: list.length,
  });

  return (
      <VStack
        as="section"
        aria-labelledby={sectionTitleId}
        align="stretch"
        gap={{ base: 5, md: 7 }}
        w="100%"
        maxW={{ base: '100%', md: '900px' }}
        mx="auto"
      >
        <HStack mb={2} spacing={3} color={headingColor} align="center">
          <Icon as={QuestionOutlineIcon} boxSize={{ base: 4, md: 5 }} />
          <Heading
            as="h2"
            id={sectionTitleId}
            fontSize={{ base: 'lg', md: 'xl' }}
            letterSpacing="wider"
          >
            {heading}
          </Heading>
        </HStack>
        <Box
          borderWidth="1px"
          borderRadius="2xl"
          p={{ base: 3, md: 4, lg: 5 }}
          bg={sectionBg}
        >
          <VStack align="stretch" spacing={0}>
            {list.map((it, idx) => {
              const isOpen = openIdx === idx;
              const buttonId = getFaqQuestionId(key, idx);
              const panelId = getFaqAnswerId(key, idx);

              return (
                <Box
                  key={idx}
                >
                  <Box
                    as="button"
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleIdx(idx)}
                    w="100%"
                    textAlign="left"
                    px={0}
                    py={{ base: 2.5, md: 3 }}
                    borderRadius="xl"
                    bg={isOpen ? 'transparent' : 'transparent'}
                    _hover={{ bg: 'transparent' }}
                    _focusVisible={{ boxShadow: focusShadow }}
                    transition="background-color 160ms ease"
                    display="block"
                    cursor="pointer"
                  >
                    <HStack justify="space-between" align="flex-start" gap={3}>
                      <Text
                        as="span"
                        fontWeight="semibold"
                        fontSize={{ base: 'md', md: 'lg' }}
                        lineHeight={1.35}
                        flex="1 1 auto"
                        minW={0}
                      >
                        {it.title}
                      </Text>
                      <Box
                        w="28px"
                        h="28px"
                        borderRadius="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexShrink={0}
                        mt={{ base: 0.5, md: 1 }}
                        transition="transform 180ms ease, background-color 160ms ease"
                        transform={isOpen ? 'rotate(45deg)' : 'rotate(0deg)'}
                      >
                        <AddIcon boxSize={{ base: 3, md: 3.5 }} color={titleColor} />
                      </Box>
                    </HStack>
                  </Box>

                  <Box
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    aria-hidden={!isOpen}
                    display="grid"
                    gridTemplateRows={isOpen ? '1fr' : '0fr'}
                    opacity={isOpen ? 1 : 0}
                    transition="grid-template-rows 220ms ease, opacity 160ms ease"
                    willChange="grid-template-rows, opacity"
                    overflow="hidden"
                  >
                    {/* minH=0 is critical for 0fr -> 1fr animation */}
                    <Box minH={0} px={0} pt={0} pb={3} overflow="hidden">
                      <Text fontSize="sm" lineHeight={1.8} color={textColor} textAlign="left">
                        {it.content}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </VStack>
        </Box>
        {showSupportBlock && <SupportBlock variant={supportVariant} />}
      </VStack>
  );
};

export default FAQ;