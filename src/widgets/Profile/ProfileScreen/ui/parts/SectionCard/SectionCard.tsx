import React from "react";
import { Box, HStack, Icon, Text } from "@chakra-ui/react";
import { useProfileScreenUiColors } from "../../../colors/useProfileScreenUiColors";
import type { SectionCardProps } from "./types";
import { useSectionCardColors } from "./colors";

export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  description,
  icon,
  actions,
  children,
}) => {
  const { muted: mutedColor } = useProfileScreenUiColors();
  const { glassBorder, glassBg, accent, headerIconBg } = useSectionCardColors();

  return (
    <Box
      borderWidth="1px"
      borderColor={glassBorder}
      borderRadius="24px"
      bg={glassBg}
      p={{ base: 4, md: 7 }}
      position="relative"
      overflow="hidden"
      boxShadow="none"
      transition="none"
      sx={{
        backdropFilter: "blur(12px) saturate(160%)",
        WebkitBackdropFilter: "blur(12px) saturate(160%)",
      }}
    >
      <Box position="relative">
        <HStack
          spacing={3}
          mb={2}
          align="center"
          justify="space-between"
          flexWrap="wrap"
          rowGap={2}
        >
          <HStack spacing={3} align="center">
            <Box
              aria-hidden="true"
              w="36px"
              h="36px"
              borderRadius="14px"
              bg={headerIconBg}
              display="flex"
              alignItems="center"
              justifyContent="center"
              color={accent}
              flexShrink={0}
            >
              <Icon as={icon} boxSize="18px" />
            </Box>
            <Text fontWeight="bold" fontSize={{ base: "lg", md: "xl" }}>
              {title}
            </Text>
          </HStack>

          {!!actions ? <Box>{actions}</Box> : null}
        </HStack>

        <Text color={mutedColor} mb={4}>
          {description}
        </Text>

        {children}
      </Box>
    </Box>
  );
};


