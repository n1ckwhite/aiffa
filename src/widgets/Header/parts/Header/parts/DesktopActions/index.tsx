import React from 'react';
import { HStack, Text, Tooltip, Icon, Box } from '@chakra-ui/react';
import { FaBookOpen, FaHeart } from 'react-icons/fa';
import { AppLink } from '@/shared/ui/AppLink';
import ThemeToggleButton from '../../../ThemeToggleButton';
import type { DesktopActionsProps } from './types';
import { useDesktopActionsColors } from './colors/useDeskopActionsColors';

export const DesktopActions: React.FC<DesktopActionsProps> = ({
  hoverBg,
  onDonate,
  setIsMobileMenuOpen,
}) => {
  const { fillIcon } = useDesktopActionsColors();

  return (
    <HStack gap={{ base: 1, md: 1, xl: 2 }}>
      <Tooltip label="Материалы" openDelay={250} hasArrow>
        <AppLink
          to="/learn"
          aria-label="Материалы"
          onClick={() => { setIsMobileMenuOpen(false); }}
          _hover={{ bg: hoverBg }}
          px={2}
          py={1.5}
          borderRadius="md"
          display="inline-flex"
          alignItems="center"
        >
          <Icon as={FaBookOpen} boxSize={4} aria-hidden="true" color={fillIcon} />
          <Text
            ml={2}
            display="inline"
            fontSize="sm"
            fontWeight="semibold"
          >
            Материалы
          </Text>
        </AppLink>
      </Tooltip>

      <Tooltip label="Поддержать проект" openDelay={250} hasArrow>
        <Box
          as="button"
          type="button"
          onClick={onDonate}
          aria-label="Поддержать проект"
          _hover={{ bg: hoverBg }}
          px={2}
          py={1.5}
          borderRadius="md"
          display="inline-flex"
          alignItems="center"
          fontSize="sm"
          fontWeight="semibold"
        >
          <Icon as={FaHeart} boxSize={4} aria-hidden="true" color={fillIcon} />
          <Text ml={2} display="inline">
            Поддержать
          </Text>
        </Box>
      </Tooltip>

      <ThemeToggleButton />
    </HStack>
  );
};



