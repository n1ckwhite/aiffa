import React from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
  VStack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import PillBadge from "shared/ui/PillBadge";
import { TelegramIcon } from "@/widgets/Footer/icons/Telegram";
import { MailIcon } from "@/widgets/Footer/icons/Mail";
import { FaHandshake } from "react-icons/fa6";
import { BusinessAnalystIcon } from "@/shared/icons/components-icon";
import { usePartnersColors } from "widgets/Partners/colors/usePartnersColors";

const HeroSection: React.FC = () => {
  const { mutedTextColor, socialProofBadgeBg, socialProofBadgeBorder } = usePartnersColors();

  return (
    <Box as="section" transition="none" aria-labelledby="partners-hero-title">
      <VStack
        align="center"
        spacing={{ base: 4, md: 5 }}
        textAlign="center"
        maxW={{ base: "100%", md: "720px", lg: "820px" }}
        mx="auto"
      >
        <Stack
          as="header"
          direction="column"
          justify="center"
          align="center"
          spacing={3}
        >
          <Heading
            as="h1"
            id="partners-hero-title"
            fontSize={{ base: "2xl", md: "4xl" }}
            letterSpacing="-0.03em"
            textAlign="center"
          >
            Стать партнёром AIFFA
          </Heading>
        <PillBadge colorScheme="blue" variant="outline" uppercase={false}>
          Партнёрство для компаний
        </PillBadge>

        <Text
          fontSize={{ base: "lg", md: "xl" }}
          fontWeight="semibold"
          color={mutedTextColor}
          lineHeight="1.5"
        >
          Помогаем компаниям работать с IT‑аудиторией через практику, а не пассивное обучение:
          от хакатонов до Weekly‑челленджей.
        </Text>
        <Text
          fontSize="md"
          color={mutedTextColor}
          lineHeight="1.6"
        >
          Если вам нужны бренд, найм или продвижение технологий среди разработчиков — здесь вы
          получаете понятные результаты, а мы берём на себя весь продакшн.
        </Text>
        </Stack>
        <BusinessAnalystIcon />
        <HStack spacing={4} flexWrap="wrap" justify="center">
          <Button
            as={Link}
            href="https://t.me/iamceob1tch"
            isExternal
            colorScheme="blue"
            borderRadius="full"
            px={{ base: 6, md: 7 }}
            fontWeight="semibold"
            w={{ base: "100%", sm: "auto", md: "260px" }}
            justifyContent="center"
            leftIcon={<TelegramIcon />}
          >
            Написать в Telegram
          </Button>
          <Button
            as={Link}
            href="mailto:bbycinka@yandex.ru?subject=Запрос медиакита AIFFA"
            variant="outline"
            borderRadius="full"
            px={{ base: 6, md: 7 }}
            fontWeight="semibold"
            w={{ base: "100%", sm: "auto", md: "260px" }}
            justifyContent="center"
            leftIcon={<MailIcon />}
          >
            Написать на email
          </Button>
        </HStack>
        <VStack spacing={2} pt={3}>
          <Text fontSize="xs" color={mutedTextColor} textAlign="center">
            Платформа подходит для компаний уровня:
          </Text>
          <HStack spacing={2} flexWrap="wrap" justify="center">
            {["Яндекс", "VK", "Avito", "Tinkoff", "Skyeng", "JetBrains"].map((company) => (
              <Box
                key={company}
                as="span"
                borderRadius="full"
                px={3}
                py={1}
                bg={socialProofBadgeBg}
                borderWidth="1px"
                borderColor={socialProofBadgeBorder}
                boxShadow="sm"
              >
                <Text fontSize="xs" fontWeight="medium">
                  {company}
                </Text>
              </Box>
            ))}
          </HStack>
          <Text fontSize="xs" color={mutedTextColor} textAlign="center">
            Работаем и с крупными компаниями, и с небольшими командами, стартапами и личными брендами.
          </Text>
          <Text fontSize="xs" color={mutedTextColor} textAlign="center">
            Важно не сколько у вас людей, а какая у вас задача: найм, бренд или продвижение продукта.
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
};

export default HeroSection;


