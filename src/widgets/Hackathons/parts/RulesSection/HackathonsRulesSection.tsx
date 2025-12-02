import React from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { keyframes } from "@emotion/react";
import { useHackathonsColors } from "../../colors/useHackathonsColors";
import { BusinessWorkshopIcon } from "@/shared/icons/components-icon";

const rulesCardFloat = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
  100% {
    transform: translateY(0);
  }
`;

const HackathonsRulesSection: React.FC = () => {
  const { mutedTextColor, sectionCardBg, cardBorderColor, accentBorderColor } =
    useHackathonsColors();
  const deadlinesCircleBg = useColorModeValue("blue.500", "blue.400");
  const formatCircleBg = useColorModeValue("teal.500", "teal.400");
  const codeCircleBg = useColorModeValue("purple.500", "purple.400");
  const limitsCircleBg = useColorModeValue("orange.500", "orange.400");

  return (
    <Box
      as="section"
      aria-labelledby="hackathons-rules-title"
    >
      <BusinessWorkshopIcon />
      <Stack spacing={{ base: 4, md: 6 }} align="center">
        <Box maxW={{ base: "full", md: "720px" }} textAlign="center">
          <Heading
            id="hackathons-rules-title"
            as="h2"
            size="lg"
          >
            Правила участия
          </Heading>
          <Text
            mt={3}
            fontSize={{ base: "md", md: "lg" }}
            color={mutedTextColor}
          >
            Минимальный набор правил, чтобы формат оставался честным и комфортным
            для всех участников.
          </Text>
        </Box>

        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 4, md: 6 }}
          w="full"
        >
          <Box
            bg={sectionCardBg}
            borderRadius="2xl"
            borderWidth="1px"
            borderColor={cardBorderColor}
            p={{ base: 4, md: 5 }}
            animation={`${rulesCardFloat} 20s ease-in-out infinite`}
            transition="transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease"
            _hover={{
              transform: "translateY(-6px)",
              boxShadow: "xl",
              borderColor: accentBorderColor,
            }}
          >
            <Stack spacing={2}>
              <Stack direction="row" align="center" spacing={3}>
                <Box
                  borderRadius="full"
                  bg={deadlinesCircleBg}
                  boxSize={8}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <CheckCircleIcon color="white" boxSize={4} />
                </Box>
                <Text fontWeight="semibold">Сроки</Text>
              </Stack>
              <Text fontSize={{ base: "sm", md: "md" }} color={mutedTextColor}>
                Хакатон идёт в обозначенный период, решения принимаются только до
                указанного дедлайна. Конкретные даты и время всегда прописаны в
                анонсе.
              </Text>
            </Stack>
          </Box>

          <Box
            bg={sectionCardBg}
            borderRadius="2xl"
            borderWidth="1px"
            borderColor={cardBorderColor}
            p={{ base: 4, md: 5 }}
            animation={`${rulesCardFloat} 22s ease-in-out infinite`}
            transition="transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease"
            _hover={{
              transform: "translateY(-6px)",
              boxShadow: "xl",
              borderColor: accentBorderColor,
            }}
          >
            <Stack spacing={2}>
              <Stack direction="row" align="center" spacing={3}>
                <Box
                  borderRadius="full"
                  bg={formatCircleBg}
                  boxSize={8}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <CheckCircleIcon color="white" boxSize={4} />
                </Box>
                <Text fontWeight="semibold">Формат</Text>
              </Stack>
              <Text fontSize={{ base: "sm", md: "md" }} color={mutedTextColor}>
                Полностью онлайн, команды работают на удалёнке. Вы сами выбираете
                инструменты для созвонов и совместной работы, главное — чтобы команда
                могла стабильно коммуницировать.
              </Text>
            </Stack>
          </Box>

          <Box
            bg={sectionCardBg}
            borderRadius="2xl"
            borderWidth="1px"
            borderColor={cardBorderColor}
            p={{ base: 4, md: 5 }}
            animation={`${rulesCardFloat} 24s ease-in-out infinite`}
            transition="transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease"
            _hover={{
              transform: "translateY(-6px)",
              boxShadow: "xl",
              borderColor: accentBorderColor,
            }}
          >
            <Stack spacing={2}>
              <Stack direction="row" align="center" spacing={3}>
                <Box
                  borderRadius="full"
                  bg={codeCircleBg}
                  boxSize={8}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <CheckCircleIcon color="white" boxSize={4} />
                </Box>
                <Text fontWeight="semibold">Требования к коду</Text>
              </Stack>
              <Text fontSize={{ base: "sm", md: "md" }} color={mutedTextColor}>
                Нет жёстких требований к стеку или стилю оформления. Важно, чтобы
                проект запускался, структура была понятной, а в README было описано,
                как всё устроено. Мы не оцениваем «красоту» кода в отрыве от решения
                задачи.
              </Text>
            </Stack>
          </Box>

          <Box
            bg={sectionCardBg}
            borderRadius="2xl"
            borderWidth="1px"
            borderColor={cardBorderColor}
            p={{ base: 4, md: 5 }}
            animation={`${rulesCardFloat} 26s ease-in-out infinite`}
            transition="transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease"
            _hover={{
              transform: "translateY(-6px)",
              boxShadow: "xl",
              borderColor: accentBorderColor,
            }}
          >
            <Stack spacing={2}>
              <Stack direction="row" align="center" spacing={3}>
                <Box
                  borderRadius="full"
                  bg={limitsCircleBg}
                  boxSize={8}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <CheckCircleIcon color="white" boxSize={4} />
                </Box>
                <Text fontWeight="semibold">Лимиты и оценка</Text>
              </Stack>
              <Text fontSize={{ base: "sm", md: "md" }} color={mutedTextColor}>
                Есть ограничения по времени хакатона, дедлайну отправки решений и
                длительности финальной презентации. Мы судим по работе проекта и его
                подаче: насколько решение закрывает задачу, насколько стабильно
                работает демо и насколько понятно вы объяснили подход и роли в команде.
              </Text>
            </Stack>
          </Box>
        </SimpleGrid>
      </Stack>
    </Box>
  );
};

export default HackathonsRulesSection;


