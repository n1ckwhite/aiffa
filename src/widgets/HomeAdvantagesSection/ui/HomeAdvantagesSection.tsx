import React from 'react';
import { Box, Container, Heading, Icon, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { useHomeAdvantagesColors } from '../colors/useHomeAdvantagesColors';
import { advantagesItems } from '../data/advantages';
import { cardFadeInUp, iconScaleIn } from '../animations';

const CARD_ANIMATION_DURATION = 0.4;
const STAGGER_DELAY = 0.08;

const HomeAdvantagesSection: React.FC = () => {
  const { titleColor, descColor, cardBg, cardBorder, iconColorsByKey } = useHomeAdvantagesColors();

  return (
    <Box
      as="section"
      bg="transparent"
      py={{ base: 10, md: 14 }}
      aria-labelledby="advantages-title"
    >
      <Container maxW="1200px">
        <VStack spacing="4" align="stretch" w="full">
          <Heading
            id="advantages-title"
            as="h2"
            size="lg"
            color={titleColor}
            textAlign="center"
            fontWeight="bold"
          >
            Преимущества AIFFA
          </Heading>
          <Text
            as="p"
            color={descColor}
            textAlign="center"
            fontSize={{ base: 'sm', md: 'md' }}
            lineHeight="1.6"
            maxW="640px"
            mx="auto"
          >
            Короткие блоки по ключевым темам фронтенда: повторяйте базу, закрывайте пробелы и готовьтесь к собеседованиям без лишней воды.
          </Text>
          <SimpleGrid
            columns={{ base: 1, sm: 2 }}
            spacing={{ base: 4, md: 6 }}
            w="full"
            maxW="880px"
            mx="auto"
          >
            {advantagesItems.map((item, idx) => {
              const iconColors = iconColorsByKey[item.iconColorKey];
              return (
                <Box
                  key={idx}
                  role="group"
                  bg={cardBg}
                  borderWidth="1px"
                  borderColor={cardBorder}
                  borderRadius="xl"
                  p={{ base: 4, md: 5 }}
                  transition="border-color 0.2s, transform 0.2s"
                  _hover={{ transform: 'translateY(-2px)', borderColor: 'blue.200' }}
                  sx={{
                    animation: `${cardFadeInUp} ${CARD_ANIMATION_DURATION}s ease-out ${idx * STAGGER_DELAY}s both`,
                  }}
                >
                  <VStack align="stretch" spacing={2} textAlign="left">
                    <Box
                      bg={iconColors.bg}
                      color={iconColors.color}
                      borderRadius="lg"
                      p={2.5}
                      w="fit-content"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      transition="transform 0.2s"
                      _groupHover={{ transform: 'scale(1.05)' }}
                      sx={{
                        animation: `${iconScaleIn} 0.35s ease-out ${idx * STAGGER_DELAY + 0.05}s both`,
                      }}
                    >
                      <Icon as={item.icon} boxSize={5} aria-hidden />
                    </Box>
                    <Text fontWeight="semibold" color={titleColor} fontSize="md">
                      {item.title}
                    </Text>
                    <Text fontSize="sm" color={descColor} lineHeight="1.5">
                      {item.description}
                    </Text>
                  </VStack>
                </Box>
              );
            })}
          </SimpleGrid>
          <Text
            as="p"
            color={descColor}
            textAlign="center"
            fontSize={{ base: 'sm', md: 'md' }}
            lineHeight="1.6"
            maxW="560px"
            mx="auto"
            pt={2}
          >
            Удобно читать в метро, в очереди или за чашкой кофе — короткие блоки, без воды, тихо по своей теме. Повторил базу, закрыл пробелы, пошёл дальше.
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default HomeAdvantagesSection;
