import React from "react";
import {
  Box,
  Heading,
  List,
  ListItem,
  ListIcon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useHackathonsColors } from "../../colors/useHackathonsColors";

const HackathonsRulesSection: React.FC = () => {
  const { mutedTextColor, sectionCardBg, cardBorderColor } = useHackathonsColors();

  return (
    <Box
      as="section"
      aria-labelledby="hackathons-rules-title"
    >
      <Stack spacing={{ base: 4, md: 6 }}>
        <Box>
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

        <Box
          bg={sectionCardBg}
          borderRadius="2xl"
          borderWidth="1px"
          borderColor={cardBorderColor}
          p={{ base: 4, md: 5 }}
        >
          <List spacing={3} fontSize={{ base: "sm", md: "md" }} color={mutedTextColor}>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="blue.400" />
              <Text as="span" fontWeight="semibold">
                Сроки:
              </Text>{" "}
              хакатон идёт в обозначенный период, решения принимаются только до
              указанного дедлайна. Конкретные даты и время всегда прописаны в анонсе.
            </ListItem>

            <ListItem>
              <ListIcon as={CheckCircleIcon} color="blue.400" />
              <Text as="span" fontWeight="semibold">
                Формат:
              </Text>{" "}
              полностью онлайн, команды работают на удалёнке. Вы сами выбираете
              инструменты для созвонов и совместной работы, главное — чтобы команда
              могла стабильно коммуницировать.
            </ListItem>

            <ListItem>
              <ListIcon as={CheckCircleIcon} color="blue.400" />
              <Text as="span" fontWeight="semibold">
                Требования к коду:
              </Text>{" "}
              нет жёстких требований к стеку или стилю оформления. Важно, чтобы
              проект запускался, структура была понятной, а в README было описано,
              как всё устроено. Мы не оцениваем «красоту» кода в отрыве от решения
              задачи.
            </ListItem>

            <ListItem>
              <ListIcon as={CheckCircleIcon} color="blue.400" />
              <Text as="span" fontWeight="semibold">
                Лимиты:
              </Text>{" "}
              есть ограничения по времени хакатона, дедлайну отправки решений и
              длительности финальной презентации. Все лимиты заранее указаны в
              регламенте конкретного хакатона.
            </ListItem>

            <ListItem>
              <ListIcon as={CheckCircleIcon} color="blue.400" />
              <Text as="span" fontWeight="semibold">
                Оценка:
              </Text>{" "}
              мы судим по работе проекта и его подаче: насколько решение закрывает
              задачу, насколько стабильно работает демо и насколько понятно вы
              объяснили подход, архитектуру и распределение ролей в команде.
            </ListItem>
          </List>
        </Box>
      </Stack>
    </Box>
  );
};

export default HackathonsRulesSection;


