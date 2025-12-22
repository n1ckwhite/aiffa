import React from "react";
import { Box, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { usePartnersColors } from "widgets/Partners/colors/usePartnersColors";

const HowItWorksSection: React.FC = () => {
  const {
    mutedTextColor,
    stepLineColor,
    stepNumberBg,
    stepNumberColor,
    stepCardBg,
    stepCardBorder,
  } = usePartnersColors();

  const steps = [
    {
      id: "brief",
      number: 1,
      title: "Вы рассказываете задачу и продукт",
      description:
        "Коротко описываете продукт, цели партнёрства, аудиторию и ограничения. Мы помогаем превратить это в понятный бриф без лишней бюрократии.",
    },
    {
      id: "format",
      number: 2,
      title: "Мы собираем формат под ваши цели",
      description:
        "Предлагаем связку из хакатона, Weekly‑задач, материалов и сессий — под нужные метрики: найм, узнаваемость, экспертиза или запуск нового продукта.",
    },
    {
      id: "launch",
      number: 3,
      title: "Запускаем хакатон / Weekly / интеграцию",
      description:
        "Готовим лендинги, задачи, коммуникации и модерацию. Комьюнити получает понятный таймлайн и задачи, бренд — органичное присутствие в формате.",
    },
    {
      id: "results",
      number: 4,
      title: "Вы получаете отчёт, решения и метрики",
      description:
        "Собираем результаты: решения команд, вовлечённость, охваты и качественный фидбек. По итогам даём рекомендации по следующим шагам.",
    },
  ];

  return (
    <Box as="section" aria-label="Как проходит партнёрство" zIndex={100}>
      <Stack align="center" spacing={{ base: 4, md: 5 }}>
        <Box
          as="header"
          textAlign="center"
          justifyContent="center"
          alignItems="center"
          display="flex"
          flexDirection="column"
          gap={3}
        >
          <Heading as="h2" size={{base: "md", md: "lg"}} letterSpacing="-0.02em">
            Как проходит партнёрство
          </Heading>
          <Text
            align="center"
            fontSize={{base: "md", md: "lg"}}
            color={mutedTextColor}
            maxW={{ base: "100%", md: "720px" }}
          >
            Делаем процесс прозрачным: на старте вы формулируете задачу, на финише — получаете
            отчёт с результатами и следующими шагами.
          </Text>
        </Box>

        <SimpleGrid
          as="ol"
          role="list"
          listStyleType="none"
          pl={0}
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 4, md: 5 }}
          mt={{ base: 2, md: 3 }}
          w="full"
        >
          {steps.map((step) => (
            <Stack
              key={step.id}
              as="li"
              role="listitem"
              direction="row"
              spacing={4}
              align="flex-start"
            >
              <Box>
                <Box
                  boxSize={9}
                  borderRadius="full"
                  bg={stepNumberBg}
                  borderWidth="1px"
                  borderColor={stepLineColor}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color={stepNumberColor}
                  fontWeight="semibold"
                  fontSize="sm"
                  flexShrink={0}
                >
                  {step.number}
                </Box>
              </Box>
              <Box
                flex="1"
                bg={stepCardBg}
                borderRadius="xl"
                borderWidth="1px"
                borderColor={stepCardBorder}
                p={{ base: 3, md: 4 }}
              >
                <Heading as="h3" size="sm" mb={1}>
                  {step.title}
                </Heading>
                <Text fontSize="sm" color={mutedTextColor}>
                  {step.description}
                </Text>
              </Box>
            </Stack>
          ))}
        </SimpleGrid>
      </Stack>
    </Box>
  );
};

export default HowItWorksSection;


