import React from "react";
import { Box, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { usePartnersColors } from "widgets/Partners/colors/usePartnersColors";
import { steps } from "./data/index";

const HowItWorksSection: React.FC = () => {
  const {
    socialProofBadgeBorder,
    mutedTextColor,
    stepNumberBg,
    stepNumberColor,
    stepCardBg,
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
          minChildWidth={{ base: "100%", md: "400px" }}
          spacing={{ base: 4, md: 5 }}
          mt={{ base: 2, md: 3 }}
          w="full"
          minW={0}
          maxW="100%"
          boxSizing="border-box"
        >
          {steps.map((step) => (
            <Stack
              key={step.id}
              as="li"
              role="listitem"
              direction="row"
              spacing={4}
              align="flex-start"
              w="full"
              minW={{ base: "100%", md: "400px" }}
              maxW="100%"
              boxSizing="border-box"
              flexShrink={0}
            >
              <Box flexShrink={0}>
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
                p={{ base: 3, md: 4 }}
                minW={0}
                borderColor={socialProofBadgeBorder}
                w="full"
              >
                <Heading as="h3" size="sm" mb={1} wordBreak="break-word" overflowWrap="anywhere" whiteSpace="normal">
                  {step.title}
                </Heading>
                <Text fontSize="sm" color={mutedTextColor} wordBreak="break-word" overflowWrap="anywhere" whiteSpace="normal">
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


