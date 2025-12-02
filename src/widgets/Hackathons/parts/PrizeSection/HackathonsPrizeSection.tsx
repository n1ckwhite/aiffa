import React from "react";
import { Box, Heading, SimpleGrid, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { keyframes } from "@emotion/react";
import { useHackathonsColors } from "../../colors/useHackathonsColors";
import { FinanceLottieIcon } from "@/shared/icons/components-icon";
import PillBadge from "@/shared/ui/PillBadge";

const prizeGlow = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(236, 72, 153, 0.45);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(236, 72, 153, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(236, 72, 153, 0);
  }
`;

const prizeBlobA = keyframes`
  0% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(18px, -14px, 0) scale(1.06);
  }
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
`;

const prizeBlobB = keyframes`
  0% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(-16px, 18px, 0) scale(1.08);
  }
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
`;

const prizeShimmer = keyframes`
  0% {
    transform: translateX(-40%);
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    transform: translateX(150%);
    opacity: 0;
  }
`;

const HackathonsPrizeSection: React.FC = () => {
  const { sectionCardBg, cardBorderColor, mutedTextColor } = useHackathonsColors();
  const prizeBgGradient = useColorModeValue(
    "linear(to-br, purple.50, pink.50)",
    "linear(to-br, rgba(15, 23, 42, 1), rgba(76, 29, 149, 0.9))"
  );

  return (
    <Box
      as="section"
      aria-labelledby="hackathons-prize-title"
    >
      <Box
        position="relative"
        overflow="hidden"
        bgGradient={prizeBgGradient}
        borderRadius="3xl"
        borderWidth="1px"
        borderColor={cardBorderColor}
        px={{ base: 5, md: 8 }}
        pt={{ base: 6, md: 8 }}
        pb={{ base: 6, md: 8 }}
        animation={`${prizeGlow} 5s ease-out infinite`}
      >
        <Box
          position="absolute"
          inset="-40px"
          opacity={0.6}
          filter="blur(44px)"
          pointerEvents="none"
          zIndex={0}
        >
          <Box
            position="absolute"
            top={{ base: "55%", md: "25%" }}
            left="-8%"
            w={{ base: "220px", md: "260px" }}
            h={{ base: "220px", md: "260px" }}
            bgGradient="radial(pink.400, transparent)"
            animation={`${prizeBlobA} 20s ease-in-out infinite`}
          />
          <Box
            position="absolute"
            bottom="-12%"
            right="-6%"
            w={{ base: "260px", md: "320px" }}
            h={{ base: "260px", md: "320px" }}
            bgGradient="radial(purple.500, transparent)"
            animation={`${prizeBlobB} 24s ease-in-out infinite`}
          />
        </Box>

        <Box
          position="absolute"
          top="0"
          left="-40%"
          h="3px"
          w="40%"
          bgGradient="linear(to-r, transparent, whiteAlpha.900, transparent)"
          opacity={0.9}
          animation={`${prizeShimmer} 7s ease-in-out infinite`}
          zIndex={1}
        />

        <Stack
          spacing={0}
          align="center"
          position="relative"
          zIndex={2}
        >
          <Box textAlign="center">
            <PillBadge colorScheme="purple" variant="solid">
              Призовой фонд
            </PillBadge>
            <Heading
              id="hackathons-prize-title"
              as="h2"
              size="lg"
            >
              100&nbsp;000&nbsp;₽ — призы для трёх сильнейших команд
            </Heading>
            <Text
              mt={3}
              fontSize={{ base: "md", md: "lg" }}
              color={mutedTextColor}
            >
              Мы хотим, чтобы участие было не только про опыт и портфолио, но и
              про заметную награду для команд, которые выложились по максимуму.
              Помимо денежного приза, победители и призёры получают мерч AIFFA —
              чтобы хакатон остался с вами не только в резюме, но и в вещах.
            </Text>
          </Box>

          <FinanceLottieIcon />

          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            spacing={{ base: 4, md: 6 }}
          >
          <Box
            bg={sectionCardBg}
            borderRadius="2xl"
            borderWidth="1px"
            borderColor={cardBorderColor}
            p={{ base: 4, md: 5 }}
            textAlign="center"
          >
            <Stack direction="row" align="center" justify="center" spacing={2} mb={2}>
              <StarIcon color="yellow.400" />
              <Text
                as="span"
                fontSize="sm"
                fontWeight="semibold"
                textTransform="uppercase"
                letterSpacing="0.08em"
              >
                1 место
              </Text>
            </Stack>
            <Text
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="bold"
            >
              50&nbsp;000&nbsp;₽
            </Text>
            <Text
              mt={2}
              fontSize="sm"
              color={mutedTextColor}
            >
              Для команды, которая лучше всех раскрыла задачу и собрала
              сильное демо.
            </Text>
          </Box>

          <Box
            bg={sectionCardBg}
            borderRadius="2xl"
            borderWidth="1px"
            borderColor={cardBorderColor}
            p={{ base: 4, md: 5 }}
            textAlign="center"
          >
            <Stack direction="row" align="center" justify="center" spacing={2} mb={2}>
              <StarIcon color="purple.300" />
              <Text
                as="span"
                fontSize="sm"
                fontWeight="semibold"
                textTransform="uppercase"
                letterSpacing="0.08em"
              >
                2 место
              </Text>
            </Stack>
            <Text
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="bold"
            >
              30&nbsp;000&nbsp;₽
            </Text>
            <Text
              mt={2}
              fontSize="sm"
              color={mutedTextColor}
            >
              Для команды с сильным решением и качественной подачей проекта.
            </Text>
          </Box>

          <Box
            bg={sectionCardBg}
            borderRadius="2xl"
            borderWidth="1px"
            borderColor={cardBorderColor}
            p={{ base: 4, md: 5 }}
            textAlign="center"
          >
            <Stack direction="row" align="center" justify="center" spacing={2} mb={2}>
              <StarIcon color="blue.300" />
              <Text
                as="span"
                fontSize="sm"
                fontWeight="semibold"
                textTransform="uppercase"
                letterSpacing="0.08em"
              >
                3 место
              </Text>
            </Stack>
            <Text
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="bold"
            >
              20&nbsp;000&nbsp;₽
            </Text>
            <Text
              mt={2}
              fontSize="sm"
              color={mutedTextColor}
            >
              Для команды, которая показала классный прогресс и интересный
              подход к задаче.
            </Text>
          </Box>
        </SimpleGrid>
        </Stack>
      </Box>
    </Box>
  );
};

export default HackathonsPrizeSection;


