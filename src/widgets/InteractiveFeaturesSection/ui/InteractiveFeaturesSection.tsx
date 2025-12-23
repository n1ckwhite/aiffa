import React from 'react';
import { Box, Container, VStack, Text, SimpleGrid } from '@chakra-ui/react';
import { useInteractiveColors } from '../colors/useInteractiveColors';
import { colorRgbMap } from '../data/colors';
import { features } from '../data/features';
import { LottieHeroIcon } from "@/shared/icons/components-icon";


const InteractiveFeaturesSection: React.FC = () => {
  const { cardBg, textColor, titleColor, spotlightAlpha } = useInteractiveColors();

  return (
    <Box px={0}>
        <LottieHeroIcon />
      <Container maxW="1200px">
        <VStack spacing={12} align="center">
          <VStack
            spacing={5}
            textAlign="center"
            maxW="600px"
            data-index={0}
            opacity={1}
            transform={'none'}
            willChange={undefined}
          >
            <Text
              fontSize={{ base: '2xl', md: '3xl' }}
              fontWeight="bold"
              color={titleColor}
            >
              Особенности экосистемы
            </Text>
            <Text
              fontSize="lg"
              color={textColor}
              lineHeight="1.6"
            >
              Это не курс — это открытая экосистема IT. Каждый может вносить вклад в материалы, задачи,
              хакатоны и проекты. Ваш вклад виден (GitHub-профиль) и ценится. Обучаясь и помогая другим,
              вы развиваетесь быстрее.
            </Text>

          </VStack>

          <SimpleGrid
            // Safari tends to "squeeze" cards when columns are forced.
            // Using `minChildWidth` makes cards wrap instead of shrinking below the minimum.
            minChildWidth={{ base: "100%", sm: "320px" }}
            spacing={6}
            w="full"
            alignItems="stretch"
          >
            {features.map((feature, index) => {
              const rgb = colorRgbMap[feature.color] ?? '59, 130, 246';
              const spotlight = `radial-gradient(420px 160px at 0% 0%, rgba(${rgb}, ${spotlightAlpha}), transparent 60%), radial-gradient(420px 160px at 100% 100%, rgba(${rgb}, ${spotlightAlpha}), transparent 60%)`;
              return (
                <Box
                  data-index={index}
                  textAlign="center"
                  key={index}
                  bg={cardBg}
                  border="1px"
                  borderColor={`${feature.color}.300`}
                  borderRadius="16px"
                  p={8}
                  h="100%"
                  display="flex"
                  flexDirection="column"
                  position="relative"
                  overflow="hidden"
                  opacity={1}
                  transform={'none'}
                  sx={{ animation: 'none' }}
                  willChange={undefined}
                  boxShadow={'0 8px 24px rgba(0, 0, 0, 0.08)'}
                  transition="all 0.2s ease"
                  _hover={{ transform: 'translateY(-2px)', boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)' }}
                  _before={{
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: spotlight,
                    zIndex: 0,
                    pointerEvents: 'none',
                  }}
                >
                  <VStack spacing={4} align="center" flex={1} position="relative" zIndex={1}>
                    <Box
                      p={3}
                      borderRadius="full"
                      bg={`${feature.color}.50`}
                      color={`${feature.color}.600`}
                      boxShadow={'0 6px 14px rgba(0, 0, 0, 0.08)'}
                    >
                      {feature.icon}
                    </Box>
                    <VStack spacing={2} align="center">
                      <Text fontSize="xl" fontWeight="bold" color={titleColor}>
                        {feature.title}
                      </Text>
                      <Text fontSize="sm" color={textColor} textAlign="center">
                        {feature.description}
                      </Text>
                    </VStack>
                  </VStack>
                </Box>
              );
            })}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default InteractiveFeaturesSection;



