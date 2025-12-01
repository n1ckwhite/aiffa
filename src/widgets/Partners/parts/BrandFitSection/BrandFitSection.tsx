import React from "react";
import { Box, Heading, HStack, Icon, SimpleGrid, Stack, Text, VStack } from "@chakra-ui/react";
import PillBadge from "shared/ui/PillBadge";
import { FaCode, FaGraduationCap, FaHeart, FaInfinity, FaPuzzlePiece, FaRocket, FaStar, FaUsers } from "react-icons/fa";
import { usePartnersColors } from "widgets/Partners/colors/usePartnersColors";

const BrandFitSection: React.FC = () => {
  const {
    surfaceCardBg,
    overviewAsideBg,
    formatShadow,
    mutedTextColor,
  } = usePartnersColors();

  return (
    <Box
      position="relative"
      overflow="hidden"
      transition="none"
      borderRadius={{ base: "2xl", md: "0" }}
      bg={{ base: surfaceCardBg, md: "transparent" }}
      boxShadow={{ base: formatShadow, md: "none" }}
      p={{ base: 5, md: 0 }}
    >
      <Stack
        direction={{ base: "column", md: "row" }}
        align={{ base: "stretch", md: "flex-start" }}
        spacing={{ base: 4, md: 8 }}
      >
        <VStack
          align="flex-start"
          spacing={3}
          flex={3}
          w="full"
          textAlign="left"
        >
          <Box w="full" textAlign={{ base: "center", md: "left" }}>
            <PillBadge colorScheme="blue" variant="outline" uppercase={false}>
              Задачи бренда
            </PillBadge>
            <Heading
              as="h2"
              size="md"
              letterSpacing="-0.02em"
              mt={2}
            >
              Кому и зачем подходит спонсорство?
            </Heading>
          </Box>
          <Text fontSize="sm" color={mutedTextColor}>
            Спонсорство AIFFA подходит компаниям, которые хотят:
          </Text>
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacingX={{ base: 0, md: 8 }}
            spacingY={3}
            as="ul"
            fontSize="sm"
            color={mutedTextColor}
            listStyleType="none"
            pl={0}
          >
            <HStack as="li" align="flex-start" spacing={3}>
              <Box
                as="span"
                mt={0.5}
                boxSize={6}
                borderRadius="full"
                bg="cyan.500"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
                color="white"
              >
                <Icon as={FaUsers} boxSize={3.5} aria-hidden="true" />
              </Box>
              <Text>
                привлекать разработчиков и работать с IT-аудиторией;
              </Text>
            </HStack>
            <HStack as="li" align="flex-start" spacing={3}>
              <Box
                as="span"
                mt={0.5}
                boxSize={6}
                borderRadius="full"
                bg="purple.500"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
                color="white"
              >
                <Icon as={FaCode} boxSize={3.5} aria-hidden="true" />
              </Box>
              <Text>
                продвигать свои инструменты, технологии и platform-инфраструктуру;
              </Text>
            </HStack>
            <HStack as="li" align="flex-start" spacing={3}>
              <Box
                as="span"
                mt={0.5}
                boxSize={6}
                borderRadius="full"
                bg="teal.500"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
                color="white"
              >
                <Icon as={FaGraduationCap} boxSize={3.5} aria-hidden="true" />
              </Box>
              <Text>
                находить талантливых разработчиков через реальные задачи;
              </Text>
            </HStack>
            <HStack as="li" align="flex-start" spacing={3}>
              <Box
                as="span"
                mt={0.5}
                boxSize={6}
                borderRadius="full"
                bg="pink.500"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
                color="white"
              >
                <Icon as={FaStar} boxSize={3.5} aria-hidden="true" />
              </Box>
              <Text>
                повышать узнаваемость бренда в профессиональной среде;
              </Text>
            </HStack>
            <HStack as="li" align="flex-start" spacing={3}>
              <Box
                as="span"
                mt={0.5}
                boxSize={6}
                borderRadius="full"
                bg="orange.500"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
                color="white"
              >
                <Icon as={FaHeart} boxSize={3.5} aria-hidden="true" />
              </Box>
              <Text>
                строить долгосрочное отношение через комьюнити и формат практики.
              </Text>
            </HStack>
          </SimpleGrid>
        </VStack>

        <VStack
          display={{ base: "none", md: "flex" }}
          align="flex-start"
          spacing={4}
          flex={2}
          borderRadius="2xl"
          bg={overviewAsideBg}
          p={{ base: 4, md: 5 }}
          boxShadow="none"
          maxW={{ base: "100%", md: "460px" }}
        >
          <PillBadge colorScheme="blue" variant="outline" uppercase={false}>
            Какие эффекты даёт партнёрство
          </PillBadge>
          <Text fontSize="sm" color={mutedTextColor} lineHeight="1.6">
            Что получает бренд, когда партнёрится с AIFFA на уровне задач и хакатонов.
          </Text>
          <SimpleGrid
            as="ul"
            columns={{ base: 1, md: 1 }}
            spacing={3}
            fontSize="sm"
            color={mutedTextColor}
            w="full"
          >
            <HStack as="li" align="flex-start" spacing={3}>
              <Box
                as="span"
                mt={0.5}
                boxSize={6}
                borderRadius="full"
                bg="cyan.500"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
                color="white"
              >
                <Icon as={FaPuzzlePiece} boxSize={3.5} aria-hidden="true" />
              </Box>
              <Text lineHeight="1.5">
                Бренд присутствует в практических задачах и решениях.
              </Text>
            </HStack>
            <HStack as="li" align="flex-start" spacing={3}>
              <Box
                as="span"
                mt={0.5}
                boxSize={6}
                borderRadius="full"
                bg="green.500"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
                color="white"
              >
                <Icon as={FaRocket} boxSize={3.5} aria-hidden="true" />
              </Box>
              <Text lineHeight="1.5">
                Разработчики знакомятся с технологиями на реальных сценариях.
              </Text>
            </HStack>
            <HStack as="li" align="flex-start" spacing={3}>
              <Box
                as="span"
                mt={0.5}
                boxSize={6}
                borderRadius="full"
                bg="red.500"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
                color="white"
              >
                <Icon as={FaInfinity} boxSize={3.5} aria-hidden="true" />
              </Box>
              <Text lineHeight="1.5">
                Формируется долгосрочная ассоциация бренда с ростом и обучением.
              </Text>
            </HStack>
          </SimpleGrid>
        </VStack>
      </Stack>
    </Box>
  );
};

export default BrandFitSection;


