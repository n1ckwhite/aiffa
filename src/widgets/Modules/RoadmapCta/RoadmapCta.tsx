import React from "react";
import { Box, Button, Heading, HStack, Icon, Stack, Text, VStack } from "@chakra-ui/react";
import { FiMap, FiNavigation } from "react-icons/fi";
import { useAppColors } from "shared/theme/colors";

const headingId = "learn-roadmap-cta-title";

const RoadmapCta: React.FC = () => {
  const theme = useAppColors();

  const handleBuildRoadmapClick = () => {
    return;
  };

  return (
    <Box as="section" aria-labelledby={headingId}>
      <Box maxW={{ base: "100%", md: "1200px" }} mx="auto">
        <Box
          bg={theme.cardBg}
          borderWidth="1px"
          borderColor={theme.blue.chipBorder}
          borderRadius="2xl"
          px={{ base: 4, md: 6 }}
          py={{ base: 4, md: 6 }}
          position="relative"
          overflow="hidden"
          _before={{
            content: '""',
            position: "absolute",
            inset: 0,
            bgImage:
              "radial-gradient(220px 160px at 16% 18%, rgba(59,130,246,0.16), transparent 60%), radial-gradient(240px 180px at 86% 22%, rgba(59,130,246,0.12), transparent 62%)",
            pointerEvents: "none",
          }}
        >
          <HStack
            aria-hidden="true"
            position="absolute"
            right={{ base: "-18px", md: "-22px" }}
            top="50%"
            transform="translateY(-50%) rotate(-14deg)"
            opacity={{ base: 0.1, md: 0.14 }}
            color={theme.blue.accent}
            pointerEvents="none"
          >
            <Icon as={FiMap} boxSize={{ base: 28, md: 36 }} />
          </HStack>

          <Stack
            position="relative"
            zIndex={1}
            direction={{ base: "column", md: "row" }}
            spacing={{ base: 4, md: 6 }}
            align={{ base: "stretch", md: "center" }}
            justify="space-between"
          >
            <HStack spacing={3} align="flex-start">
              <Box
                w={{ base: "40px", md: "44px" }}
                h={{ base: "40px", md: "44px" }}
                borderRadius="xl"
                bg={theme.blue.chipBg}
                borderWidth="1px"
                borderColor={theme.blue.chipBorder}
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
              >
                <Icon as={FiNavigation} boxSize={5} color={theme.blue.accent} aria-hidden="true" />
              </Box>
              <VStack align="start" spacing={1} flex={1}>
                <Heading id={headingId} as="h2" size="md" letterSpacing="-0.02em" color={theme.titleColor}>
                  Постройте дорожку развития под себя
                </Heading>
                <Text fontSize={{ base: "sm", md: "md" }} color={theme.descColor} lineHeight={1.7} maxW="640px">
                  Мы можем собрать персональный роудмэп по выбранному направлению: что изучать дальше, где закрепить практикой и
                  какие темы закрыть в первую очередь.
                </Text>
              </VStack>
            </HStack>

            <Button
              onClick={handleBuildRoadmapClick}
              borderRadius="full"
              colorScheme="blue"
              px={{ base: 6, md: 7 }}
              minW={{ base: "auto", md: "190px" }}
              alignSelf={{ base: "stretch", md: "center" }}
              aria-label="Построить роудмэп развития"
            >
              Построить роудмэп
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default RoadmapCta;


