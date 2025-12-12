import React from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Link,
  Avatar,
  Wrap,
  WrapItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiHeart } from "react-icons/fi";
import { useCreatorsData } from "../hooks/useCreatorsData";

const SupportersSection: React.FC = () => {
  const { items } = useCreatorsData();
  const subtitleColor = useColorModeValue("gray.600", "gray.300");
  const iconBorderColor = useColorModeValue("pink.400", "pink.300");
  const iconBg = useColorModeValue("whiteAlpha.900", "whiteAlpha.100");
  const iconColor = useColorModeValue("pink.500", "pink.300");

  const supporters = React.useMemo(() => {
    if (!items || items.length === 0) {
      return [];
    }
    return items.filter((creator) => creator.areas?.includes("support"));
  }, [items]);

  if (supporters.length === 0) {
    return null;
  }

  const githubSupporters = React.useMemo(
    () => {
      const usernames = [
        "torvalds",
        "gaearon",
        "tj",
        "sindresorhus",
        "defunkt",
        "mojombo",
        "fabpot",
        "hadley",
        "yyx990803",
        "getify",
        "substack",
        "mrdoob",
        "paulirish",
        "kenwheeler",
        "brendangregg",
        "jashkenas",
        "bkeepers",
        "isaacs",
        "koalaman",
        "golang",
        "rust-lang",
        "facebook",
        "microsoft",
        "google",
        "apple",
        "vuejs",
        "angular",
        "django",
        "rails",
        "elastic",
        "kubernetes",
        "docker",
        "vercel",
        "prisma",
        "redis",
        "home-assistant",
        "netlify",
        "webpack",
        "vitejs",
        "nodejs",
        "denoland",
        "sveltejs",
        "astro-build",
        "tailwindlabs",
        "neovim",
        "tmux",
        "ansible",
        "prometheus",
        "grafana",
        "pytorch",
        "tensorflow",
        "numpy",
        "pandas-dev",
        "scikit-learn",
        "matplotlib",
        "scrapy",
        "requests",
        "pallets",
        "psf",
        "fastapi",
        "tiangolo",
        "encode",
        "celery",
        "rabbitmq",
        "zeromq",
        "hashicorp",
        "terraform",
        "vault",
        "consul",
        "pulumi",
        "cockroachdb",
        "clickhouse",
        "yandex",
        "spotify",
        "uber",
        "airbnb",
        "twitter",
        "netflix",
        "stripe",
        "square",
        "shopify",
        "slackhq",
        "discord",
        "signalapp",
        "telegramdesktop",
        "element-hq",
        "nextcloud",
        "gnome",
        "kde",
        "blender",
        "godotengine",
        "unity",
        "opencv",
        "ffmpeg",
        "vlc",
        "obsproject",
        "raspberrypi",
        "arduino",
        "espressif",
        "homebrew",
      ];

      return usernames.map((username) => ({
        id: `github-${username}`,
        name: username,
        profileHref: `https://github.com/${username}`,
        avatarSrc: `https://avatars.githubusercontent.com/${username}` as string | undefined,
      }));
    },
    [],
  );

  const avatarItems = React.useMemo(
    () => [
      ...supporters.map((creator) => {
        const primaryLink = creator.profileLinks[0];
        return {
          id: creator.id,
          name: creator.name,
          profileHref: primaryLink?.href ?? "#",
          avatarSrc: creator.avatar as string | undefined,
        };
      }),
      ...githubSupporters,
    ],
    [supporters, githubSupporters],
  );

  // Не сортируем по местам — просто фиксированный список людей, которые помогают
  return (
    <Box as="section" aria-label="Поддержка сообщества AIFFA" bg="transparent">
      <VStack align="stretch" spacing={4}>
        <VStack align="center" spacing={4} textAlign="center">
          <HStack spacing={2} align="center" justify="center">
            <Box
              as="span"
              px={2.5}
              py={1.5}
              borderRadius="full"
              borderWidth="1px"
              borderColor={iconBorderColor}
              bg={iconBg}
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={FiHeart} boxSize={3.5} aria-hidden="true" color={iconColor} />
            </Box>
            <Heading as="h2" size="md" letterSpacing="-0.02em">
              Поддержка AIFFA
            </Heading>
          </HStack>
          <Text fontSize="sm" color={subtitleColor} maxW={{ base: "full", md: "640px" }}>
            Здесь — люди, благодаря которым AIFFA ощущается живым местом, а не просто платформой: они поддерживают в чатах,
            помогают с первыми шагами, делятся опытом и возвращают мотивацию, когда она теряется. Это не рейтинг, а тихое
            «спасибо» всем, кто вкладывается в сообщество сердцем и временем.
          </Text>
        </VStack>

        <Box w="full">
          <VStack spacing={3} align="center">
            <Wrap spacing={{ base: 3, md: 4 }} justify="center">
              {avatarItems.map((item) => {
                const href = item.profileHref;
                return (
                  <WrapItem key={item.id}>
                    <Box
                      as={Link}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      w={{ base: 10, md: 12 }}
                      h={{ base: 10, md: 12 }}
                      borderRadius="xl"
                      borderWidth="1px"
                      borderColor={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
                      bg={useColorModeValue("whiteAlpha.900", "whiteAlpha.100")}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      _hover={{
                        transform: "translateY(-1px)",
                        boxShadow: useColorModeValue("md", "md"),
                        borderColor: useColorModeValue("blue.400", "blue.300"),
                      }}
                    >
                      <Avatar
                        name={item.name}
                        src={item.avatarSrc}
                        boxSize={{ base: 8, md: 9 }}
                        borderRadius="lg"
                        bg={useColorModeValue("gray.100", "whiteAlpha.200")}
                      />
                    </Box>
                  </WrapItem>
                );
              })}
            </Wrap>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default SupportersSection;


