import React from "react";
import {
  Box,
  Circle,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useHackathonsColors } from "../../colors/useHackathonsColors";

const HackathonsHowItWorksSection: React.FC = () => {
  const {
    stepLineColor,
    stepNumberBg,
    stepNumberColor,
    stepCardBg,
    mutedTextColor,
  } = useHackathonsColors();

  const steps = [
    {
      number: "1",
      title: "Анонс и открытие регистрации",
      description:
        "Мы публикуем анонс хакатона, описываем тематику, примерные задачи, сроки и базовые требования. В этот момент открывается регистрация для участников и команд.",
    },
    {
      number: "2",
      title: "Формирование команд",
      description:
        "Участники знакомятся в сообществе, собирают команды минимум по два человека, распределяют роли и договариваются о времени. Если вы пришли один, мы помогаем найти команду по интересам и стеку.",
    },
    {
      number: "3",
      title: "Выдача задачи",
      description:
        "Вы получаете бриф с задачей: она может приходить от партнёрской компании или быть подготовлена командой AIFFA. В брифе — цели, ограничения, критерии оценки и технические детали.",
    },
    {
      number: "4",
      title: "Работа над проектом",
      description:
        "Команда проектирует решение, делит задачи, пишет код и регулярно синхронизируется. Менторы помогают с выбором подхода, архитектуры и приоритетов, чтобы вы успели собрать рабочий прототип.",
    },
    {
      number: "5",
      title: "Отправка решения",
      description:
        "К дедлайну вы отправляете решение в простом и понятном формате: GitHub‑репозиторий, README с описанием и ссылка на демо. Это делает процесс прозрачным и привычным для индустрии.",
    },
    {
      number: "6",
      title: "Публичный разбор",
      description:
        "Из всех работ мы отбираем до 10 финальных команд: они показывают презентацию и демо, а эксперты разбирают решения — что получилось хорошо, где можно усилить архитектуру, UX или процесс разработки.",
    },
    {
      number: "7",
      title: "Награждение победителей",
      description:
        "Среди финалистов выбираем 1‑е, 2‑е и 3‑е место. Помимо призов вы получаете публичное признание, кейс в портфолио и отметку об участии в хакатоне.",
    },
  ];

  return (
    <Box
      as="section"
      aria-label="Как проходит хакатон AIFFA"
    >
      <Stack spacing={{ base: 4, md: 6 }} align="center">
        <Box maxW={{ base: "full", md: "720px" }} textAlign="center">
          <Heading as="h2" size="lg">
            Как проходят хакатоны AIFFA
          </Heading>
          <Text
            mt={3}
            fontSize={{ base: "md", md: "lg" }}
            color={mutedTextColor}
          >
            Мы стараемся, чтобы формат был одновременно интенсивным и
            поддерживающим: с понятными ожиданиями, прозрачными критериями и
            вниманием к участникам.
          </Text>
        </Box>

        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 4, md: 6 }}
          mt={{ base: 4, md: 6 }}
        >
          {steps.map((step) => (
            <Stack
              key={step.number}
              direction="row"
              spacing={4}
              align="flex-start"
            >
              <Box
                position="relative"
              >
                <Circle
                  size="32px"
                  bg={stepNumberBg}
                  color={stepNumberColor}
                  fontWeight="semibold"
                  fontSize="sm"
                >
                  {step.number}
                </Circle>
              </Box>

              <Box
                flex="1"
                bg={stepCardBg}
                borderRadius="xl"
                borderWidth="1px"
                borderColor={stepLineColor}
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

        <Box mt={{ base: 4, md: 6 }}>
          <Heading as="h3" size="md" mb={2}>
            Почему это важно
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} color={mutedTextColor}>
            Пошаговый и прозрачный формат снимает страх у новичков и помогает понять,
            чего ожидать от хакатона. Когда ясно, что будет происходить на каждом
            этапе, легче решиться на участие, доверять процессу и получать удовольствие
            от работы в команде.
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default HackathonsHowItWorksSection;


