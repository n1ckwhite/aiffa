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
        <Heading as="h2" id="partners-formats-heading" size={{base: "md", md: "lg"}} letterSpacing="-0.02em">
          Форматы партнёрства
        </Heading>
        <Text fontSize={{base: "md", md: "lg"}} color={mutedTextColor} align="center">
          Мы подбираем формат под задачи компании: от HR и бренда до продвижения
          технологий и инструментов.
        </Text>
      <VStack spacing={4} align="stretch" w="full" minW={0}>
        <SimpleGrid minChildWidth={{ base: "100%", sm: "260px", md: "350px" }} spacing={{ base: 4, md: 5 }} w="full" minW={0} maxW="100%">
          <Box
            borderRadius="2xl"
            borderWidth="1px"
            borderColor={hackathonBorder}
            bg={useColorModeValue("whiteAlpha.900", "rgba(15, 23, 42, 0.98)")}
            p={{ base: 5, md: 6 }}
            boxShadow={formatShadow}
            w="full"
            minW={{ base: "100%", sm: "260px", md: "350px" }}
            maxW="100%"
            boxSizing="border-box"
            flexShrink={0}
          >
            <VStack align="flex-start" spacing={3} w="full" minW={0}>
              <HStack spacing={3} align="center" w="full" minW={0}>
                <Box
                  as="span"
                  boxSize={9}
                  borderRadius="full"
                  bg="rgba(34,197,94,0.12)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="green.400"
                  flexShrink={0}
                >
                  <Icon as={FaRocket} boxSize={5} aria-hidden="true" />
                </Box>
                <VStack align="flex-start" spacing={1} minW={0} flex={1}>
                  <Heading as="h3" size="sm" wordBreak="break-word" overflowWrap="anywhere" whiteSpace="normal">
                    Спонсорство хакатонов
                  </Heading>
                  <PillBadge colorScheme="green" variant="outline" uppercase={false}>
                    Хакатоны и интенсивы
                  </PillBadge>
                </VStack>
              </HStack>
              <Text fontSize="sm" color={mutedTextColor} lineHeight={1.6} wordBreak="break-word" overflowWrap="anywhere" whiteSpace="normal">
                Команды за ограниченное время решают вашу реальную задачу и знакомятся с
                продуктом в боевых условиях.
              </Text>
              <Text fontSize="sm" color={mutedTextColor} lineHeight={1.6} wordBreak="break-word" overflowWrap="anywhere" whiteSpace="normal">
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
            w="full"
            minW={{ base: "100%", sm: "260px", md: "350px" }}
            maxW="100%"
            boxSizing="border-box"
            flexShrink={0}
          >
            <VStack align="flex-start" spacing={3} w="full" minW={0}>
              <HStack spacing={3} align="center" w="full" minW={0}>
                <Box
                  as="span"
                  boxSize={9}
                  borderRadius="full"
                  bg="rgba(59,130,246,0.12)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="blue.400"
                  flexShrink={0}
                >
                  <Icon as={FaCalendarAlt} boxSize={5} aria-hidden="true" />
                </Box>
                <VStack align="flex-start" spacing={1} minW={0} flex={1}>
                  <Heading as="h3" size="sm" wordBreak="break-word" overflowWrap="anywhere" whiteSpace="normal">
                    Совместные челленджи и Weekly‑задачи
                  </Heading>
                  <PillBadge colorScheme="blue" variant="outline" uppercase={false}>
                    Weekly и челленджи
                  </PillBadge>
                </VStack>
              </HStack>
              <Text fontSize="sm" color={mutedTextColor} lineHeight={1.6} wordBreak="break-word" overflowWrap="anywhere" whiteSpace="normal">
                Регулярные задачи недели с вашим брендингом: продукт появляется в реальных
                решениях участников, а не в баннерах.
              </Text>
              <Text fontSize="sm" color={mutedTextColor} lineHeight={1.6} wordBreak="break-word" overflowWrap="anywhere" whiteSpace="normal">
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
            w="full"
            minW={{ base: "100%", sm: "260px", md: "350px" }}
            maxW="100%"
            boxSizing="border-box"
            flexShrink={0}
          >
            <VStack align="flex-start" spacing={3} w="full" minW={0}>
              <HStack spacing={3} align="center" w="full" minW={0}>
                <Box
                  as="span"
                  boxSize={9}
                  borderRadius="full"
                  bg="rgba(168,85,247,0.12)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="purple.300"
                  flexShrink={0}
                >
                  <Icon as={FaBookOpen} boxSize={5} aria-hidden="true" />
                </Box>
                <VStack align="flex-start" spacing={1} minW={0} flex={1}>
                  <Heading as="h3" size="sm" wordBreak="break-word" overflowWrap="anywhere" whiteSpace="normal">
                    Интеграции в материалы
                  </Heading>
                  <PillBadge colorScheme="purple" variant="outline" uppercase={false}>
                    Уроки и гайды
                  </PillBadge>
                </VStack>
              </HStack>
              <Text fontSize="sm" color={mutedTextColor} lineHeight={1.6} wordBreak="break-word" overflowWrap="anywhere" whiteSpace="normal">
                Уроки, гайды и практические материалы, где продукт встроен в код и примеры, а
                не стоит отдельным рекламным блоком.
              </Text>
              <Text fontSize="sm" color={mutedTextColor} lineHeight={1.6} wordBreak="break-word" overflowWrap="anywhere" whiteSpace="normal">
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
            w="full"
            minW={{ base: "100%", sm: "260px", md: "350px" }}
            maxW="100%"
            boxSizing="border-box"
            flexShrink={0}
          >
            <VStack align="flex-start" spacing={3} w="full" minW={0}>
              <HStack spacing={3} align="center" w="full" minW={0}>
                <Box
                  as="span"
                  boxSize={9}
                  borderRadius="full"
                  bg="rgba(249,115,22,0.12)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="orange.300"
                  flexShrink={0}
                >
                  <Icon as={FaNewspaper} boxSize={5} aria-hidden="true" />
                </Box>
                <VStack align="flex-start" spacing={1} minW={0} flex={1}>
                  <Heading as="h3" size="sm" wordBreak="break-word" overflowWrap="anywhere" whiteSpace="normal">
                    Партнёрские статьи и блог
                  </Heading>
                  <PillBadge colorScheme="yellow" variant="outline" uppercase={false}>
                    Медиа и контент
                  </PillBadge>
                </VStack>
              </HStack>
              <Text fontSize="sm" color={mutedTextColor} lineHeight={1.6} wordBreak="break-word" overflowWrap="anywhere" whiteSpace="normal">
                Статья или обзор технологий на AIFFA с вашим брендингом, примерами и живыми
                реакциями от сообщества.
              </Text>
              <Text fontSize="sm" color={mutedTextColor} lineHeight={1.6} wordBreak="break-word" overflowWrap="anywhere" whiteSpace="normal">
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
            w="full"
            minW={{ base: "100%", sm: "260px", md: "350px" }}
            maxW="100%"
            boxSizing="border-box"
            flexShrink={0}
          >
            <VStack align="flex-start" spacing={3} w="full" minW={0}>
              <HStack spacing={3} align="center" w="full" minW={0}>
                <Box
                  as="span"
                  boxSize={9}
                  borderRadius="full"
                  bg="rgba(236,72,153,0.12)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="pink.300"
                  flexShrink={0}
                >
                  <Icon as={FaHandsHelping} boxSize={5} aria-hidden="true" />
                </Box>
                <VStack align="flex-start" spacing={1} minW={0} flex={1}>
                  <Heading as="h3" size="sm" wordBreak="break-word" overflowWrap="anywhere" whiteSpace="normal">
                    Поддержка авторов и гранты
                  </Heading>
                  <PillBadge colorScheme="red" variant="outline" uppercase={false}>
                    Гранты и авторы
                  </PillBadge>
                </VStack>
              </HStack>
              <Text fontSize="sm" color={mutedTextColor} lineHeight={1.6} wordBreak="break-word" overflowWrap="anywhere" whiteSpace="normal">
                Формат, в котором вы поддерживаете авторов, образовательные серии и задачи,
                помогая развивать экосистему вокруг продукта.
              </Text>
              <Text fontSize="sm" color={mutedTextColor} lineHeight={1.6} wordBreak="break-word" overflowWrap="anywhere" whiteSpace="normal">
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
          <Heading as="h2" size={{base: "md", md: "lg"}} letterSpacing="-0.02em">
            Пакеты по уровню вовлечения
          </Heading>
          <Text fontSize={{base: "md", md: "lg"}} color={mutedTextColor} mt={3}>
            Примеры форматов: финальный scope и стоимость обсуждаем индивидуально под вашу задачу.
          </Text>
          <SimpleGrid minChildWidth={{ base: "100%", sm: "280px", md: "320px" }} spacing={{ base: 3, md: 4 }} mt={3} w="full" minW={0} maxW="100%" alignItems="stretch">
            <Box
              borderRadius="xl"
              borderWidth="1px"
              borderColor={useColorModeValue("blue.200", "blue.500")}
              bg={surfaceCardBg}
              p={{ base: 3, md: 4 }}
              boxShadow={{ base: "sm", md: "md" }}
              h="100%"
              w="full"
              minW={{ base: "100%", sm: "280px", md: "320px" }}
              maxW="100%"
              boxSizing="border-box"
              flexShrink={0}
            >
              <PillBadge colorScheme="blue" variant="outline" uppercase={false}>
                Lite — задачи недели
              </PillBadge>
              <Text mt={2} fontSize="sm" color={mutedTextColor} lineHeight={1.6} wordBreak="break-word" overflowWrap="anywhere" whiteSpace="normal">
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
              w="full"
              minW={{ base: "100%", sm: "280px", md: "320px" }}
              maxW="100%"
              boxSizing="border-box"
              flexShrink={0}
            >
              <PillBadge colorScheme="green" variant="outline" uppercase={false}>
                Pro — хакатон
              </PillBadge>
              <Text mt={2} fontSize="sm" color={mutedTextColor} lineHeight={1.6} wordBreak="break-word" overflowWrap="anywhere" whiteSpace="normal">
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
              w="full"
              minW={{ base: "100%", sm: "280px", md: "320px" }}
              maxW="100%"
              boxSizing="border-box"
              flexShrink={0}
            >
              <PillBadge colorScheme="purple" variant="outline" uppercase={false}>
                Full — проект + менторы
              </PillBadge>
              <Text mt={2} fontSize="sm" color={mutedTextColor} lineHeight={1.6} wordBreak="break-word" overflowWrap="anywhere" whiteSpace="normal">
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


