import React from "react";
import { Box, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { FaChartLine, FaLayerGroup, FaUsers } from "react-icons/fa";
import { BusinessAnatyticsIcon } from "@/shared/icons/components-icon";
import type { FeaturePanelProps } from "./types";

const iconMap = [FaLayerGroup, FaChartLine, FaUsers];

const FeaturePanel: React.FC<FeaturePanelProps> = ({
  title,
  quote,
  bullets,
  titleColor,
  textColor,
  labelColor,
  quoteMarkColor,
}) => (
  <Stack direction={{ base: "column", lg: "row" }} spacing={{ base: 5, md: 7 }} align="stretch">
    <Stack spacing={0} flex="1 1 0" minW={0} h="full" justify="space-between" align="stretch">
      <Stack spacing={4} w="full">
        <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" color={titleColor}>
          {title}
        </Text>
        <Text
          as="blockquote"
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="semibold"
          color={titleColor}
          lineHeight="1.35"
          letterSpacing="-0.02em"
          position="relative"
          pl={{ base: 7, md: 8 }}
          _before={{
            content: '"“"',
            position: "absolute",
            left: 0,
            top: { base: -3, md: -4 },
            fontSize: { base: "52px", md: "72px" },
            lineHeight: "1",
            color: quoteMarkColor,
            pointerEvents: "none",
          }}
          maxW="none"
        >
          {quote}
        </Text>
      </Stack>

      <Box pt={{ base: 5, md: 6 }} w="full">
        <Stack spacing={2}>
          {bullets.map((text, index) => {
            const IconComponent = iconMap[index];
            return (
              <HStack spacing={2} align="flex-start" key={text}>
                {IconComponent ? <Icon as={IconComponent} boxSize={4} aria-hidden="true" color={labelColor} mt="2px" /> : null}
                <Text fontSize="sm" color={textColor} lineHeight="1.6">
                  {text}
                </Text>
              </HStack>
            );
          })}
        </Stack>
      </Box>
    </Stack>

    <Box
      flex="0 0 auto"
      w={{ base: "100%", lg: "420px" }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      aria-hidden="true"
      pointerEvents="none"
    >
      <Box
        w="full"
        maxW={{ base: "320px", md: "420px" }}
        mx="auto"
        sx={{
          "& svg, & canvas": {
            width: "100% !important",
            height: "auto !important",
          },
        }}
      >
        <BusinessAnatyticsIcon />
      </Box>
    </Box>
  </Stack>
);

export default FeaturePanel;
