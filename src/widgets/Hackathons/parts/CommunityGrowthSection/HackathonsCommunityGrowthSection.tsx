import React from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { useHackathonsColors } from "../../colors/useHackathonsColors";
import PillBadge from "@/shared/ui/PillBadge";

const communityGlow = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.45);
  }
  60% {
    box-shadow: 0 0 0 18px rgba(59, 130, 246, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
`;

const communityCardFloat = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
  100% {
    transform: translateY(0);
  }
`;

const communityMetricPulse = keyframes`
  0% {
    transform: translateY(0) scale(1);
    text-shadow: 0 0 0 rgba(56, 189, 248, 0.0);
  }
  50% {
    transform: translateY(-1px) scale(1.04);
    text-shadow: 0 0 18px rgba(56, 189, 248, 0.6);
  }
  100% {
    transform: translateY(0) scale(1);
    text-shadow: 0 0 0 rgba(56, 189, 248, 0.0);
  }
`;

const HackathonsCommunityGrowthSection: React.FC = () => {
  const { sectionCardBg, cardBorderColor, mutedTextColor } = useHackathonsColors();
  const communityBgGradient = useColorModeValue(
    "linear(to-br, blue.50, purple.50)",
    "linear(to-br, rgba(15, 23, 42, 1), rgba(30, 64, 175, 0.95))"
  );

  return (
    <Box
      as="section"
      aria-labelledby="hackathons-community-growth-title"
    >
      <Box
        position="relative"
        overflow="hidden"
        bgGradient={communityBgGradient}
        borderRadius="3xl"
        borderWidth="1px"
        borderColor={cardBorderColor}
        px={{ base: 4, md: 8 }}
        py={{ base: 5, md: 8 }}
        animation={`${communityGlow} 7s ease-out infinite`}
      >
        <Box
          position="absolute"
          inset="-40px"
          opacity={0.55}
          filter="blur(42px)"
          pointerEvents="none"
          zIndex={0}
        >
          <Box
            position="absolute"
            top="-10%"
            left="-6%"
            w={{ base: "220px", md: "260px" }}
            h={{ base: "220px", md: "260px" }}
            bgGradient="radial(teal.300, transparent)"
          />
          <Box
            position="absolute"
            bottom="-14%"
            right="-8%"
            w={{ base: "260px", md: "320px" }}
            h={{ base: "260px", md: "320px" }}
            bgGradient="radial(blue.500, transparent)"
          />
        </Box>

        <Stack
          spacing={{ base: 4, md: 6 }}
          align="center"
          position="relative"
          zIndex={1}
        >
          <Box textAlign="center" maxW={{ base: "full", md: "640px" }}>
            <Box mb={3}>
              <PillBadge colorScheme="blue" variant="outline" uppercase>
                Рост коммьюнити
              </PillBadge>
            </Box>
            <Heading
              id="hackathons-community-growth-title"
              as="h2"
              fontSize={{ base: "xl", md: "2xl" }}
            >
              Рост коммьюнити AIFFA
            </Heading>
            <Text
              mt={3}
              fontSize={{ base: "md", md: "lg" }}
              color={mutedTextColor}
            >
              Живое сообщество и регулярная активность создают среду, в
              которой хочется расти и возвращаться к задачам и хакатонам.
            </Text>
          </Box>

          <SimpleGrid
            columns={{ base: 1, sm: 3 }}
            spacing={{ base: 4, md: 6 }}
            mt={{ base: 2, md: 4 }}
            w="full"
          >
            <Box
              bg={sectionCardBg}
              borderRadius="2xl"
              borderWidth="1px"
              borderColor={cardBorderColor}
              p={{ base: 4, md: 5 }}
              textAlign="center"
              animation={`${communityCardFloat} 18s ease-in-out infinite`}
            >
              <Text
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight="bold"
                bgGradient="linear(to-r, teal.300, blue.400)"
                _dark={{ bgGradient: "linear(to-r, teal.200, blue.300)" }}
                bgClip="text"
                animation={`${communityMetricPulse} 7s ease-in-out infinite`}
              >
                120+
              </Text>
              <Text
                mt={1}
                fontSize={{ base: "sm", md: "md" }}
                color={mutedTextColor}
              >
                активных участников платформы
              </Text>
            </Box>

            <Box
              bg={sectionCardBg}
              borderRadius="2xl"
              borderWidth="1px"
              borderColor={cardBorderColor}
              p={{ base: 4, md: 5 }}
              textAlign="center"
              animation={`${communityCardFloat} 20s ease-in-out infinite`}
            >
              <Text
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight="bold"
                bgGradient="linear(to-r, teal.300, blue.400)"
                _dark={{ bgGradient: "linear(to-r, teal.200, blue.300)" }}
                bgClip="text"
                animation={`${communityMetricPulse} 7s ease-in-out infinite`}
              >
                40+
              </Text>
              <Text
                mt={1}
                fontSize={{ base: "sm", md: "md" }}
                color={mutedTextColor}
              >
                решений задач недели
              </Text>
            </Box>

            <Box
              bg={sectionCardBg}
              borderRadius="2xl"
              borderWidth="1px"
              borderColor={cardBorderColor}
              p={{ base: 4, md: 5 }}
              textAlign="center"
              animation={`${communityCardFloat} 22s ease-in-out infinite`}
            >
              <Text
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight="bold"
                bgGradient="linear(to-r, teal.300, blue.400)"
                _dark={{ bgGradient: "linear(to-r, teal.200, blue.300)" }}
                bgClip="text"
                animation={`${communityMetricPulse} 7s ease-in-out infinite`}
              >
                50+
              </Text>
              <Text
                mt={1}
                fontSize={{ base: "sm", md: "md" }}
                color={mutedTextColor}
              >
                оплаченных поддержек проекта
              </Text>
            </Box>
          </SimpleGrid>
        </Stack>
      </Box>
    </Box>
  );
};

export default HackathonsCommunityGrowthSection;


