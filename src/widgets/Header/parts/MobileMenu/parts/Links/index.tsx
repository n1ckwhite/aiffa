import React from 'react';
import { Button, HStack, Icon, Text, Tooltip, VStack } from '@chakra-ui/react';
import type { MenuLinksProps } from './types';
import { FaBookOpen, FaHeart, FaNewspaper, FaBriefcase, FaTelegram } from 'react-icons/fa';
import { useDesktopActionsColors } from '../../../Header/parts/DesktopActions/colors/useDeskopActionsColors';
import { AppLink } from 'shared/ui/AppLink';

export const MenuLinks: React.FC<MenuLinksProps> = ({ hoverBg, onClose, onDonate }) => {
  const { fillIcon } = useDesktopActionsColors();
  return (
    <VStack gap={2} align="stretch">
      <Button variant="ghost" justifyContent="flex-start" _hover={{ bg: hoverBg }} px={1} py={2}>
        <AppLink to="/learn" onClick={onClose} display="block" w="100%" borderRadius="md" _hover={{ bg: hoverBg, textDecoration: 'none' }}>
          <HStack spacing={3} align="center">
            <Icon as={FaBookOpen} boxSize={4} aria-hidden="true" color={fillIcon} />
            <Text>Материалы</Text>
          </HStack>
        </AppLink>
      </Button>
      

      <Tooltip label="Поддержать проект" openDelay={250} hasArrow>
        <Button
          variant="ghost"
          justifyContent="flex-start"
          _hover={{ bg: hoverBg }}
          px={1}
          py={2}
          w="100%"
          onClick={() => { onDonate(); onClose(); }}
          aria-label="Поддержать проект"
        >
          <HStack spacing={3} align="center">
            <Icon as={FaHeart} boxSize={4} aria-hidden="true" color={fillIcon} />
            <Text>Поддержать проект</Text>
          </HStack>
        </Button>
      </Tooltip>
      <Button variant="ghost" justifyContent="flex-start" _hover={{ bg: hoverBg }} px={1} py={2}>
        <AppLink to="https://t.me/nickwhite_web" onClick={onClose} display="block" w="100%" borderRadius="md" _hover={{ bg: hoverBg, textDecoration: 'none' }}>
          <HStack spacing={3} align="center">
            <Icon as={FaTelegram} boxSize={4} aria-hidden="true" color={fillIcon} />
            <Text>Telegram</Text>
          </HStack>
        </AppLink>
      </Button>
      <Button variant="ghost" justifyContent="flex-start" _hover={{ bg: hoverBg }} px={1} py={2}>
        <AppLink to="https://career.habr.com/n1ckwhite" onClick={onClose} display="block" w="100%" borderRadius="md" _hover={{ bg: hoverBg, textDecoration: 'none' }}>
          <HStack spacing={3} align="center">
            <Icon as={FaBriefcase} boxSize={4} aria-hidden="true" color={fillIcon} />
            <Text>Хабр Карьера</Text>
          </HStack>
        </AppLink>
      </Button>
      <Button variant="ghost" justifyContent="flex-start" _hover={{ bg: hoverBg }} px={1} py={2}>
        <AppLink to="https://habr.com/ru/users/n1ckwhite/" onClick={onClose} display="block" w="100%" borderRadius="md" _hover={{ bg: hoverBg, textDecoration: 'none' }}>
          <HStack spacing={3} align="center">
            <Icon as={FaNewspaper} boxSize={4} aria-hidden="true" color={fillIcon} />
            <Text>Статьи на Хабре</Text>
          </HStack>
        </AppLink>
      </Button>
    </VStack>
  );
};



