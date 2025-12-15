import React from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  SimpleGrid,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { FiLogIn, FiAward, FiHeart, FiTrendingUp, FiMessageCircle, FiShare2 } from "react-icons/fi";
import FAQ from "widgets/Modules/FAQ/FAQ";
import HeroSection from "../../ui/parts/HeroSection";
import FeaturedCreatorsSection from "../../ui/parts/FeaturedCreatorsSection";
import ProjectsAuthorsSection from "../../ui/parts/ProjectsAuthorsSection";
import WeeklyAuthorsSection from "../../ui/parts/WeeklyAuthorsSection";
import ArticleAuthorsSection from "../../ui/parts/ArticleAuthorsSection";
import HackathonWinnersSection from "../../ui/parts/HackathonWinnersSection";
import SupportersSection from "../../ui/parts/SupportersSection";
import { BusinessWorkshopIcon, SeniorTeamIcon } from "@/shared/icons/components-icon";

const CreatorsScreen: React.FC = () => {
  const pageDescriptionColor = useColorModeValue("gray.600", "gray.300");
  const infoCardBg = useColorModeValue("white", "whiteAlpha.100");
  const infoCardBorder = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const infoIconBg = useColorModeValue("blue.50", "whiteAlpha.100");
  const infoIconColor = useColorModeValue("blue.500", "blue.300");
  const joinIconPalettes = [
    {
      bg: useColorModeValue("blue.50", "whiteAlpha.100"),
      color: useColorModeValue("blue.500", "blue.300"),
    },
    {
      bg: useColorModeValue("teal.50", "whiteAlpha.100"),
      color: useColorModeValue("teal.500", "teal.200"),
    },
    {
      bg: useColorModeValue("purple.50", "whiteAlpha.100"),
      color: useColorModeValue("purple.500", "purple.200"),
    },
  ];
  const seniorCardBg = useColorModeValue("white", "whiteAlpha.100");
  const seniorCardBorder = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const seniorIconBg = useColorModeValue("purple.50", "whiteAlpha.100");
  const seniorIconColor = useColorModeValue("purple.500", "purple.200");
  const seniorTextColor = useColorModeValue("gray.700", "gray.200");

  return (
    <Box
      as="section"
      py={{ base: 8, md: 10 }}
      px={{ base: 4, md: 6 }}
      transition="none"
    >
      <Box maxW="1320px" mx="auto">
        <VStack align="stretch" spacing={{ base: 10, md: 14 }}>
          <Box as="section" aria-label="Описание страницы создателей AIFFA">
            <VStack
              align="center"
              spacing={0}
              textAlign="center"
            >
              <Heading
                as="h2"
                fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                letterSpacing="-0.03em"
              >
                Создатели AIFFA
              </Heading>
              <Text
                mt={3}
                fontSize={{ base: "sm", md: "md" }}
                color={pageDescriptionColor}
                maxW={{ base: "full", md: "720px" }}
              >
                Здесь собраны люди, которые делают AIFFA живой экосистемой: авторы материалов, задач недели и статей,
                мейнтейнеры проектов, участники хакатонов и те, кто поддерживает идею. Найдите авторов, с которыми вам
                по пути в обучении, коллаборациях и запуске новых проектов.
              </Text>
            </VStack>
          </Box>
          <HeroSection />
          <Box as="section" id="how-to-join" scrollMarginTop="90px" aria-label="Как попасть в создатели AIFFA">
          <BusinessWorkshopIcon/>
            <VStack align="stretch" spacing={4}>
              <VStack align="center" spacing={3} textAlign="center">
              <Heading
                as="h3"
                size="md"
                textAlign="center"
                letterSpacing="-0.02em"
              >
                Как попасть в создатели AIFFA
              </Heading>
              <Text
                fontSize={{ base: "sm", md: "md" }}
                color={pageDescriptionColor}
                textAlign="center"
                maxW={{ base: "full", md: "840px" }}
                mx="auto"
              >
                Мы отмечаем людей, которые делают вклад в экосистему: делятся материалами и задачами недели,
                мейнтейнтят проекты, пишут статьи, помогают на хакатонах и поддерживают комьюнити. Присоединиться может
                любой, кто создаёт пользу и готов делиться опытом.
              </Text>
              </VStack>
              <SimpleGrid
                minChildWidth="260px"
                spacing={{ base: 3, md: 4 }}
                justifyItems="stretch"
              >
                <Box
                  borderWidth="1px"
                  borderColor={infoCardBorder}
                  borderRadius="2xl"
                  bg={infoCardBg}
                  p={5}
                  boxShadow={useColorModeValue("lg", "lg")}
                  w="full"
                  minW="0"
                  maxW="100%"
                  transition="all 0.2s ease"
                  _hover={{
                    transform: "translateY(-4px)",
                    boxShadow: useColorModeValue("xl", "xl"),
                    borderColor: infoIconColor,
                  }}
                >
                  <HStack align="flex-start" spacing={4}>
                    <Box
                      w={10}
                      h={10}
                      borderRadius="full"
                      bg={joinIconPalettes[0].bg}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                    >
                      <Icon as={FiLogIn} aria-hidden="true" boxSize={5} color={joinIconPalettes[0].color} />
                    </Box>
                    <VStack align="flex-start" spacing={2}>
                      <Text fontWeight="semibold" color={useColorModeValue("gray.800", "gray.100")} fontSize="md">
                        Как я могу туда попасть?
                      </Text>
                      <Text fontSize="sm" color={pageDescriptionColor} lineHeight="1.5">
                        Публикуйте материалы, задачи недели или статьи, ведите проекты, участвуйте в хакатонах и помогайте
                        другим — мы смотрим на пользу для сообщества и качество того, что вы делаете.
                      </Text>
                    </VStack>
                  </HStack>
                </Box>

                <Box
                  borderWidth="1px"
                  borderColor={infoCardBorder}
                  borderRadius="2xl"
                  bg={infoCardBg}
                  p={5}
                  boxShadow={useColorModeValue("lg", "lg")}
                  w="full"
                  minW="0"
                  maxW="100%"
                  transition="all 0.2s ease"
                  _hover={{
                    transform: "translateY(-4px)",
                    boxShadow: useColorModeValue("xl", "xl"),
                    borderColor: infoIconColor,
                  }}
                >
                  <HStack align="flex-start" spacing={4}>
                    <Box
                      w={10}
                      h={10}
                      borderRadius="full"
                      bg={joinIconPalettes[1].bg}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                    >
                      <Icon as={FiAward} aria-hidden="true" boxSize={5} color={joinIconPalettes[1].color} />
                    </Box>
                    <VStack align="flex-start" spacing={2}>
                      <Text fontWeight="semibold" color={useColorModeValue("gray.800", "gray.100")} fontSize="md">
                        За что люди попадают туда?
                      </Text>
                      <Text fontSize="sm" color={pageDescriptionColor} lineHeight="1.5">
                        За вклад, который помогает другим: полезные материалы и задачи, стабильные проекты, статьи с
                        практикой, участие и менторство на хакатонах, поддержку комьюнити и обратную связь.
                      </Text>
                    </VStack>
                  </HStack>
                </Box>

                <Box
                  borderWidth="1px"
                  borderColor={infoCardBorder}
                  borderRadius="2xl"
                  bg={infoCardBg}
                  p={5}
                  boxShadow={useColorModeValue("lg", "lg")}
                  w="full"
                  minW="0"
                  maxW="100%"
                  transition="all 0.2s ease"
                  _hover={{
                    transform: "translateY(-4px)",
                    boxShadow: useColorModeValue("xl", "xl"),
                    borderColor: infoIconColor,
                  }}
                >
                  <HStack align="flex-start" spacing={4}>
                    <Box
                      w={10}
                      h={10}
                      borderRadius="full"
                      bg={joinIconPalettes[2].bg}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                    >
                      <Icon as={FiHeart} aria-hidden="true" boxSize={5} color={joinIconPalettes[2].color} />
                    </Box>
                    <VStack align="flex-start" spacing={2}>
                      <Text fontWeight="semibold" color={useColorModeValue("gray.800", "gray.100")} fontSize="md">
                        Почему это важно?
                      </Text>
                      <Text fontSize="sm" color={pageDescriptionColor} lineHeight="1.5">
                        Это усиливает миссию AIFFA: делать обучение практичным, развивать культуру обмена знаниями,
                        повышать качество контента и благодарить людей, которые двигают экосистему вперёд.
                      </Text>
                    </VStack>
                  </HStack>
                </Box>
              </SimpleGrid>
            </VStack>
          </Box>
          <Box id="materials" scrollMarginTop="90px">
            <FeaturedCreatorsSection />
          </Box>
          <Box id="projects" scrollMarginTop="90px">
            <ProjectsAuthorsSection />
          </Box>
          <Box id="weekly" scrollMarginTop="90px">
            <WeeklyAuthorsSection />
          </Box>
          <Box id="articles" scrollMarginTop="90px">
            <ArticleAuthorsSection />
          </Box>
          <Box id="hackathons" scrollMarginTop="90px">
            <HackathonWinnersSection />
          </Box>
          <Box id="supporters" scrollMarginTop="90px">
            <SupportersSection />
          </Box>
          <Box
            as="section"
            id="senior-benefits"
            scrollMarginTop="90px"
            aria-label="Как вклад делает авторов сильнее"
          >
              <SeniorTeamIcon />
            <VStack spacing={3} align="center" textAlign="center">
              <VStack spacing={3} align="center">
                <Heading as="h3" size="md" letterSpacing="-0.02em">
                  Как это делает вас сильнее
                </Heading>
                <Text fontSize={{ base: "sm", md: "md" }} color={seniorTextColor} maxW={{ base: "full", md: "880px" }}>
                  Делитесь опытом, чтобы создать поток знаний для комьюнити: люди, которым вы помогаете, позже смогут
                  усилить ваши проекты, принести новые идеи и закрыть сложные задачи вместе с вами.
                </Text>
              </VStack>
              <SimpleGrid
                minChildWidth="260px"
                spacing={{ base: 3, md: 4 }}
                justifyItems="stretch"
                w="full"
              >
                <HStack
                  align="flex-start"
                  spacing={3}
                  p={5}
                  borderRadius="xl"
                  textAlign="left"
                  bg={seniorCardBg}
                  borderWidth="1px"
                  borderColor={seniorCardBorder}
                  boxShadow={useColorModeValue("xs", "xs")}
                  w="full"
                  minW="0"
                >
                  <Box
                    w={9}
                    h={9}
                    borderRadius="full"
                    bg={seniorIconBg}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                  >
                    <Icon as={FiTrendingUp} aria-hidden="true" boxSize={5} color={seniorIconColor} />
                  </Box>
                  <VStack align="flex-start" spacing={1}>
                    <Text fontWeight="semibold" color={useColorModeValue("gray.800", "gray.100")}>
                      Глубже прокачиваете экспертизу
                    </Text>
                    <Text fontSize="sm" color={seniorTextColor}>
                      Объясняя сложные вещи, вы структурируете знания и закрываете пробелы — это ускоряет рост
                      синьоров и лидов.
                    </Text>
                  </VStack>
                </HStack>
                <HStack
                  align="flex-start"
                  spacing={3}
                  p={5}
                  borderRadius="xl"
                  textAlign="left"
                  bg={seniorCardBg}
                  borderWidth="1px"
                  borderColor={seniorCardBorder}
                  boxShadow={useColorModeValue("xs", "xs")}
                  w="full"
                  minW="0"
                >
                  <Box
                    w={9}
                    h={9}
                    borderRadius="full"
                    bg={seniorIconBg}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                  >
                    <Icon as={FiMessageCircle} aria-hidden="true" boxSize={5} color={seniorIconColor} />
                  </Box>
                  <VStack align="flex-start" spacing={1}>
                    <Text fontWeight="semibold" color={useColorModeValue("gray.800", "gray.100")}>
                      Получаете обратную связь и идеи
                    </Text>
                    <Text fontSize="sm" color={seniorTextColor}>
                      Люди применяют ваши материалы и задачи, задают вопросы, предлагают улучшения — это даёт свежий
                      взгляд на архитектуру и практики.
                    </Text>
                  </VStack>
                </HStack>
                <HStack
                  align="flex-start"
                  spacing={3}
                  p={5}
                  borderRadius="xl"
                  textAlign="left"
                  bg={seniorCardBg}
                  borderWidth="1px"
                  borderColor={seniorCardBorder}
                  boxShadow={useColorModeValue("xs", "xs")}
                  w="full"
                  minW="0"
                >
                  <Box
                    w={9}
                    h={9}
                    borderRadius="full"
                    bg={seniorIconBg}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                  >
                    <Icon as={FiShare2} aria-hidden="true" boxSize={5} color={seniorIconColor} />
                  </Box>
                  <VStack align="flex-start" spacing={1} textAlign="left" w="full">
                    <Text fontWeight="semibold" color={useColorModeValue("gray.800", "gray.100")}>
                      Строите сеть и усиливаете репутацию
                    </Text>
                    <Text fontSize="sm" color={seniorTextColor}>
                      Вы становитесь заметнее в сообществе: люди, которым вы помогли, готовы прийти на ревью, в спринт
                      или в хакатон и закрыть сложные задачи плечом к плечу.
                    </Text>
                  </VStack>
                </HStack>
              </SimpleGrid>
            </VStack>
          </Box>
          <Box id="faq-creators" scrollMarginTop="90px">
            <FAQ variant="creators" showSupportBlock={false} />
          </Box>
          {/* <CreatorsGridSection /> */}
        </VStack>
      </Box>
    </Box>
  );
};

export default CreatorsScreen;


