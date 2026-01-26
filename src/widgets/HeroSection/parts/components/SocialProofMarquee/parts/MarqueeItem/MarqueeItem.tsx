import React from "react";
import { Box, HStack, Icon, Text } from "@chakra-ui/react";
import { MarqueeItemProps } from "./types";

const MarqueeItem: React.FC<MarqueeItemProps> = ({ item, colors }) => (
  <HStack spacing={{ base: 1.5, md: 2 }} flex="0 0 auto">
    <Icon as={item.icon} boxSize={4} aria-hidden="true" color={colors.dot} />
    <Text
      as="span"
      fontSize={{ base: "xs", md: "sm" }}
      color={colors.text}
      whiteSpace={{ base: "normal", md: "nowrap" }}
      textAlign={{ base: "center", md: "left" }}
    >
      <Box as="span" fontWeight="bold" color={colors.strong}>
        {item.value}
      </Box>{" "}
      <Box as="span" fontWeight="medium" color={colors.text}>
        {item.label}
      </Box>
    </Text>
  </HStack>
);

export default MarqueeItem;
