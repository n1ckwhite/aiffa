import React from 'react';
import { Box, Button, HStack, Icon, Link, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import type { MenuLinksProps } from './types';
import { FaBookOpen, FaClipboardList, FaCode, FaUserCircle, FaComments, FaUserFriends, FaFeatherAlt } from 'react-icons/fa';
import { FaHandshake } from 'react-icons/fa6';
import { useDesktopActionsColors } from '../../../Header/parts/DesktopActions/colors/useDeskopActionsColors';

export const MenuLinks: React.FC<MenuLinksProps> = ({ hoverBg, onClose, donateBg, donateHoverBg, onDonate }) => {
  const { fillIcon } = useDesktopActionsColors()
  return (
    <VStack gap={2} align="stretch">
      <Button variant="ghost" justifyContent="flex-start" _hover={{ bg: hoverBg }} px={1} py={2}>
        <Link as={RouterLink as any} to="/learn" onClick={onClose} display="block" w="100%" px={1} py={2} borderRadius="md" _hover={{ bg: hoverBg, textDecoration: 'none' }}>
          <HStack spacing={3} align="center">
            <Icon as={FaBookOpen} boxSize={4} aria-hidden="true" color={fillIcon} />
            <Text>Материалы</Text>
          </HStack>
        </Link>
      </Button>

      <Button variant="ghost" justifyContent="flex-start" _hover={{ bg: hoverBg }} px={1} py={2}>
        <Link as={RouterLink as any} to="/blog" onClick={onClose} display="block" w="100%" px={1} py={2} borderRadius="md" _hover={{ bg: hoverBg, textDecoration: 'none' }}>
          <HStack spacing={3} align="center">
            <Icon as={FaFeatherAlt} boxSize={4} aria-hidden="true" color={fillIcon} />
            <Text>Блог</Text>
          </HStack>
        </Link>
      </Button>

      <Button variant="ghost" justifyContent="flex-start" _hover={{ bg: hoverBg }} px={1} py={2}>
        <Link as={RouterLink as any} to="/weekly" onClick={onClose} display="block" w="100%" px={1} py={2} borderRadius="md" _hover={{ bg: hoverBg, textDecoration: 'none' }}>
          <HStack spacing={3} align="center">
            <Icon as={FaClipboardList} boxSize={4} aria-hidden="true" color={fillIcon} />
            <Text>Задачи</Text>
          </HStack>
        </Link>
      </Button>

      <Button variant="ghost" justifyContent="flex-start" _hover={{ bg: hoverBg }} px={1} py={2}>
        <Link as={RouterLink as any} to="/hackathons" onClick={onClose} display="block" w="100%" px={1} py={2} borderRadius="md" _hover={{ bg: hoverBg, textDecoration: 'none' }}>
          <HStack spacing={3} align="center">
            <Icon as={FaCode} boxSize={4} aria-hidden="true" color={fillIcon} />
            <Text>Хакатоны</Text>
          </HStack>
        </Link>
      </Button>

      <Button variant="ghost" justifyContent="flex-start" _hover={{ bg: hoverBg }} px={1} py={2}>
        <Link as={RouterLink as any} to="/sessions" onClick={onClose} display="block" w="100%" px={1} py={2} borderRadius="md" _hover={{ bg: hoverBg, textDecoration: 'none' }}>
          <HStack spacing={3} align="center">
            <Icon as={FaComments} boxSize={4} aria-hidden="true" color={fillIcon} />
            <Text>Сессии</Text>
          </HStack>
        </Link>
      </Button>

      <Button variant="ghost" justifyContent="flex-start" _hover={{ bg: hoverBg }} px={1} py={2}>
        <Link as={RouterLink as any} to="/creators" onClick={onClose} display="block" w="100%" px={1} py={2} borderRadius="md" _hover={{ bg: hoverBg, textDecoration: 'none' }}>
          <HStack spacing={3} align="center">
            <Icon as={FaUserFriends} boxSize={4} aria-hidden="true" color={fillIcon} />
            <Text>Создатели</Text>
          </HStack>
        </Link>
      </Button>

      <Button variant="ghost" justifyContent="flex-start" _hover={{ bg: hoverBg }} px={1} py={2}>
        <Link as={RouterLink as any} to="/profile" onClick={onClose} display="block" w="100%" px={1} py={2} borderRadius="md" _hover={{ bg: hoverBg, textDecoration: 'none' }}>
          <HStack spacing={3} align="center">
            <Icon as={FaUserCircle} boxSize={4} aria-hidden="true" color={fillIcon} />
            <Text>Профиль</Text>
          </HStack>
        </Link>
      </Button>

      <Button variant="ghost" justifyContent="flex-start" _hover={{ bg: hoverBg }} px={1} py={2}>
        <Link as={RouterLink as any} to="/partners" onClick={onClose} display="block" w="100%" px={1} py={2} borderRadius="md" _hover={{ bg: hoverBg, textDecoration: 'none' }}>
          <HStack spacing={3} align="center">
            <Icon as={FaHandshake} boxSize={4} aria-hidden="true" color={fillIcon} />
            <Text>Партнёрство</Text>
          </HStack>
        </Link>
      </Button>
      
      <Button variant="ghost" justifyContent="center" bg={donateBg} color="white" onClick={async () => { await onDonate(); onClose(); }} _hover={{ bg: donateHoverBg, transform: "translateY(-1px)", boxShadow: "0 4px 12px rgba(59, 130, 246, 0.4)" }} _active={{ transform: "translateY(0px)", boxShadow: "0 2px 6px rgba(59, 130, 246, 0.3)" }} borderRadius="full" px={4} transition="all 0.2s ease-in-out">
        <Box as="svg" w="16px" h="16px" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </Box>
        <Text ml={2} fontWeight="semibold">Поддержать</Text>
      </Button>
    </VStack>
  );
};



