import React from "react";
import { Box, Heading, HStack, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { detailCardGlow, iconIdleFloat } from "@/widgets/Sessions/animations";
import type { EventDetailCardProps, EventDetailCardUiProps } from "../../types";

const EventDetailCard: React.FC<EventDetailCardProps & EventDetailCardUiProps> = ({
  icon,
  title,
  description,
  mutedTextColor,
  eventBlockBg,
  eventBlockBorderColor,
  iconCircleBg,
  iconColor,
  highlightBorderColor,
}) => {
  const beforeStyles = useColorModeValue(
    {
      bg: "transparent",
    },
    {
      bgGradient:
        "linear-gradient(135deg, rgba(45, 212, 191, 0.16), rgba(56, 189, 248, 0.14))",
      backgroundSize: "180% 180%",
      opacity: 0.8,
      animation: `${detailCardGlow} 18s ease-in-out infinite`,
    }
  );

  return (
    <Box
      borderRadius="2xl"
      borderWidth="1px"
      borderColor={eventBlockBorderColor}
      bg={eventBlockBg}
      p={{ base: 3, md: 4 }}
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        ...beforeStyles,
      }}
      boxShadow="sm"
      transition="background 0.2s ease, transform 0.15s ease, box-shadow 0.15s ease, border-color 0.2s ease"
      _hover={{
        borderColor: highlightBorderColor,
        boxShadow: "lg",
        transform: "translateY(-2px)",
      }}
    >
      <Stack spacing={2} position="relative" zIndex={1}>
        <HStack spacing={3} align="center">
          <Box
            borderRadius="full"
            boxSize={8}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg={iconCircleBg}
            color={iconColor}
            aria-hidden="true"
            animation={`${iconIdleFloat} 5s ease-in-out infinite`}
            transition="transform 0.18s ease, box-shadow 0.18s ease"
            _hover={{
              transform: "translateY(-1px) scale(1.05)",
              boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.45)",
            }}
          >
            {icon}
          </Box>
          <Heading as="h3" fontSize={{ base: "md", md: "lg" }}>
            {title}
          </Heading>
        </HStack>
        <Text fontSize={{ base: "sm", md: "sm" }} color={mutedTextColor}>
          {description}
        </Text>
      </Stack>
    </Box>
  );
};

export default EventDetailCard;


