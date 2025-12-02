import React from "react";
import {
  Badge,
  Box,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useHackathonsColors } from "../../colors/useHackathonsColors";

const HackathonsOverviewSection: React.FC = () => {
  const { sectionCardBg, cardBorderColor, mutedTextColor, accentBorderColor } =
    useHackathonsColors();

  return (
    <Box
      as="section"
      aria-labelledby="hackathons-overview-title"
    >
      <Stack spacing={{ base: 4, md: 6 }}>
        <Box>
          <Badge
            colorScheme="purple"
            variant="subtle"
            borderRadius="full"
            px={3}
            py={1}
            mb={3}
          >
            Для кого подойдут хакатоны
          </Badge>
          <Heading
            id="hackathons-overview-title"
            as="h2"
            size="lg"
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
            borderColor={accentBorderColor}
            p={{ base: 4, md: 5 }}
          >
            <Heading as="h3" size="md" mb={2}>
              Для практики и портфолио
            </Heading>
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
          >
            <Heading as="h3" size="md" mb={2}>
              Для прокачки командной работы
            </Heading>
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
          >
            <Heading as="h3" size="md" mb={2}>
              Для выхода на новый уровень
            </Heading>
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


