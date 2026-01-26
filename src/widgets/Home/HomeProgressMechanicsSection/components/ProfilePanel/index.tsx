import React from "react";
import { Box, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { FiCheckCircle } from "react-icons/fi";
import type { ProfilePanelProps } from "./types";

const ProfilePanel: React.FC<ProfilePanelProps> = ({
  overline,
  title,
  description,
  bullets,
  titleColor,
  textColor,
  accentLabel,
  tone,
}) => (
  <Stack spacing={3}>
    <Text fontSize="xs" fontWeight="bold" letterSpacing="0.16em" textTransform="uppercase" color={accentLabel}>
      {overline}
    </Text>
    <Text color={titleColor} fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" lineHeight="1.35">
      {title}
    </Text>
    <Text color={textColor} fontSize={{ base: "sm", md: "md" }} lineHeight="1.7">
      {description}
    </Text>

    <Stack spacing={2.5} pt={1} as="ul" m={0} p={0} listStyleType="none">
      {bullets.map((item) => (
        <HStack key={item.id} spacing={2} align="flex-start" as="li">
          <Box
            w="20px"
            h="20px"
            borderRadius="full"
            bg={tone[item.tone].bg}
            color={tone[item.tone].fg}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
            mt="2px"
          >
            <Icon as={FiCheckCircle} boxSize={3.5} aria-hidden="true" />
          </Box>
          <Text fontSize="sm" color={textColor}>
            <Box as="span" fontWeight="semibold" color={titleColor}>
              {item.title}
            </Box>{" "}
            — {item.text}
          </Text>
        </HStack>
      ))}
    </Stack>
  </Stack>
);

export default ProfilePanel;
