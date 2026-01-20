import React from "react";
import { Box, Container, Heading, HStack, Text, VStack, SimpleGrid } from "@chakra-ui/react";
import { useInteractiveColors } from "../colors/useInteractiveColors";
import { AppButtonLink } from "@/shared/ui/AppLink";


const InteractiveFeaturesSection: React.FC = () => {
  const { cardBg, textColor, titleColor } = useInteractiveColors();

  const steps = [
    {
      number: 1,
      title: "Выбираешь задачу",
      description: "Начни с Weekly или задач внутри материалов — выбери то, что понятно и интересно прямо сейчас.",
    },
    {
      number: 2,
      title: "Пишешь код в IDE на сайте",
      description: "Открываешь VS Code прямо на платформе: решаешь задачу, закрепляешь тему и переходишь к проектам по направлению.",
    },
    {
      number: 3,
      title: "Проверяешь и получаешь фидбек",
      description: "Проверка решения, разборы и поддержка. ИИ‑помощник ускоряет понимание ошибок и помогает не застревать.",
    },
    {
      number: 4,
      title: "Фиксируешь прогресс в профиле",
      description: "XP и достижения растут вместе с тобой: за решения и вклад открываются уровни, бейджи и доверие к твоему прогрессу.",
    },
    {
      number: 5,
      title: "Растёшь дальше",
      description: "Собираешь команду, участвуешь в хакатонах, приходишь на сессии, создаёшь своё и помогаешь другим.",
    },
  ] as const;

  return (
    <Box px={0} as="section" aria-labelledby="home-how-it-works-title" id="home-how-it-works" scrollMarginTop="96px">
      <Container maxW="1200px">
        <VStack spacing={10} align="center">
          <VStack spacing={4} textAlign="center" maxW="720px">
            <Heading
              id="home-how-it-works-title"
              as="h2"
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="bold"
              color={titleColor}
            >
              Как это работает
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} color={textColor} lineHeight="1.7">
              Простая логика: сделал — значит вырос. Любая активность превращается в опыт и вклад.
            </Text>
          </VStack>

          <SimpleGrid minChildWidth={{ base: "100%", md: "360px" }} spacing={5} w="full" alignItems="stretch">
            {steps.map((s) => (
              <Box
                key={s.number}
                bg={cardBg}
                borderWidth="1px"
                borderColor="blackAlpha.200"
                _dark={{ borderColor: "whiteAlpha.200" }}
                borderRadius="2xl"
                p={{ base: 5, md: 6 }}
                h="100%"
              >
                <HStack spacing={3} align="flex-start">
                  <Box
                    w="36px"
                    h="36px"
                    borderRadius="xl"
                    bg="blue.50"
                    color="blue.700"
                    _dark={{ bg: "whiteAlpha.200", color: "blue.200" }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontWeight="bold"
                    flexShrink={0}
                    aria-hidden="true"
                  >
                    {s.number}
                  </Box>
                  <Box minW={0}>
                    <Text fontWeight="bold" color={titleColor}>
                      {s.title}
                    </Text>
                    <Text mt={2} fontSize="sm" color={textColor} lineHeight="1.7">
                      {s.description}
                    </Text>
                  </Box>
                </HStack>
              </Box>
            ))}
          </SimpleGrid>

          <HStack spacing={{ base: 3, md: 4 }} flexWrap="wrap" justify="center" pt={1}>
            <AppButtonLink to="/weekly" colorScheme="blue" borderRadius="full" px={{ base: 6, md: 7 }}>
              Начать с weekly
            </AppButtonLink>
            <AppButtonLink to="/profile?achievements" variant="outline" borderRadius="full" px={{ base: 6, md: 7 }}>
              Достижения
            </AppButtonLink>
            <AppButtonLink to="/learn" variant="outline" borderRadius="full" px={{ base: 6, md: 7 }}>
              Построить роудмэп
            </AppButtonLink>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default InteractiveFeaturesSection;



