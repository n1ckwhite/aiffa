import React from "react";
import { Box, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { usePartnersColors } from "widgets/Partners/colors/usePartnersColors";
import { steps } from "./data/index";

const HowItWorksSection: React.FC = () => {
  const {
    mutedTextColor,
    stepNumberBg,
    stepNumberColor,
    stepCardBg,
    stepCardBorder,
  } = usePartnersColors();

  return (
    <Box as="section" aria-label="Как проходит партнёрство" zIndex={100}>
      <Stack align="center" spacing={{ base: 4, md: 5 }}>
        <Box
          as="header"
          textAlign="center"
          justifyContent="center"
          alignItems="center"
          display="flex"
          flexDirection="column"
          gap={3}
        >
          <Heading as="h2" size={{base: "md", md: "lg"}} letterSpacing="-0.02em">
            Как проходит партнёрство
          </Heading>
          <Text
            align="center"
            fontSize={{base: "md", md: "lg"}}
            color={mutedTextColor}
            maxW={{ base: "100%", md: "720px" }}
          >
            Делаем процесс прозрачным: на старте вы формулируете задачу, на финише — получаете
            отчёт с результатами и следующими шагами.
          </Text>
        </Box>

        <SimpleGrid
          as="ol"
          role="list"
          listStyleType="none"
          pl={0}
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 4, md: 5 }}
          mt={{ base: 2, md: 3 }}
          w="full"
        >
          {steps.map((step) => (
            <Stack
              key={step.id}
              as="li"
              role="listitem"
              direction="row"
              spacing={4}
              align="flex-start"
            >
              <Box>
                <Box
                  boxSize={9}
                  borderRadius="full"
                  bg={stepNumberBg}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color={stepNumberColor}
                  fontWeight="semibold"
                  fontSize="sm"
                  flexShrink={0}
                >
                  {step.number}
                </Box>
              </Box>
              <Box
                flex="1"
                bg={stepCardBg}
                borderRadius="xl"
                borderWidth="1px"
                borderColor={stepCardBorder}
                p={{ base: 3, md: 4 }}
              >
                <Heading as="h3" size="sm" mb={1}>
                  {step.title}
                </Heading>
                <Text fontSize="sm" color={mutedTextColor}>
                  {step.description}
                </Text>
              </Box>
            </Stack>
          ))}
        </SimpleGrid>
      </Stack>
    </Box>
  );
};

export default HowItWorksSection;


