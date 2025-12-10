import React from "react";
import { Box, Heading, HStack, Icon, SimpleGrid, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import PillBadge from "shared/ui/PillBadge";
import {
  FaBookOpen,
  FaCalendarAlt,
  FaHandsHelping,
  FaNewspaper,
  FaRocket,
} from "react-icons/fa";
import { PartnersLottieIcon, BusinessWorkshopIcon } from "@/shared/icons/components-icon";
import { usePartnersColors } from "widgets/Partners/colors/usePartnersColors";

const FormatsSection: React.FC = () => {
  const {
    formatShadow,
    mutedTextColor,
    surfaceCardBg,
    hackathonBorder,
    weeklyBorder,
    materialsBorder,
    articlesBorder,
    grantsBorder,
  } = usePartnersColors();

  return (
    <VStack as="section" aria-labelledby="partners-formats-heading" align="center" spacing={3}>
      <PartnersLottieIcon />
        <Heading as="h2" id="partners-formats-heading" size="md" letterSpacing="-0.02em">
          Форматы партнёрства
        </Heading>
        <Text fontSize="sm" color={mutedTextColor}>
          Мы подбираем формат под задачи компании: от HR и бренда до продвижения
          технологий и инструментов.
        </Text>
      <VStack spacing={4} align="stretch">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 4, md: 5 }}>
          <Box
            borderRadius="2xl"
            borderWidth="1px"
            borderColor={hackathonBorder}
            bg={useColorModeValue("whiteAlpha.900", "rgba(15, 23, 42, 0.98)")}
            p={{ base: 5, md: 6 }}
            boxShadow={formatShadow}
          >
            <VStack align="flex-start" spacing={3}>
              <HStack spacing={3} align="center">
                <Box
                  as="span"
                  boxSize={9}
                  borderRadius="full"
                  bg="rgba(34,197,94,0.12)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="green.400"
                >
                  <Icon as={FaRocket} boxSize={5} aria-hidden="true" />
                </Box>
                <VStack align="flex-start" spacing={1}>
                  <Heading as="h3" size="sm">
                    Спонсорство хакатонов
                  </Heading>
                  <PillBadge colorScheme="green" variant="outline" uppercase={false}>
                    Хакатоны и интенсивы
                  </PillBadge>
                </VStack>
              </HStack>
              <Text fontSize="sm" color={mutedTextColor} lineHeight={1.6}>
                Команды за ограниченное время решают вашу реальную задачу и знакомятся с
                продуктом в боевых условиях.
              </Text>
              <Text fontSize="sm" color={mutedTextColor} lineHeight={1.6}>
                Вы получаете решения, фидбек и внимание сильных разработчиков к вашему стеку.
              </Text>
            </VStack>
          </Box>
          <Box
            borderRadius="2xl"
            borderWidth="1px"
            borderColor={weeklyBorder}
            bg={useColorModeValue("whiteAlpha.900", "rgba(15, 23, 42, 0.98)")}
            p={{ base: 5, md: 6 }}
            boxShadow={formatShadow}
          >
            <VStack align="flex-start" spacing={3}>
              <HStack spacing={3} align="center">
                <Box
                  as="span"
                  boxSize={9}
                  borderRadius="full"
                  bg="rgba(59,130,246,0.12)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="blue.400"
                >
                  <Icon as={FaCalendarAlt} boxSize={5} aria-hidden="true" />
                </Box>
                <VStack align="flex-start" spacing={1}>
                  <Heading as="h3" size="sm">
                    Совместные челленджи и Weekly‑задачи
                  </Heading>
                  <PillBadge colorScheme="blue" variant="outline" uppercase={false}>
                    Weekly и челленджи
                  </PillBadge>
                </VStack>
              </HStack>
              <Text fontSize="sm" color={mutedTextColor} lineHeight={1.6}>
                Регулярные задачи недели с вашим брендингом: продукт появляется в реальных
                решениях участников, а не в баннерах.
              </Text>
              <Text fontSize="sm" color={mutedTextColor} lineHeight={1.6}>
                Формат подходит, когда важно постоянное присутствие и вовлечение, а не один
                большой ивент.
              </Text>
            </VStack>
          </Box>
          <Box
            borderRadius="2xl"
            borderWidth="1px"
            borderColor={materialsBorder}
            bg={useColorModeValue("whiteAlpha.900", "rgba(15, 23, 42, 0.98)")}
            p={{ base: 5, md: 6 }}
            boxShadow={formatShadow}
          >
            <VStack align="flex-start" spacing={3}>
              <HStack spacing={3} align="center">
                <Box
                  as="span"
                  boxSize={9}
                  borderRadius="full"
                  bg="rgba(168,85,247,0.12)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="purple.300"
                >
                  <Icon as={FaBookOpen} boxSize={5} aria-hidden="true" />
                </Box>
                <VStack align="flex-start" spacing={1}>
                  <Heading as="h3" size="sm">
                    Интеграции в материалы
                  </Heading>
                  <PillBadge colorScheme="purple" variant="outline" uppercase={false}>
                    Уроки и гайды
                  </PillBadge>
                </VStack>
              </HStack>
              <Text fontSize="sm" color={mutedTextColor} lineHeight={1.6}>
                Уроки, гайды и практические материалы, где продукт встроен в код и примеры, а
                не стоит отдельным рекламным блоком.
              </Text>
              <Text fontSize="sm" color={mutedTextColor} lineHeight={1.6}>
                Подходит для библиотек, сервисов и dev‑tools, которым важно показать «как это
                работает» на реальном сценарии.
              </Text>
            </VStack>
          </Box>

          {/* Партнёрские статьи и блог */}
          <Box
            borderRadius="2xl"
            borderWidth="1px"
            borderColor={articlesBorder}
            bg={useColorModeValue("whiteAlpha.900", "rgba(15, 23, 42, 0.98)")}
            p={{ base: 5, md: 6 }}
            boxShadow={formatShadow}
          >
            <VStack align="flex-start" spacing={3}>
              <HStack spacing={3} align="center">
                <Box
                  as="span"
                  boxSize={9}
                  borderRadius="full"
                  bg="rgba(249,115,22,0.12)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="orange.300"
                >
                  <Icon as={FaNewspaper} boxSize={5} aria-hidden="true" />
                </Box>
                <VStack align="flex-start" spacing={1}>
                  <Heading as="h3" size="sm">
                    Партнёрские статьи и блог
                  </Heading>
                  <PillBadge colorScheme="yellow" variant="outline" uppercase={false}>
                    Медиа и контент
                  </PillBadge>
                </VStack>
              </HStack>
              <Text fontSize="sm" color={mutedTextColor} lineHeight={1.6}>
                Статья или обзор технологий на AIFFA с вашим брендингом, примерами и живыми
                реакциями от сообщества.
              </Text>
              <Text fontSize="sm" color={mutedTextColor} lineHeight={1.6}>
                Подходит, когда важно объяснить продукт словами, показать экспертизу и собрать
                социальное доказательство.
              </Text>
            </VStack>
          </Box>
          <Box
            borderRadius="2xl"
            borderWidth="1px"
            borderColor={grantsBorder}
            bg={useColorModeValue("whiteAlpha.900", "rgba(15, 23, 42, 0.98)")}
            p={{ base: 5, md: 6 }}
            boxShadow={formatShadow}
          >
            <VStack align="flex-start" spacing={3}>
              <HStack spacing={3} align="center">
                <Box
                  as="span"
                  boxSize={9}
                  borderRadius="full"
                  bg="rgba(236,72,153,0.12)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="pink.300"
                >
                  <Icon as={FaHandsHelping} boxSize={5} aria-hidden="true" />
                </Box>
                <VStack align="flex-start" spacing={1}>
                  <Heading as="h3" size="sm">
                    Поддержка авторов и гранты
                  </Heading>
                  <PillBadge colorScheme="red" variant="outline" uppercase={false}>
                    Гранты и авторы
                  </PillBadge>
                </VStack>
              </HStack>
              <Text fontSize="sm" color={mutedTextColor} lineHeight={1.6}>
                Формат, в котором вы поддерживаете авторов, образовательные серии и задачи,
                помогая развивать экосистему вокруг продукта.
              </Text>
              <Text fontSize="sm" color={mutedTextColor} lineHeight={1.6}>
                Можно финансировать выпуски, выделять гранты и подключать менторов со своей
                стороны.
              </Text>
            </VStack>
          </Box>
        </SimpleGrid>

        {/* Пакеты по уровню вовлечения */}
        <Box
          w="full"
          zIndex={100}
          textAlign="center"
        >
          <BusinessWorkshopIcon />
          <Heading as="h2" size="md" letterSpacing="-0.02em">
            Пакеты по уровню вовлечения
          </Heading>
          <Text fontSize="sm" color={mutedTextColor} mt={3}>
            Примеры форматов: финальный scope и стоимость обсуждаем индивидуально под вашу задачу.
          </Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 3, md: 4 }} mt={3}>
            <Box
              borderRadius="xl"
              borderWidth="1px"
              borderColor={useColorModeValue("blue.200", "blue.500")}
              bg={surfaceCardBg}
              p={{ base: 3, md: 4 }}
              boxShadow={{ base: "sm", md: "md" }}
              h="100%"
            >
              <PillBadge colorScheme="blue" variant="outline" uppercase={false}>
                Lite — задачи недели
              </PillBadge>
              <Text mt={2} fontSize="sm" color={mutedTextColor} lineHeight={1.6}>
                Серия Weekly‑задач с вашим логотипом и продуктом в контексте практики. Хорошо
                подходит для пилота и проверки гипотезы.
              </Text>
            </Box>

            <Box
              borderRadius="xl"
              borderWidth="1px"
              borderColor={useColorModeValue("green.200", "green.500")}
              bg={surfaceCardBg}
              p={{ base: 3, md: 4 }}
              boxShadow={{ base: "sm", md: "md" }}
              h="100%"
            >
              <PillBadge colorScheme="green" variant="outline" uppercase={false}>
                Pro — хакатон
              </PillBadge>
              <Text mt={2} fontSize="sm" color={mutedTextColor} lineHeight={1.6}>
                Онлайн или офлайн‑хакатон под вашу задачу: команды собирают решения,
                а вы получаете прототипы, фидбек и пул кандидатов.
              </Text>
            </Box>

            <Box
              borderRadius="xl"
              borderWidth="1px"
              borderColor={useColorModeValue("purple.200", "purple.500")}
              bg={surfaceCardBg}
              p={{ base: 3, md: 4 }}
              boxShadow={{ base: "sm", md: "md" }}
              h="100%"
            >
              <PillBadge colorScheme="purple" variant="outline" uppercase={false}>
                Full — проект + менторы
              </PillBadge>
              <Text mt={2} fontSize="sm" color={mutedTextColor} lineHeight={1.6}>
                Долгий формат: проект или серия задач с вашими менторами, интеграцией в
                материалы и освещением в комьюнити и соцсетях.
              </Text>
            </Box>
          </SimpleGrid>
          <Text fontSize="sm" color={mutedTextColor} mt={3}>
            Цены формируются индивидуально и зависят от масштаба, формата и задач партнёрства.
          </Text>
        </Box>
      </VStack>
    </VStack>
  );
};

export default FormatsSection;


