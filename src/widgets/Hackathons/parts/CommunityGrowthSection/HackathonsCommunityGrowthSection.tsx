import React from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useHackathonsColors } from "../../colors/useHackathonsColors";

const HackathonsCommunityGrowthSection: React.FC = () => {
  const { sectionCardBg, cardBorderColor, mutedTextColor } = useHackathonsColors();

  return (
    <Box
      as="section"
      aria-labelledby="hackathons-community-growth-title"
    >
      <Stack spacing={{ base: 4, md: 6 }}>
        <Box>
          <Heading
            id="hackathons-community-growth-title"
            as="h2"
            size="lg"
          >
            Рост коммьюнити AIFFA
          </Heading>
          <Text
            mt={3}
            fontSize={{ base: "md", md: "lg" }}
            color={mutedTextColor}
          >
            Живое сообщество и регулярная активность создают среду, в которой
            хочется расти и возвращаться к задачам и хакатонам.
          </Text>
        </Box>

        <SimpleGrid
          columns={{ base: 1, sm: 3 }}
          spacing={{ base: 4, md: 6 }}
          mt={{ base: 2, md: 4 }}
        >
          <Box
            bg={sectionCardBg}
            borderRadius="2xl"
            borderWidth="1px"
            borderColor={cardBorderColor}
            p={{ base: 4, md: 5 }}
          >
            <Text
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="bold"
            >
              120+
            </Text>
            <Text
              mt={1}
              fontSize={{ base: "sm", md: "md" }}
              color={mutedTextColor}
            >
              активных участников платформы
            </Text>
          </Box>

          <Box
            bg={sectionCardBg}
            borderRadius="2xl"
            borderWidth="1px"
            borderColor={cardBorderColor}
            p={{ base: 4, md: 5 }}
          >
            <Text
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="bold"
            >
              40+
            </Text>
            <Text
              mt={1}
              fontSize={{ base: "sm", md: "md" }}
              color={mutedTextColor}
            >
              решений задач недели
            </Text>
          </Box>

          <Box
            bg={sectionCardBg}
            borderRadius="2xl"
            borderWidth="1px"
            borderColor={cardBorderColor}
            p={{ base: 4, md: 5 }}
          >
            <Text
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="bold"
            >
              50+
            </Text>
            <Text
              mt={1}
              fontSize={{ base: "sm", md: "md" }}
              color={mutedTextColor}
            >
              оплаченных поддержек проекта
            </Text>
          </Box>
        </SimpleGrid>
      </Stack>
    </Box>
  );
};

export default HackathonsCommunityGrowthSection;


