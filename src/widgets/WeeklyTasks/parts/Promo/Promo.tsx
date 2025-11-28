import React from 'react';
import { Box, VStack, Text } from '@chakra-ui/react';
import type { WeeklyTasksPromoProps } from './types';
import { usePromoColors } from './colors/usePromoColors';
import { PromoHeading, PromoAuthors, PromoCTA } from './parts';

const Promo: React.FC<WeeklyTasksPromoProps> = () => {
  const { promoBorderColor, promoBgGradient, promoBoxShadow, textColor } = usePromoColors();
  return (
    <Box
      borderWidth="1px"
      borderColor={promoBorderColor}
      borderRadius="2xl"
      p={{ base: 5, md: 6 }}
      maxW="980px"
      w="100%"
      mx="auto"
      mt={{ base: 3, md: 4 }}
      bgGradient={promoBgGradient}
      boxShadow={promoBoxShadow}
    >
      <VStack spacing={{ base: 4, md: 5 }}>
        <PromoHeading />
        <Text fontSize={{ base: 'sm', md: 'md' }} color={textColor} textAlign="center" lineHeight={1.8}>
          Вдохновляй других и прокачивайся быстрее: придумай задачу недели, предложи улучшение или помоги участнику —
          каждый вклад делает платформу сильнее.
        </Text>
        <PromoAuthors />
        <PromoCTA />
      </VStack>
    </Box>
  );
};

export default Promo;


