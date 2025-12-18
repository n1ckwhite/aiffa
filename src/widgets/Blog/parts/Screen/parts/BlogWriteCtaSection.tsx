import React from "react";
import { Box, HStack, Heading, Icon, Text, VStack } from "@chakra-ui/react";
import { FiEdit3 } from "react-icons/fi";
import type { useAppColors } from "@/shared/theme/colors";

export type BlogWriteCtaSectionProps = {
  theme: ReturnType<typeof useAppColors>;
  cardRadius: string;

  writeCtaBorderColor: string;
  writeCtaBoxShadow: string;
  writeCtaBgGradient: string;
  writeCtaIconBg: string;
  writeCtaIconBorderColor: string;
};

export const BlogWriteCtaSection: React.FC<BlogWriteCtaSectionProps> = ({
  theme,
  cardRadius,
  writeCtaBorderColor,
  writeCtaBoxShadow,
  writeCtaBgGradient,
  writeCtaIconBg,
  writeCtaIconBorderColor,
}) => {
  return (
    <Box
      as="section"
      aria-labelledby="blog-write-cta-title"
      mt={{ base: 8, md: 10 }}
      w="full"
      maxW={{ base: "100%", md: "900px" }}
      mx="auto"
      borderWidth="1px"
      borderColor={writeCtaBorderColor}
      borderRadius={cardRadius}
      boxShadow={writeCtaBoxShadow}
      p={{ base: 5, md: 6 }}
      position="relative"
      overflow="hidden"
      bgGradient={writeCtaBgGradient}
      _before={{
        content: '""',
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: "5px",
        bg: theme.blue.accent,
        opacity: 0.9,
        pointerEvents: "none",
      }}
      _after={{
        content: '""',
        position: "absolute",
        inset: 0,
        bg: `radial-gradient(800px 320px at 10% 0%, ${theme.blue.accent}18, transparent 55%)`,
        pointerEvents: "none",
      }}
    >
      <HStack align={{ base: "start", md: "center" }} spacing={4} position="relative">
        <Box
          boxSize={{ base: "46px", md: "52px" }}
          borderRadius="full"
          bg={writeCtaIconBg}
          borderWidth="1px"
          borderColor={writeCtaIconBorderColor}
          display="flex"
          alignItems="center"
          justifyContent="center"
          color={theme.blue.accent}
          flexShrink={0}
          mt={{ base: 0.5, md: 0 }}
        >
          <Icon as={FiEdit3} aria-hidden="true" boxSize={6} />
        </Box>

        <VStack align="start" spacing={1} textAlign="left" minW={0}>
          <Heading
            id="blog-write-cta-title"
            color={theme.titleColor}
            as="h2"
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="bold"
            letterSpacing="-0.01em"
          >
            Хочешь стать автором в AIFFA?
          </Heading>
          <Text color={theme.descColor} fontSize={{ base: "sm", md: "md" }}>
            Поделись практикой: кейс, ошибка, разбор решения или полезная находка. Черновик или план отправь через блок «Поддержка и
            сообщество» ниже — поможем оформить и опубликовать.
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};


