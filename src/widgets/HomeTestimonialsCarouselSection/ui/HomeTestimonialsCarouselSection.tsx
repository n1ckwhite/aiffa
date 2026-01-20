"use client";

import React from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  usePrefersReducedMotion,
} from "@chakra-ui/react";

type Testimonial = {
  id: string;
  title: string;
  name: string;
  body: string;
};

const testimonialsMock: readonly Testimonial[] = [
  {
    id: "t1",
    title: "Junior Developer",
    name: "Никита",
    body: "Наконец-то понятно, что делать. Сделал первую weekly, зашёл в TG, и за вечер закрыл то, что откладывал неделю.",
  },
  {
    id: "t2",
    title: "Frontend Engineer",
    name: "Аня",
    body: "Роудмэп снял хаос. Появилось ощущение прогресса — не по словам, а по действиям.",
  },
  {
    id: "t3",
    title: "Junior Developer",
    name: "Саша",
    body: "Мне важно было, чтобы кто-то отвечал. В TG реально быстро помогли и стало легче продолжать.",
  },
  {
    id: "t4",
    title: "Frontend Engineer",
    name: "Илья",
    body: "Хакатон дал командный опыт, который реально спрашивают на собесе. Появился кейс, и стало легче объяснять себя.",
  },
  {
    id: "t5",
    title: "Senior Frontend Developer",
    name: "Мария",
    body: "Самое ценное — ревью и дедлайны. Это перестаёт быть “учёбой”, становится работой.",
  },
  {
    id: "t6",
    title: "Team",
    name: "Команда",
    body: "После хакатона мы доработали проект и добавили в портфолио. Это прям ощутимый рост.",
  },
  {
    id: "t7",
    title: "Middle Developer",
    name: "Дима",
    body: "Важно, что прогресс виден по действиям. Не “рассказал”, а сделал — и это фиксируется.",
  },
  {
    id: "t8",
    title: "Junior Developer",
    name: "Лена",
    body: "Сильнее всего цепляет чувство движения: weekly → задачи → мини‑проект → следующий шаг.",
  },
  {
    id: "t9",
    title: "Frontend Engineer",
    name: "Александр Жёлтов",
    body: "Отличное место для подготовки! Хорошо подобранная теоретическая и практическая информация помогла более уверенно чувствовать себя на собеседованиях.",
  },
  {
    id: "t10",
    title: "Frontend Engineer",
    name: "Baitemir",
    body: "Благодаря этой платформе и мок интервью смог трудоустроиться. Всё чётко и структурировано.",
  },
  {
    id: "t11",
    title: "Erbol Nurmanbetov",
    name: "Erbol Nurmanbetov",
    body: "Я ещё не полностью прошёлся по платформе, но уже на этом этапе мне всё нравится. Всё продуманно до мелочей.",
  },
  {
    id: "t12",
    title: "Davit Gasparyan",
    name: "Davit Gasparyan",
    body: "Отличное приложение для фронтенд разработчиков. Всё чётко, по делу, с реальными примерами и полезными гайдами.",
  },
];

const getInitial = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return "?";
  const first = trimmed[0] ?? "?";
  return first.toUpperCase();
};

type MarqueeRowProps = {
  items: readonly Testimonial[];
  isPaused: boolean;
  direction: "left" | "right";
  durationSec: number;
  onOpen: (t: Testimonial) => void;
  onPauseChange: (isPaused: boolean) => void;
};

const TestimonialCard: React.FC<{
  item: Testimonial;
  onOpen: (t: Testimonial) => void;
  onPauseChange: (isPaused: boolean) => void;
}> = ({ item, onOpen, onPauseChange }) => {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const cardBg = useColorModeValue("whiteAlpha.900", "whiteAlpha.80");
  const titleColor = useColorModeValue("gray.900", "whiteAlpha.900");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const mutedColor = useColorModeValue("gray.500", "whiteAlpha.700");
  const avatarBg = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const avatarColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const hoverBorder = useColorModeValue("blue.200", "whiteAlpha.300");

  return (
    <Box
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="2xl"
      bg={cardBg}
      p={{ base: 4, md: 5 }}
      minW={{ base: "300px", md: "360px" }}
      maxW={{ base: "300px", md: "360px" }}
      h={{ base: "220px", md: "240px" }}
      onMouseEnter={() => onPauseChange(true)}
      onMouseLeave={() => onPauseChange(false)}
      onFocusCapture={() => onPauseChange(true)}
      onBlurCapture={() => onPauseChange(false)}
      transition="border-color 180ms ease, transform 180ms ease"
      _hover={{ borderColor: hoverBorder, transform: "translateY(-1px)" }}
      _focusWithin={{ borderColor: hoverBorder }}
      backdropFilter="blur(10px)"
    >
      <Stack spacing={4} align="stretch" h="full">
        <HStack spacing={3} align="center">
          <Box
            w="40px"
            h="40px"
            borderRadius="full"
            bg={avatarBg}
            color={avatarColor}
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontWeight="bold"
            flexShrink={0}
            aria-hidden="true"
          >
            {getInitial(item.title)}
          </Box>
          <Box minW={0}>
            <Text fontWeight="semibold" color={titleColor} noOfLines={1} letterSpacing="-0.01em">
              {item.title}
            </Text>
            <Text fontSize="sm" color={mutedColor} noOfLines={1}>
              {item.name}
            </Text>
          </Box>
        </HStack>

        <Box flex="1" minH={0}>
          <Text color={textColor} fontSize="sm" lineHeight="1.85" noOfLines={5}>
            {item.body}
          </Text>
        </Box>

        <Button
          variant="outline"
          borderRadius="full"
          size="sm"
          onClick={() => onOpen(item)}
          aria-label={`Читать отзыв: ${item.title}`}
          w="full"
        >
          Читать отзыв
        </Button>
      </Stack>
    </Box>
  );
};

const MarqueeRow: React.FC<MarqueeRowProps> = (props) => {
  const { items, isPaused, direction, durationSec, onOpen, onPauseChange } = props;

  const track = React.useMemo(() => [...items, ...items], [items]);
  const animationName = direction === "left" ? "aiffaMarqueeLeft" : "aiffaMarqueeRight";
  const prefersReducedMotion = usePrefersReducedMotion();
  const isAnimationDisabled = prefersReducedMotion || items.length <= 1;

  return (
    <Box
      w="full"
      overflow="hidden"
      position="relative"
      onMouseEnter={() => onPauseChange(true)}
      onMouseLeave={() => onPauseChange(false)}
      onFocusCapture={() => onPauseChange(true)}
      onBlurCapture={() => onPauseChange(false)}
      sx={{
        "@keyframes aiffaMarqueeLeft": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "@keyframes aiffaMarqueeRight": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      }}
    >
      <HStack
        spacing={4}
        w="max-content"
        py={2}
        animation={isAnimationDisabled ? undefined : `${animationName} ${durationSec}s linear infinite`}
        style={{ animationPlayState: isPaused ? "paused" : "running" }}
        role="list"
        aria-label="Лента отзывов"
      >
        {track.map((t, idx) => (
          <Box key={`${t.id}-${idx}`} role="listitem">
            <TestimonialCard item={t} onOpen={onOpen} onPauseChange={onPauseChange} />
          </Box>
        ))}
      </HStack>
    </Box>
  );
};

const HomeTestimonialsCarouselSection: React.FC = () => {
  const titleColor = useColorModeValue("gray.900", "whiteAlpha.900");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const mutedColor = useColorModeValue("gray.500", "whiteAlpha.700");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const buttonShadowless = useColorModeValue("gray.900", "white");

  const [isPausedRowA, setIsPausedRowA] = React.useState(false);
  const [isPausedRowB, setIsPausedRowB] = React.useState(false);
  const [active, setActive] = React.useState<Testimonial | null>(null);
  const details = useDisclosure();
  const allModal = useDisclosure();
  const leaveModal = useDisclosure();

  const rowA = React.useMemo(() => testimonialsMock.slice(0, 8), []);
  const rowB = React.useMemo(() => testimonialsMock.slice(4), []);

  const handleOpen = (t: Testimonial) => {
    setActive(t);
    details.onOpen();
  };

  return (
    <Box
      as="section"
      aria-labelledby="home-testimonials-title"
      id="home-testimonials"
      scrollMarginTop="120px"
      px={0}
      py={{ base: 12, md: 16 }}
    >
      <Container maxW="1200px">
        <Stack spacing={3} textAlign="center" align="center">
          <Heading
            id="home-testimonials-title"
            as="h2"
            letterSpacing="-0.03em"
            color={titleColor}
            fontSize={{ base: "3xl", md: "5xl" }}
          >
            Что говорят пользователи
          </Heading>
          <Text color={mutedColor} fontSize={{ base: "md", md: "lg" }} maxW="720px" lineHeight="1.7">
            Более 2300 разработчиков уже прокачали свои навыки
          </Text>
        </Stack>
      </Container>

      <Box mt={{ base: 8, md: 10 }} position="relative" w="100vw" left="50%" transform="translateX(-50%)">
        <Box
          py={{ base: 6, md: 8 }}
        >
          <Stack spacing={{ base: 4, md: 6 }} position="relative" zIndex={1}>
            <MarqueeRow
              items={rowA}
              isPaused={isPausedRowA}
              direction="left"
              durationSec={44}
              onOpen={handleOpen}
              onPauseChange={setIsPausedRowA}
            />
            <MarqueeRow
              items={rowB}
              isPaused={isPausedRowB}
              direction="right"
              durationSec={54}
              onOpen={handleOpen}
              onPauseChange={setIsPausedRowB}
            />
          </Stack>
        </Box>
      </Box>

      <Container maxW="1200px">
        <HStack spacing={3} justify="center" mt={{ base: 8, md: 10 }} flexWrap="wrap">
          <Button
            borderRadius="full"
            px={{ base: 6, md: 7 }}
            bg={buttonShadowless}
            color={useColorModeValue("white", "gray.900")}
            _hover={{ opacity: 0.92 }}
            onClick={allModal.onOpen}
            aria-label="Открыть все отзывы"
          >
            Все отзывы
          </Button>
          <Button
            borderRadius="full"
            px={{ base: 6, md: 7 }}
            variant="outline"
            onClick={leaveModal.onOpen}
            aria-label="Оставить отзыв"
          >
            Оставить отзыв
          </Button>
        </HStack>
      </Container>

      <Modal isOpen={details.isOpen} onClose={details.onClose} isCentered size={{ base: "full", md: "lg" }}>
        <ModalOverlay />
        <ModalContent borderRadius={{ base: "0", md: "2xl" }}>
          <ModalHeader>{active ? active.title : "Отзыв"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {active ? (
              <Stack spacing={4}>
                <Text color={mutedColor}>{active.name}</Text>
                <Text color={textColor} lineHeight="1.9">
                  {active.body}
                </Text>
              </Stack>
            ) : (
              <Text color={mutedColor}>Не удалось открыть отзыв.</Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={allModal.isOpen} onClose={allModal.onClose} isCentered size={{ base: "full", md: "6xl" }}>
        <ModalOverlay />
        <ModalContent borderRadius={{ base: "0", md: "2xl" }}>
          <ModalHeader>Все отзывы (мок)</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              {testimonialsMock.map((t) => (
                <Box key={t.id}>
                  <TestimonialCard item={t} onOpen={handleOpen} onPauseChange={() => undefined} />
                </Box>
              ))}
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={leaveModal.isOpen} onClose={leaveModal.onClose} isCentered size={{ base: "full", md: "lg" }}>
        <ModalOverlay />
        <ModalContent borderRadius={{ base: "0", md: "2xl" }}>
          <ModalHeader>Оставить отзыв</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text color={mutedColor} lineHeight="1.8">
              Пока это мок. Позже подключим форму и модерацию. Сейчас можно просто посмотреть, как будет выглядеть поток отзывов.
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default HomeTestimonialsCarouselSection;

