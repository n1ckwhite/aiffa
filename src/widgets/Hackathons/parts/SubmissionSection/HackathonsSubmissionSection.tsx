import React from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { CheckCircleIcon, EditIcon, ExternalLinkIcon, ViewIcon } from "@chakra-ui/icons";
import { useHackathonsColors } from "../../colors/useHackathonsColors";
import { keyframes } from "@emotion/react";
import PillBadge from "@/shared/ui/PillBadge";

const submissionGlow = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.32);
  }
  60% {
    box-shadow: 0 0 0 20px rgba(59, 130, 246, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
`;

const HackathonsSubmissionSection: React.FC = () => {
  const { mutedTextColor, sectionCardBg, cardBorderColor, accentBorderColor } =
    useHackathonsColors();
  const submissionBgGradient = useColorModeValue(
    "linear(to-br, blue.50, purple.50)",
    "linear(to-br, rgba(15, 23, 42, 1), rgba(30, 64, 175, 0.95))"
  );

  return (
    <Box
      as="section"
      aria-labelledby="hackathons-submit-title"
    >
      <Box
        position="relative"
        overflow="hidden"
        bgGradient={submissionBgGradient}
        borderRadius="3xl"
        borderWidth="1px"
        borderColor={cardBorderColor}
        px={{ base: 4, md: 8 }}
        py={{ base: 5, md: 8 }}
        animation={`${submissionGlow} 14s ease-out infinite`}
      >
        <Box
          position="absolute"
          inset="-40px"
          opacity={0.5}
          filter="blur(40px)"
          pointerEvents="none"
          aria-hidden="true"
        >
          <Box
            position="absolute"
            top="-8%"
            left="-10%"
            w={{ base: "220px", md: "260px" }}
            h={{ base: "220px", md: "260px" }}
            bgGradient="radial(teal.300, transparent)"
          />
          <Box
            position="absolute"
            bottom="-16%"
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
          <Box maxW={{ base: "full", md: "720px" }} textAlign="center">
            <Box mb={3}>
              <PillBadge colorScheme="blue" variant="outline" uppercase>
                Формат решения
              </PillBadge>
            </Box>
            <Heading
              id="hackathons-submit-title"
              as="h2"
              size="lg"
            >
              Как подать решение
            </Heading>
            <Text
              mt={3}
              fontSize={{ base: "md", md: "lg" }}
              color={mutedTextColor}
            >
              Мы используем простой и понятный формат, чтобы снизить страх перед
              участием и помочь вам сфокусироваться на сути задачи.
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
              transition="transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease"
              _hover={{
                transform: "translateY(-4px)",
                boxShadow: "xl",
                borderColor: "blue.400",
              }}
            >
              <Stack spacing={2}>
                <Stack direction="row" align="center" spacing={3}>
                  <Box
                    borderRadius="full"
                    bg="teal.500"
                    _dark={{ bg: "teal.400" }}
                    boxSize={8}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <CheckCircleIcon color="white" boxSize={4} />
                  </Box>
                  <Text fontWeight="semibold">
                    Требования
                  </Text>
                </Stack>
                <Text fontSize={{ base: "sm", md: "md" }} color={mutedTextColor}>
                  Кратко опишите, что именно вы реализовали и какие критерии задачи
                  закрыли. Это помогает жюри быстро понять, на чём вы сфокусировались.
                </Text>
              </Stack>
            </Box>

            <Box
              bg={sectionCardBg}
              borderRadius="2xl"
              borderWidth="1px"
              borderColor={cardBorderColor}
              p={{ base: 4, md: 5 }}
              transition="transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease"
              _hover={{
                transform: "translateY(-4px)",
                boxShadow: "xl",
                borderColor: "blue.400",
              }}
            >
              <Stack spacing={2}>
                <Stack direction="row" align="center" spacing={3}>
                  <Box
                    borderRadius="full"
                    bg="blue.500"
                    _dark={{ bg: "blue.400" }}
                    boxSize={8}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <ExternalLinkIcon color="white" boxSize={4} />
                  </Box>
                  <Text fontWeight="semibold">
                    GitHub
                  </Text>
                </Stack>
                <Text fontSize={{ base: "sm", md: "md" }} color={mutedTextColor}>
                  Репозиторий с кодом и понятной структурой: отдельные директории,
                  аккуратные коммиты и доступ для чтения. Это главный источник правды
                  по вашему решению.
                </Text>
              </Stack>
            </Box>

            <Box
              bg={sectionCardBg}
              borderRadius="2xl"
              borderWidth="1px"
              borderColor={cardBorderColor}
              p={{ base: 4, md: 5 }}
              transition="transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease"
              _hover={{
                transform: "translateY(-4px)",
                boxShadow: "xl",
                borderColor: "blue.400",
              }}
            >
              <Stack spacing={2}>
                <Stack direction="row" align="center" spacing={3}>
                  <Box
                    borderRadius="full"
                    bg="purple.500"
                    _dark={{ bg: "purple.400" }}
                    boxSize={8}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <EditIcon color="white" boxSize={4} />
                  </Box>
                  <Text fontWeight="semibold">
                    README
                  </Text>
                </Stack>
                <Text fontSize={{ base: "sm", md: "md" }} color={mutedTextColor}>
                  Несколько абзацев о запуске проекта, стеке, архитектуре и том, как вы
                  распределили роли в команде. Хороший README — это мини-презентация
                  вашего решения.
                </Text>
              </Stack>
            </Box>

            <Box
              bg={sectionCardBg}
              borderRadius="2xl"
              borderWidth="1px"
              borderColor={cardBorderColor}
              p={{ base: 4, md: 5 }}
              transition="transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease"
              _hover={{
                transform: "translateY(-4px)",
                boxShadow: "xl",
                borderColor: "blue.400",
              }}
            >
              <Stack spacing={2}>
                <Stack direction="row" align="center" spacing={3}>
                  <Box
                    borderRadius="full"
                    bg="green.500"
                    _dark={{ bg: "green.400" }}
                    boxSize={8}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <ViewIcon color="white" boxSize={4} />
                  </Box>
                  <Text fontWeight="semibold">
                    Демо
                  </Text>
                </Stack>
                <Text fontSize={{ base: "sm", md: "md" }} color={mutedTextColor}>
                  Ссылка на развернутый прототип или запись демонстрации, если деплой
                  невозможен. Так жюри и партнёрам проще увидеть решение в действии.
                </Text>
              </Stack>
            </Box>
          </SimpleGrid>

          <Box
            bg={sectionCardBg}
            borderRadius="2xl"
            borderWidth="1px"
            borderColor={accentBorderColor}
            p={{ base: 4, md: 5 }}
            w="full"
            boxShadow="0 0 0 1px rgba(59,130,246,0.35)"
          >
            <Stack spacing={2}>
              <Text
                fontSize="xs"
                fontWeight="semibold"
                textTransform="uppercase"
                letterSpacing="0.12em"
                color={useColorModeValue("blue.600", "blue.200")}
              >
                Важно для участников
              </Text>
              <Text
                fontSize={{ base: "sm", md: "md" }}
                color={mutedTextColor}
              >
                После окончания срока приёма решений мы закрепляем итоговый проект в
                командной доске Trello: так у вас остаётся наглядный след участия и
                удобная точка, чтобы вернуться к проекту позже.
              </Text>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default HackathonsSubmissionSection;


