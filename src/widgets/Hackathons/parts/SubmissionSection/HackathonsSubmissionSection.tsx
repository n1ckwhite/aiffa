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

const HackathonsSubmissionSection: React.FC = () => {
  const { mutedTextColor, sectionCardBg, cardBorderColor } = useHackathonsColors();

  return (
    <Box
      as="section"
      aria-labelledby="hackathons-submit-title"
    >
      <Stack spacing={{ base: 4, md: 6 }}>
        <Box>
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
            Мы используем простой и понятный формат, чтобы снизить страх перед участием
            и помочь вам сфокусироваться на сути задачи.
          </Text>
        </Box>

        <Box
          bg={sectionCardBg}
          borderRadius="2xl"
          borderWidth="1px"
          borderColor={cardBorderColor}
          p={{ base: 4, md: 5 }}
        >
          <Text
            fontWeight="semibold"
            mb={3}
          >
            Базовый пакет для отправки решения:
          </Text>
          <List spacing={2} fontSize={{ base: "sm", md: "md" }} color={mutedTextColor}>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.400" />
              Требования — кратко описать, что именно вы реализовали и какие критерии
              задачи закрыли.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.400" />
              GitHub — репозиторий с кодом, понятной структурой и доступом для чтения.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.400" />
              README — несколько абзацев о запуске проекта, стеке, архитектуре и
              договорённостях внутри команды.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.400" />
              Демо — ссылка на развернутый прототип или запись демонстрации, если
              деплой невозможен.
            </ListItem>
          </List>

          <Text
            mt={{ base: 4, md: 5 }}
            fontSize={{ base: "sm", md: "md" }}
            color={mutedTextColor}
          >
            После окончания срока приёма решений мы закрепляем итоговый проект в
            командной доске Trello: так у вас остаётся наглядный след участия и
            удобная точка, чтобы вернуться к проекту позже.
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default HackathonsSubmissionSection;


