import React from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  Badge,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useHackathonsColors } from "../../colors/useHackathonsColors";
import { FinanceLottieIcon } from "@/shared/icons/components-icon";

const HackathonsPrizeSection: React.FC = () => {
  const { sectionCardBg, cardBorderColor, mutedTextColor } = useHackathonsColors();

  return (
    <Box
      as="section"
      aria-labelledby="hackathons-prize-title"
    >
        <FinanceLottieIcon />
      <Stack spacing={{ base: 4, md: 6 }} align="center">
        <Box textAlign="center">
          <Badge
            colorScheme="pink"
            variant="subtle"
            borderRadius="full"
            px={3}
            py={1}
            mb={3}
          >
            Призовой фонд
          </Badge>
          <Heading
            id="hackathons-prize-title"
            as="h2"
            size="lg"
          >
            100&nbsp;000&nbsp;₽ — призы для трёх сильнейших команд
          </Heading>
          <Text
            mt={3}
            fontSize={{ base: "md", md: "lg" }}
            color={mutedTextColor}
          >
            Мы хотим, чтобы участие было не только про опыт и портфолио, но и
            про заметную награду для команд, которые выложились по максимуму.
            Помимо денежного приза, победители и призёры получают мерч AIFFA —
            чтобы хакатон остался с вами не только в резюме, но и в вещах.
          </Text>
        </Box>

        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          spacing={{ base: 4, md: 6 }}
          mt={{ base: 2, md: 4 }}
        >
          <Box
            bg={sectionCardBg}
            borderRadius="2xl"
            borderWidth="1px"
            borderColor={cardBorderColor}
            p={{ base: 4, md: 5 }}
            textAlign="center"
          >
            <Stack direction="row" align="center" justify="center" spacing={2} mb={2}>
              <StarIcon color="yellow.400" />
              <Text
                as="span"
                fontSize="sm"
                fontWeight="semibold"
                textTransform="uppercase"
                letterSpacing="0.08em"
              >
                1 место
              </Text>
            </Stack>
            <Text
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="bold"
            >
              50&nbsp;000&nbsp;₽
            </Text>
            <Text
              mt={2}
              fontSize="sm"
              color={mutedTextColor}
            >
              Для команды, которая лучше всех раскрыла задачу и собрала
              сильное демо.
            </Text>
          </Box>

          <Box
            bg={sectionCardBg}
            borderRadius="2xl"
            borderWidth="1px"
            borderColor={cardBorderColor}
            p={{ base: 4, md: 5 }}
            textAlign="center"
          >
            <Stack direction="row" align="center" justify="center" spacing={2} mb={2}>
              <StarIcon color="purple.300" />
              <Text
                as="span"
                fontSize="sm"
                fontWeight="semibold"
                textTransform="uppercase"
                letterSpacing="0.08em"
              >
                2 место
              </Text>
            </Stack>
            <Text
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="bold"
            >
              30&nbsp;000&nbsp;₽
            </Text>
            <Text
              mt={2}
              fontSize="sm"
              color={mutedTextColor}
            >
              Для команды с сильным решением и качественной подачей проекта.
            </Text>
          </Box>

          <Box
            bg={sectionCardBg}
            borderRadius="2xl"
            borderWidth="1px"
            borderColor={cardBorderColor}
            p={{ base: 4, md: 5 }}
            textAlign="center"
          >
            <Stack direction="row" align="center" justify="center" spacing={2} mb={2}>
              <StarIcon color="blue.300" />
              <Text
                as="span"
                fontSize="sm"
                fontWeight="semibold"
                textTransform="uppercase"
                letterSpacing="0.08em"
              >
                3 место
              </Text>
            </Stack>
            <Text
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="bold"
            >
              20&nbsp;000&nbsp;₽
            </Text>
            <Text
              mt={2}
              fontSize="sm"
              color={mutedTextColor}
            >
              Для команды, которая показала классный прогресс и интересный
              подход к задаче.
            </Text>
          </Box>
        </SimpleGrid>
      </Stack>
    </Box>
  );
};

export default HackathonsPrizeSection;


