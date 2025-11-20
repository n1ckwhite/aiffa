import React from 'react';
import { Box, VStack, SimpleGrid, Skeleton, SkeletonText, Text } from '@chakra-ui/react';
import { useAppColors } from 'shared/theme/colors';

const ModulesPageSkeleton: React.FC = () => {
  const { titleColor } = useAppColors();
  return (
    <Box as="main" pb="32px">
      <Box maxW="1200px" mx="auto" px={{ base: 4, md: 6 }}>
        <VStack spacing={{ base: 6, md: 8 }} align="stretch">
          <VStack spacing={3} align="center" textAlign="center" py={{ base: 5, md: 6 }}>
            <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold" color={titleColor}>
              Материалы для разработчиков
            </Text>
            <SkeletonText noOfLines={2} spacing="4" skeletonHeight="14px" width={{ base: '92%', md: '70%' }} />
          </VStack>
          <Box display="flex" justifyContent="center">
            <Skeleton
              height={{ base: '44px', md: '52px' }}
              width={{ base: '360px', sm: '420px', md: '560px' }}
              borderRadius="full"
            />
          </Box>
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={{ base: 5, md: 7, lg: 8 }} mt={{ base: 2, md: 3 }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} height={{ base: '200px', sm: '220px', md: '240px' }} borderRadius="2xl" />
            ))}
          </SimpleGrid>
        </VStack>
      </Box>
    </Box>
  );
};

export default ModulesPageSkeleton;


