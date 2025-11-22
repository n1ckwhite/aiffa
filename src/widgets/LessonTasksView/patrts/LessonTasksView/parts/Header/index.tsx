import React from 'react';
import { Box, Button, Heading, HStack } from '@chakra-ui/react';
import { ChevronLeftIcon, EditIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import type { TasksHeaderProps } from './types';

export const TasksHeader: React.FC<TasksHeaderProps> = ({
  hasTasks,
  solvedCount,
  total,
  colors,
  moduleId,
  lessonId
}) => {
  const isZero = solvedCount === 0;
  const isPartial = solvedCount > 0 && solvedCount < total;
  const chipBg = isZero ? colors.chipBgRed : isPartial ? colors.chipBgYellow : colors.chipBgGreen;
  const chipText = isZero ? colors.chipTextRed : isPartial ? colors.chipTextYellow : colors.chipTextGreen;
  return (
    <>
      <HStack
        justify="space-between"
        align="center"
        spacing={{ base: 2, md: 3 }}
        mb={4}
        mt={4}
      >
        <HStack spacing={3} align="center">
          <Box
            w={{ base: "44px", md: "56px" }}
            h={{ base: "44px", md: "56px" }}
            borderRadius="xl"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg={colors.editIconBg}
            color={colors.accent}
            boxShadow="none"
          >
            <EditIcon boxSize={{ base: 5, md: 6 }} />
          </Box>
          <Heading as="h1" size="xl" letterSpacing="-0.02em">
            Задачи
          </Heading>
          {hasTasks && (
            <Box
              px={3}
              py={1}
              borderRadius="full"
              bg={chipBg}
              color={chipText}
              fontSize="sm"
              fontWeight="semibold"
              lineHeight={1}
            >
              {solvedCount}/{total}
            </Box>
          )}
        </HStack>
        {/* Десктопная кнопка "К материалу" — стили как у "К задачам недели" */}
        <Button
          as={RouterLink}
          to={`/learn/${moduleId}/${lessonId}`}
          variant="outline"
          colorScheme="blue"
          mt={2}
          mb={4}
          leftIcon={<ChevronLeftIcon />}
          borderRadius="full"
          px={5}
          py={2}
          fontWeight="bold"
          alignSelf="flex-start"
          transition="background-color 0.15s ease, transform 0.1s ease"
          display={{ base: "none", md: "inline-flex" }}
        >
          К материалу
        </Button>
      </HStack>
      <Button
        as={RouterLink}
        to={`/learn/${moduleId}/${lessonId}`}
        variant="outline"
        colorScheme="blue"
        leftIcon={<ChevronLeftIcon />}
        borderRadius="full"
        px={5}
        py={2}
        fontWeight="bold"
        mt={2}
        mb={4}
        display={{ base: "flex", md: "none" }}
        alignSelf="flex-start"
        transition="background-color 0.15s ease, transform 0.1s ease"
      >
        К материалу
      </Button>
    </>
  );
};


