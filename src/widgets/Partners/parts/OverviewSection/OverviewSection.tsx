import React from "react";
import { Box, Heading, HStack, Icon, Stack, Text, VStack } from "@chakra-ui/react";
import PillBadge from "shared/ui/PillBadge";
import { FaHandshake } from "react-icons/fa6";
import { FaCode, FaRocket, FaStar, FaUsers } from "react-icons/fa";
import { usePartnersColors } from "widgets/Partners/colors/usePartnersColors";

const OverviewSection: React.FC = () => {
  const {
    heroAsideBg,
    partnershipBorderColor,
    partnershipBgGradient,
    partnershipIconColor,
    mutedTextColor,
  } = usePartnersColors();

  const partnershipBoxShadow = "md";

  return (
    <Box>
      <Box
        borderRadius="2xl"
        borderWidth="1px"
        borderColor={partnershipBorderColor}
        p={{ base: 5, md: 6 }}
        w="100%"
        mx="auto"
        bg={heroAsideBg}
        bgGradient={partnershipBgGradient}
        boxShadow={partnershipBoxShadow}
        position="relative"
        overflow="hidden"
      >
        <Box
          as="span"
          aria-hidden="true"
          position="absolute"
          right={{ base: "auto", md: -2 }}
          left={{ base: "50%", md: "auto" }}
          top={{ base: "50%", md: -5 }}
          transform={{ base: "translate(-50%, -50%)", md: "none" }}
          boxSize={{ base: 56, md: 40 }}
          opacity={{ base: 0.05, md: 0.26 }}
          zIndex={0}
        >
          <Icon
            as={FaHandshake}
            boxSize="100%"
            color={partnershipIconColor}
          />
        </Box>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 4, md: 8 }}
          align={{ base: "flex-start", md: "flex-end" }}
          position="relative"
          zIndex={1}
        >
          <VStack
            align={{ base: "center", md: "flex-start" }}
            spacing={4}
            flex={{ base: "none", md: 2 }}
            textAlign={{ base: "center", md: "left" }}
            maxW={{ base: "100%", md: "420px" }}
          >
            <PillBadge colorScheme="blue" variant="outline" uppercase={false}>
              Партнёрство для компаний
            </PillBadge>
            <Heading
              as="h2"
              size="md"
              letterSpacing="-0.02em"
            >
              Платформа для практики и роста разработчиков
            </Heading>
            <Text fontSize="sm" color={mutedTextColor} lineHeight="1.6">
              Помогаем компаниям работать с IT-аудиторией через практику, а не пассивное обучение.
            </Text>
          </VStack>

          <VStack
            as="ul"
            align="flex-start"
            spacing={3}
            flex={{ base: "none", md: 3 }}
            fontSize="sm"
            color={mutedTextColor}
          >
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
              <Text>Weekly-задачи, проекты и хакатоны.</Text>
            </HStack>
            <HStack as="li" align="flex-start" spacing={3}>
              <Box
                as="span"
                mt={0.5}
                boxSize={6}
                borderRadius="full"
                bg="blue.500"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
                color="white"
              >
                <Icon as={FaCode} boxSize={3.5} aria-hidden="true" />
              </Box>
              <Text>Редактор кода в браузере с VSCode-опытом.</Text>
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
                <Icon as={FaUsers} boxSize={3.5} aria-hidden="true" />
              </Box>
              <Text>Мероприятия: консультации, знакомства, встречи и Q&amp;A-сессии.</Text>
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
                <Icon as={FaStar} boxSize={3.5} aria-hidden="true" />
              </Box>
              <Text>Честные реакции: звёзды без дизлайков и токсичности.</Text>
            </HStack>
          </VStack>
        </Stack>

        <HStack
          mt={{ base: 4, md: 5 }}
          spacing={3}
          justify={{ base: "center", md: "space-between" }}
          flexWrap="wrap"
        >
          <Text fontSize="xs" color={mutedTextColor} textAlign={{ base: "center", md: "left" }}>
            Открыты к пилотам и спецформатам — подберём формат под HR-задачи, бренд и продуктовые кейсы.
          </Text>
          <HStack spacing={2}>
            <PillBadge colorScheme="green" variant="outline" uppercase={false}>
              HR-задачи
            </PillBadge>
            <PillBadge colorScheme="purple" variant="outline" uppercase={false}>
              Бренд
            </PillBadge>
            <PillBadge colorScheme="yellow" variant="outline" uppercase={false}>
              Продукт
            </PillBadge>
          </HStack>
        </HStack>
      </Box>
    </Box>
  );
};

export default OverviewSection;


