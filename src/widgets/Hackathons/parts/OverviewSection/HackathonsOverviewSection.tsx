import React from "react";
import {
  Box,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { StarIcon, ChatIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { keyframes } from "@emotion/react";
import { useHackathonsColors } from "../../colors/useHackathonsColors";
import PillBadge from "@/shared/ui/PillBadge";
import PersonLottieIcon from "@/shared/icons/components-icon/PersonLottieIcon";

const overviewCardFloat = keyframes`
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

const HackathonsOverviewSection: React.FC = () => {
  const { sectionCardBg, cardBorderColor, mutedTextColor, accentBorderColor } =
    useHackathonsColors();

  return (
    <Box
      as="section"
      aria-labelledby="hackathons-overview-title"
    >
      <PersonLottieIcon />
      <Stack spacing={{ base: 4, md: 6 }} align="center">
        <Box maxW={{ base: "full", md: "720px" }} textAlign="center">
          <Box mb={3}>
            <PillBadge colorScheme="purple" variant="outline" uppercase>
              Для кого подойдут хакатоны
            </PillBadge>
          </Box>
          <Heading
            id="hackathons-overview-title"
            as="h2"
            fontSize={{ base: "xl", md: "2xl" }}
          >
            Формат для разработчиков, которые хотят расти быстрее
          </Heading>
          <Text
            mt={3}
            fontSize={{ base: "md", md: "lg" }}
            color={mutedTextColor}
          >
            Хакатоны AIFFA подойдут тем, кто уже пишет код и хочет попробовать
            себя в боевых задачах: от джунов и мидлов до тимлидов, которые
            хотят поддерживать форму и прокачивать софтскиллы.
          </Text>
        </Box>

        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          spacing={{ base: 4, md: 6 }}
          mt={{ base: 4, md: 6 }}
        >
          <Box
            bg={sectionCardBg}
            borderRadius="2xl"
            borderWidth="1px"
            borderColor={cardBorderColor}
            p={{ base: 4, md: 5 }}
            animation={`${overviewCardFloat} 18s ease-in-out infinite`}
            transition="transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease"
            _hover={{
              transform: "translateY(-6px)",
              boxShadow: "xl",
              borderColor: accentBorderColor,
            }}
          >
            <HStack align="flex-start" spacing={3} mb={2.5}>
              <Box
                borderRadius="full"
                bg="whiteAlpha.800"
                _dark={{ bg: "whiteAlpha.200" }}
                boxSize={8}
                flexShrink={0}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <StarIcon boxSize={4} color="yellow.400" />
              </Box>
              <Heading as="h3" size="md">
                Для практики и портфолио
              </Heading>
            </HStack>
            <Text fontSize="sm" color={mutedTextColor}>
              Получаете законченный кейс: постановка задачи, прототип,
              рабочее решение и презентация — всё, что можно показать в
              резюме и на собеседовании.
            </Text>
          </Box>

          <Box
            bg={sectionCardBg}
            borderRadius="2xl"
            borderWidth="1px"
            borderColor={cardBorderColor}
            p={{ base: 4, md: 5 }}
            animation={`${overviewCardFloat} 20s ease-in-out infinite`}
            transition="transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease"
            _hover={{
              transform: "translateY(-6px)",
              boxShadow: "xl",
              borderColor: accentBorderColor,
            }}
          >
            <HStack align="flex-start" spacing={3} mb={2.5}>
              <Box
                borderRadius="full"
                bg="whiteAlpha.800"
                _dark={{ bg: "whiteAlpha.200" }}
                boxSize={8}
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
              >
                <Icon as={ChatIcon} boxSize={4} color="blue.400" />
              </Box>
              <Heading as="h3" size="md">
                Для прокачки командной работы
              </Heading>
            </HStack>
            <Text fontSize="sm" color={mutedTextColor}>
              Учитесь договариваться, делить задачи, писать понятный код и
              презентовать результаты — как в рабочих командах.
            </Text>
          </Box>

          <Box
            bg={sectionCardBg}
            borderRadius="2xl"
            borderWidth="1px"
            borderColor={cardBorderColor}
            p={{ base: 4, md: 5 }}
            animation={`${overviewCardFloat} 22s ease-in-out infinite`}
            transition="transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease"
            _hover={{
              transform: "translateY(-6px)",
              boxShadow: "xl",
              borderColor: accentBorderColor,
            }}
          >
            <HStack align="flex-start" spacing={3} mb={2.5}>
              <Box
                borderRadius="full"
                bg="whiteAlpha.800"
                _dark={{ bg: "whiteAlpha.200" }}
                boxSize={8}
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
              >
                <Icon as={ArrowUpIcon} boxSize={4} color="purple.400" />
              </Box>
              <Heading as="h3" size="md">
                Для выхода на новый уровень
              </Heading>
            </HStack>
            <Text fontSize="sm" color={mutedTextColor}>
              Безопасная среда, где можно пробовать новые технологии, роли и
              подходы — без риска для продакшена, но с реальной обратной
              связью.
            </Text>
          </Box>
        </SimpleGrid>
      </Stack>
    </Box>
  );
};

export default HackathonsOverviewSection;


