import React from "react";
import { Avatar, Box, Heading, HStack, Icon, Link, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { FiHeart } from "react-icons/fi";
import { useCreatorsData } from "../../hooks/useCreatorsData";
import { Creator } from "@/widgets/Creators/model/types";
import { githubSupporters } from "./data/githubSupporters";
import { useSupportersColors } from "./colors/useSupportersColors";
import { getSupporters } from "./helpers/getSupporters";
import { getAvatarItems } from "./helpers/getAvatarItems";
import type { SupporterAvatar } from "./types";

const headingId = "creators-supporters-heading";

const SupportersSection: React.FC = () => {
  const { items } = useCreatorsData();
  const {
    subtitleColor,
    iconBorderColor,
    iconBg,
    iconColor,
    avatarBorderColor,
    avatarBg,
    avatarFallbackBg,
    avatarHoverBorder,
    avatarHoverShadow,
  } = useSupportersColors();

  const supporters = React.useMemo(() => getSupporters(items as Creator[]), [items]);

  if (supporters.length === 0) {
    return null;
  }

  const avatarItems = React.useMemo<SupporterAvatar[]>(() => getAvatarItems(supporters, githubSupporters), [supporters]);

  return (
    <Box as="section" aria-labelledby={headingId} bg="transparent">
      <VStack align="stretch" spacing={4}>
        <VStack align="center" spacing={3} textAlign="center">
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
            <Heading as="h2" id={headingId} size="md" letterSpacing="-0.02em">
              Поддержка AIFFA
            </Heading>
          </HStack>
          <Text fontSize="md" color={subtitleColor} maxW={{ base: "full", md: "640px" }}>
            Здесь — люди, благодаря которым AIFFA ощущается живым местом, а не просто платформой: они поддерживают в чатах, помогают с первыми шагами,
            делятся опытом и возвращают мотивацию, когда она теряется. Это не рейтинг, а тихое «спасибо» всем, кто вкладывается в сообщество сердцем и
            временем.
          </Text>
        </VStack>

        <Box w="full">
          <VStack spacing={3} align="center">
            <SimpleGrid
              as="ul"
              listStyleType="none"
              m={0}
              p={0}
              w="full"
              minChildWidth={{ base: "64px", md: "80px" }}
              spacing={{ base: 3, md: 4 }}
              justifyItems="center"
            >
              {avatarItems.map((item) => {
                const href = item.profileHref;
                return (
                  <Box as="li" key={item.id} minW={0} w="full" display="flex" justifyContent="center">
                    <Box
                      as={Link}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      w={{ base: 10, md: 12 }}
                      h={{ base: 10, md: 12 }}
                      borderRadius="xl"
                      borderWidth="1px"
                      borderColor={avatarBorderColor}
                      bg={avatarBg}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      _hover={{
                        transform: "translateY(-1px)",
                        boxShadow: avatarHoverShadow,
                        borderColor: avatarHoverBorder,
                      }}
                    >
                      <Avatar name={item.name} src={item.avatarSrc} boxSize={{ base: 8, md: 9 }} borderRadius="lg" bg={avatarFallbackBg} />
                    </Box>
                  </Box>
                );
              })}
            </SimpleGrid>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default SupportersSection;


