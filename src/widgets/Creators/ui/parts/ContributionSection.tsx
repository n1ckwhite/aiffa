import React from "react";
import { Box, Heading, Text, VStack, Stack, Link as ChakraLink, useColorModeValue } from "@chakra-ui/react";
import SupportBlock from "widgets/SupportBlock";

const ContributionSection: React.FC = () => {
  const primaryTextColor = useColorModeValue("gray.700", "gray.100");
  const secondaryTextColor = useColorModeValue("gray.600", "gray.200");
  const linkColor = useColorModeValue("blue.500", "blue.200");

  return (
    <VStack align="stretch" spacing={5}>
      <Box as="section" id="creators-contribution" aria-label="Как стать создателем AIFFA">
        <Heading as="h2" size="md" mb={3} letterSpacing="-0.02em">
          Как стать создателем
        </Heading>
        <VStack align="flex-start" spacing={3}>
          <Text fontSize="sm" color={primaryTextColor} lineHeight={1.8}>
            Есть идея задачи недели, проекта или улучшения существующего модуля? Вы можете:
          </Text>
          <Stack as="ul" spacing={1.5} pl={4}>
            <Text as="li" fontSize="sm" color={primaryTextColor}>
              предложить новую задачу или правку через{" "}
              <ChakraLink href="https://t.me/aiffa_hub" isExternal color={linkColor}>
                Telegram‑сообщество
              </ChakraLink>
              ;
            </Text>
            <Text as="li" fontSize="sm" color={primaryTextColor}>
              оставить идею или PR в JS HUB;
            </Text>
            <Text as="li" fontSize="sm" color={primaryTextColor}>
              помочь с ревью решений других участников.
            </Text>
          </Stack>
          <Text fontSize="sm" color={secondaryTextColor} lineHeight={1.8}>
            Регулярный вклад в задачи, материалы и ревью — путь к тому, чтобы ваше имя появилось среди создателей
            платформы.
          </Text>
        </VStack>
      </Box>

      <Box as="section" aria-label="Поддержка и сообщество AIFFA">
        <SupportBlock variant="modules" />
      </Box>
    </VStack>
  );
};

export default ContributionSection;


