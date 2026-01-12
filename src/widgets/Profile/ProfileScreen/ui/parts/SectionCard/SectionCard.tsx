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
  const { accent, headerIconBg } = useSectionCardColors();
  const headerId = React.useId();
  const descriptionId = React.useId();

  let actionsBlock: React.ReactNode = null;
  if (actions) actionsBlock = <Box>{actions}</Box>;

  return (
    <Box
      as="section"
      aria-labelledby={headerId}
      aria-describedby={descriptionId}
      borderWidth="0px"
      borderRadius="24px"
      bg="transparent"
      p={{ base: 4, md: 7 }}
      position="relative"
      overflow="hidden"
      boxShadow="none"
      transition="none"
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
            <Text as="h2" id={headerId} fontWeight="bold" fontSize={{ base: "lg", md: "xl" }}>
              {title}
            </Text>
          </HStack>

          {actionsBlock}
        </HStack>

        <Text as="p" id={descriptionId} color={mutedColor} mb={4}>
          {description}
        </Text>

        {children}
      </Box>
    </Box>
  );
};


