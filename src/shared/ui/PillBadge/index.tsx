import React from "react";
import { HStack, Icon, Text } from "@chakra-ui/react";
import { usePillBadgeColors } from "./colors/usePillBadgeColors";
import type { PillBadgeProps } from "./types";

const PillBadge: React.FC<PillBadgeProps> = ({
  colorScheme = "blue",
  icon,
  children,
  uppercase = true,
  variant = "outline",
}) => {
  const palette = usePillBadgeColors(colorScheme, variant);
  const label =
    uppercase && typeof children === "string"
      ? children.toUpperCase()
      : children;

  return (
    <HStack
      as="span"
      borderRadius="full"
      px={2.5}
      py={0.5}
      spacing={1}
      fontSize="xs"
      borderWidth="1px"
      borderColor={palette.border}
      bg={palette.bg}
      color={palette.color}
      alignItems="center"
      display="inline-flex"
    >
      {icon && <Icon as={icon} boxSize={3} />}
      {typeof label === "string" ? (
        <Text as="span" fontWeight="semibold">
          {label}
        </Text>
      ) : (
        label
      )}
    </HStack>
  );
};

export default PillBadge;


