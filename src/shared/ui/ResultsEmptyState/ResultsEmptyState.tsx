import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import { QuestioningLottieIcon } from "@/shared/icons/components-icon";
import { useAppColors } from "@/shared/theme/colors";
import { ResultsEmptyStateProps } from "./types";

export const ResultsEmptyState: React.FC<ResultsEmptyStateProps> = ({
  colors,
  query = "",
  variant = "search",
  allItemsLabel = "результаты",
}) => {
  const theme = colors ?? useAppColors();
  const safeQuery = query.trim();

  if (variant === "favoritesEmpty") {
    return (
      <Box w="full" textAlign="center" mt={0} role="status" aria-live="polite">
        <VStack spacing={2} maxW="560px" mx="auto">
          <Box
            w="full"
            opacity={0.95}
            transform="scale(0.82)"
            transformOrigin="top center"
            mt={{ base: -2, md: -3 }}
            height="150px"
          >
            <QuestioningLottieIcon />
          </Box>
          <Text fontWeight="semibold" color={theme.titleColor} fontSize={{ base: "lg", md: "xl" }}>
            В избранном пока пусто
          </Text>
          <Text color={theme.descColor} fontSize="sm">
            Откройте статью и нажмите «Сохранить» — она появится здесь.
          </Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box w="full" textAlign="center" mt={0} role="status" aria-live="polite">
      <VStack spacing={2} maxW="560px" mx="auto">
        <Box
          w="full"
          opacity={0.95}
          transform="scale(0.82)"
          transformOrigin="top center"
          mt={{ base: -2, md: -3 }}
          height="150px"
        >
          <QuestioningLottieIcon />
        </Box>
        <Text fontWeight="semibold" color={theme.titleColor} fontSize={{ base: "lg", md: "xl" }}>
          {variant === "favoritesSearch" ? "В избранном ничего не нашли" : "Ничего не нашли"}
        </Text>
        <Text color={theme.descColor}>
          По запросу:{" "}
          <Text as="span" fontWeight="semibold" color={theme.blue.accent}>
            {safeQuery || "—"}
          </Text>
        </Text>
        <Text color={theme.descColor} fontSize="sm">
          Попробуйте изменить запрос или очистить поиск — мы покажем все {allItemsLabel}.
        </Text>
      </VStack>
    </Box>
  );
};


