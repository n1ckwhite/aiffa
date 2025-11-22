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
        {/* Десктопная кнопка "К уроку" */}
        <Button
          as={RouterLink}
          to={`/learn/${moduleId}/${lessonId}`}
          size="sm"
          variant="outline"
          colorScheme="blue"
          leftIcon={<ChevronLeftIcon />}
          borderRadius="full"
          px={4}
          display={{ base: "none", md: "inline-flex" }}
          borderColor={colors.backBtnHoverBg}
          bg="transparent"
          _hover={{ bg: colors.backBtnHoverBg, transform: "translateY(-1px)" }}
          _active={{ bg: colors.backBtnActiveBg }}
        >
          К материалу
        </Button>
      </HStack>
      <Button
        as={RouterLink}
        to={`/learn/${moduleId}/${lessonId}`}
        size="md"
        variant="outline"
        colorScheme="blue"
        leftIcon={<ChevronLeftIcon />}
        borderRadius="full"
        px={5}
        py={2}
        fontWeight="bold"
        w="auto"
        maxWidth="220px"
        mb={3}
        display={{ base: "flex", md: "none" }}
        justifyContent="center"
        borderColor={colors.backBtnHoverBg}
        bg="transparent"
        _hover={{ bg: colors.backBtnHoverBg }}
        _active={{ bg: colors.backBtnActiveBg }}
      >
        К материалу
      </Button>
    </>
  );
};


