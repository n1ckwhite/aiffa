import React from 'react';
import { Box, VStack, HStack, Heading } from '@chakra-ui/react';
import { useAppColors } from 'shared/theme/colors';

const WeeklyTaskDetailSkeleton: React.FC = () => {
  const theme = useAppColors();
  const bg = theme.controlsBg;
  const border = theme.borderColor;
  const faint = theme.cardHoverBg;
  return (
    <Box w="100%" maxW={{ base: '100%', md: '1100px', lg: '1280px' }} mx="auto" px={{ base: 4, md: 6 }} py={{ base: 8, md: 10 }}>
      {/* Back button placeholder */}
      <Box h="36px" w="180px" borderRadius="full" bg={bg} mb={4} />

      <Box borderWidth={0} borderColor={border} borderRadius="xl" p={{ base: 0, md: 0 }}>
        {/* Tag / status */}
        <HStack spacing={3} mb={2} align="center">
          <Box h="20px" w="70px" borderRadius="full" bg={bg} />
          <Box h="20px" w="90px" borderRadius="full" bg={bg} />
        </HStack>

        {/* Title */}
        <Heading size="lg" mb={3}>
          <Box h="24px" w="60%" borderRadius="md" bg={bg} />
        </Heading>
        {/* Description */}
        <Box h="12px" w="80%" mb={3} borderRadius="md" bg={bg} />

        {/* Author row */}
        <HStack spacing={3} mb={3}>
          <Box w="20px" h="20px" borderRadius="full" bg={bg} />
          <Box h="12px" w="160px" borderRadius="md" bg={bg} />
        </HStack>
        {/* Author note */}
        <Box role="note" aria-label="Совет автора" bg={faint} borderWidth="1px" borderColor={border} borderRadius="lg" p={3} mb={3}>
          <Box h="10px" w="80%" borderRadius="md" bg={bg} />
        </Box>

        {/* Example code block placeholder */}
        <Box h="120px" borderWidth="1px" borderColor={border} borderRadius="md" bg={faint} mb={3} />

        <VStack align="stretch" spacing={3}>
          <Box h="14px" w="120px" borderRadius="md" bg={bg} />
          {/* macOS-like code editor window */}
          <Box borderWidth="1px" borderColor={border} borderRadius="lg" overflow="hidden" position="relative">
            <HStack spacing={2} p={2} borderBottomWidth="1px" borderColor={border} bg={faint}>
              <Box w="12px" h="12px" borderRadius="full" bg="#ff5f56" />
              <Box w="12px" h="12px" borderRadius="full" bg="#ffbd2e" />
              <Box w="12px" h="12px" borderRadius="full" bg="#27c93f" />
            </HStack>
            <Box bg={bg} h={{ base: '200px', md: '280px' }} />
            {/* Start button placeholder */}
            <Box position="absolute" inset={0} display="flex" alignItems="center" justifyContent="center">
              <Box h="40px" w="160px" borderRadius="full" bg={bg} />
            </Box>
          </Box>
          {/* Buttons row */}
          <HStack spacing={3} flexWrap="wrap">
            <Box h="36px" w="120px" borderRadius="md" bg={bg} />
            <Box h="36px" w="140px" borderRadius="md" bg={bg} />
            <Box h="36px" w="120px" borderRadius="md" bg={bg} />
          </HStack>
        </VStack>

        {/* Support block placeholder */}
        <Box mt={6} borderWidth="1px" borderColor={border} borderRadius="2xl" p={{ base: 4, md: 5 }} bg={faint}>
          <Box h="16px" w="50%" borderRadius="md" bg={bg} mb={2} />
          <Box h="10px" w="90%" borderRadius="md" bg={bg} mb={1} />
          <Box h="10px" w="80%" borderRadius="md" bg={bg} mb={3} />
          <HStack spacing={3}>
            <Box h="36px" w="180px" borderRadius="full" bg={bg} />
            <Box h="36px" w="200px" borderRadius="full" bg={bg} />
            <Box h="36px" w="140px" borderRadius="full" bg={bg} />
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};

export default WeeklyTaskDetailSkeleton;


