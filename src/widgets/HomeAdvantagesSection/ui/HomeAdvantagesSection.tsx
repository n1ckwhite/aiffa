import React from 'react';
import { Box, Container, Heading, Icon, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { useHomeAdvantagesColors } from '../colors/useHomeAdvantagesColors';
import { advantagesItems } from '../data/advantages';

const HomeAdvantagesSection: React.FC = () => {
  const { titleColor, descColor, cardBg, cardBorder, iconBg, iconColor } = useHomeAdvantagesColors();

  return (
    <Box
      as="section"
      bg="transparent"
      py={{ base: 10, md: 14 }}
      px={4}
      aria-labelledby="advantages-title"
    >
      <Container maxW="1200px">
        <VStack spacing={{ base: 8, md: 10 }} align="stretch" w="full">
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
          <SimpleGrid
            columns={{ base: 1, sm: 2 }}
            spacing={{ base: 4, md: 6 }}
            w="full"
            maxW="880px"
            mx="auto"
          >
            {advantagesItems.map((item, idx) => (
              <Box
                key={idx}
                bg={cardBg}
                borderWidth="1px"
                borderColor={cardBorder}
                borderRadius="xl"
                p={{ base: 4, md: 5 }}
                _hover={{ borderColor: 'blue.200' }}
                transition="border-color 0.2s"
              >
                <VStack align="stretch" spacing={2} textAlign="left">
                  <Box
                    bg={iconBg}
                    color={iconColor}
                    borderRadius="lg"
                    p={2.5}
                    w="fit-content"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
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
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default HomeAdvantagesSection;
