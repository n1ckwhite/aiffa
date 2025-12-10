import React from "react";
import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { usePartnersColors } from "widgets/Partners/colors/usePartnersColors";

const HowItWorksSection: React.FC = () => {
  const {
    mutedTextColor,
    stepLineColor,
    stepNumberBg,
    stepNumberColor,
    stepCardBg,
    stepCardBorder,
  } = usePartnersColors();

  const steps = [
    "Вы рассказываете задачу и продукт",
    "Мы собираем формат под ваши цели",
    "Запускаем хакатон / Weekly / интеграцию",
    "Вы получаете отчёт, решения и метрики",
  ];

  return (
    <Box as="section" aria-label="Как проходит партнёрство" zIndex={100}>
      <VStack align="center" spacing={{ base: 4, md: 5 }}>
        <Box as="header" textAlign="center" justifyContent="center" alignItems="center" display="flex" flexDirection="column" gap={3}>
        <Heading as="h2" size="md" letterSpacing="-0.02em">
          Как проходит партнёрство
        </Heading>
        <Text align="center" fontSize="sm" color={mutedTextColor} maxW={{ base: "100%", md: "720px" }}>
          Делаем процесс прозрачным: на старте вы формулируете задачу, на финише — получаете
          отчёт с результатами и следующими шагами.
        </Text>
        </Box>
        <HStack
          spacing={6}
          align="stretch"
          w="full"
          display={{ base: "none", md: "flex" }}
        >
          {steps.map((title, index) => (
            <VStack
              key={title}
              align="center"
              spacing={3}
              flex={1}
            >
              <Box
                boxSize={9}
                borderRadius="full"
                bg={stepNumberBg}
                borderWidth="1px"
                borderColor={stepLineColor}
                display="flex"
                alignItems="center"
                justifyContent="center"
                color={stepNumberColor}
                fontWeight="semibold"
                fontSize="sm"
                flexShrink={0}
              >
                {index + 1}
              </Box>
              <Box
                w="full"
                borderRadius="xl"
                borderWidth="1px"
                borderColor={stepCardBorder}
                bg={stepCardBg}
                px={3}
                py={2}
              >
                <Text fontWeight="semibold" fontSize="sm" textAlign="center">
                  {title}
                </Text>
              </Box>
            </VStack>
          ))}
        </HStack>
        <VStack
          align="flex-start"
          spacing={3}
          w="full"
          display={{ base: "flex", md: "none" }}
        >
          {steps.map((title, index) => (
            <HStack key={title} align="flex-start" spacing={3} w="full">
              <VStack spacing={1} align="center">
                <Box
                  boxSize={8}
                  borderRadius="full"
                  bg={stepNumberBg}
                  borderWidth="1px"
                  borderColor={stepLineColor}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color={stepNumberColor}
                  fontWeight="semibold"
                  fontSize="xs"
                  flexShrink={0}
                >
                  {index + 1}
                </Box>
                {index < steps.length - 1 && (
                  <Box
                    w="2px"
                    flex={1}
                    bg={stepLineColor}
                  />
                )}
              </VStack>
              <Text fontSize="sm" color={mutedTextColor}>
                {title}
              </Text>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default HowItWorksSection;


