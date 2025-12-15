import React from "react";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { useCreatorsColors } from "../../colors/useCreatorsColors";

const CreatorsIntroSection: React.FC = () => {
  const { pageDescriptionColor } = useCreatorsColors();

  return (
    <Box as="section" aria-label="Описание страницы создателей AIFFA">
      <VStack align="center" spacing={0} textAlign="center">
        <Heading as="h2" fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }} letterSpacing="-0.03em">
          Создатели AIFFA
        </Heading>
        <Text
          mt={3}
          fontSize={{ base: "sm", md: "md" }}
          color={pageDescriptionColor}
          maxW={{ base: "full", md: "720px" }}
        >
          Здесь собраны люди, которые делают AIFFA живой экосистемой: авторы материалов, задач недели и статей,
          мейнтейнеры проектов, участники хакатонов и те, кто поддерживает идею. Найдите авторов, с которыми вам по пути
          в обучении, коллаборациях и запуске новых проектов.
        </Text>
      </VStack>
    </Box>
  );
};

export default CreatorsIntroSection;


