import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import PillBadge from "shared/ui/PillBadge";
import { usePartnersColors } from "widgets/Partners/colors/usePartnersColors";

const EarlyAccessSection: React.FC = () => {
  const { mutedTextColor } = usePartnersColors();

  return (
    <Box as="section" aria-label="Ранний запуск партнёрства">
      <VStack align="center" spacing={{ base: 2, md: 3 }} w="full">
        <PillBadge colorScheme="orange" variant="outline" uppercase={false}>
          Ранний запуск
        </PillBadge>
        <Text
          fontSize="xs"
          color={mutedTextColor}
          textAlign="center"
          maxW={{ base: "100%", md: "640px" }}
        >
          Сейчас мы открываем первые места для компаний, которые хотят попробовать форматы раньше остальных.
          У первых партнёров — индивидуальные условия и сопровождение.
        </Text>
      </VStack>
    </Box>
  );
};

export default EarlyAccessSection;


