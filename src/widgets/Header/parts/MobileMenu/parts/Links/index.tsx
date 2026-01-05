import React from 'react';
import { Avatar, Button, HStack, Icon, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import type { MenuLinksProps } from './types';
import { FaBookOpen, FaClipboardList, FaCode, FaUserCircle, FaComments, FaUserFriends, FaFeatherAlt } from 'react-icons/fa';
import { FaHandshake } from 'react-icons/fa6';
import { useDesktopActionsColors } from '../../../Header/parts/DesktopActions/colors/useDeskopActionsColors';
import { useUserProfile } from 'entities/user';
import { AppLink } from 'shared/ui/AppLink';
import { withGithubAvatarSize } from '@/shared/lib/github/withGithubAvatarSize';
import { FiLogOut } from 'react-icons/fi';

export const MenuLinks: React.FC<MenuLinksProps> = ({ hoverBg, onClose, donateBg, donateHoverBg, onDonate }) => {
  const { fillIcon } = useDesktopActionsColors();
  const avatarBorderColor = useColorModeValue('blackAlpha.200', 'whiteAlpha.200');
  const avatarBg = useColorModeValue('whiteAlpha.900', 'whiteAlpha.200');
  const { profile } = useUserProfile();
  const githubAvatarUrl = withGithubAvatarSize(
    profile.avatarUrl || (profile.githubUsername ? `https://github.com/${profile.githubUsername}.png` : ''),
    96
  );
  const hasGithubConnected = Boolean(profile.githubUsername);
  return (
    <VStack gap={2} align="stretch">
      <Button variant="ghost" justifyContent="flex-start" _hover={{ bg: hoverBg }} px={0} py={2}>
        <AppLink to="/profile" onClick={onClose} display="block" w="100%" px={1} py={2} borderRadius="md" _hover={{ bg: hoverBg, textDecoration: 'none' }}>
          <HStack spacing={3} align="center">
            {hasGithubConnected ? (
              <Avatar
                name={profile.name || 'Профиль'}
                src={githubAvatarUrl}
                boxSize="22px"
                borderWidth="1px"
                borderColor={avatarBorderColor}
                bg={avatarBg}
              />
            ) : (
              <Icon as={FaUserCircle} boxSize={4} aria-hidden="true" color={fillIcon} />
            )}
            <Text>Профиль</Text>
          </HStack>
        </AppLink>
      </Button>
      
      <Button variant="ghost" justifyContent="flex-start" _hover={{ bg: hoverBg }} px={1} py={2}>
        <AppLink to="/learn" onClick={onClose} display="block" w="100%" px={1} py={2} borderRadius="md" _hover={{ bg: hoverBg, textDecoration: 'none' }}>
          <HStack spacing={3} align="center">
            <Icon as={FaBookOpen} boxSize={4} aria-hidden="true" color={fillIcon} />
            <Text>Материалы</Text>
          </HStack>
        </AppLink>
      </Button>

      <Button variant="ghost" justifyContent="flex-start" _hover={{ bg: hoverBg }} px={1} py={2}>
        <AppLink to="/blog" onClick={onClose} display="block" w="100%" px={1} py={2} borderRadius="md" _hover={{ bg: hoverBg, textDecoration: 'none' }}>
          <HStack spacing={3} align="center">
            <Icon as={FaFeatherAlt} boxSize={4} aria-hidden="true" color={fillIcon} />
            <Text>Блог</Text>
          </HStack>
        </AppLink>
      </Button>

      <Button variant="ghost" justifyContent="flex-start" _hover={{ bg: hoverBg }} px={1} py={2}>
        <AppLink to="/weekly" onClick={onClose} display="block" w="100%" px={1} py={2} borderRadius="md" _hover={{ bg: hoverBg, textDecoration: 'none' }}>
          <HStack spacing={3} align="center">
            <Icon as={FaClipboardList} boxSize={4} aria-hidden="true" color={fillIcon} />
            <Text>Задачи</Text>
          </HStack>
        </AppLink>
      </Button>

      <Button variant="ghost" justifyContent="flex-start" _hover={{ bg: hoverBg }} px={1} py={2}>
        <AppLink to="/hackathons" onClick={onClose} display="block" w="100%" px={1} py={2} borderRadius="md" _hover={{ bg: hoverBg, textDecoration: 'none' }}>
          <HStack spacing={3} align="center">
            <Icon as={FaCode} boxSize={4} aria-hidden="true" color={fillIcon} />
            <Text>Хакатоны</Text>
          </HStack>
        </AppLink>
      </Button>

      <Button variant="ghost" justifyContent="flex-start" _hover={{ bg: hoverBg }} px={1} py={2}>
        <AppLink to="/sessions" onClick={onClose} display="block" w="100%" px={1} py={2} borderRadius="md" _hover={{ bg: hoverBg, textDecoration: 'none' }}>
          <HStack spacing={3} align="center">
            <Icon as={FaComments} boxSize={4} aria-hidden="true" color={fillIcon} />
            <Text>Сессии</Text>
          </HStack>
        </AppLink>
      </Button>

      <Button variant="ghost" justifyContent="flex-start" _hover={{ bg: hoverBg }} px={1} py={2}>
        <AppLink to="/creators" onClick={onClose} display="block" w="100%" px={1} py={2} borderRadius="md" _hover={{ bg: hoverBg, textDecoration: 'none' }}>
          <HStack spacing={3} align="center">
            <Icon as={FaUserFriends} boxSize={4} aria-hidden="true" color={fillIcon} />
            <Text>Создатели</Text>
          </HStack>
        </AppLink>
      </Button>

      <Button variant="ghost" justifyContent="flex-start" _hover={{ bg: hoverBg }} px={1} py={2}>
        <AppLink to="/partners" onClick={onClose} display="block" w="100%" px={1} py={2} borderRadius="md" _hover={{ bg: hoverBg, textDecoration: 'none' }}>
          <HStack spacing={3} align="center">
            <Icon as={FaHandshake} boxSize={4} aria-hidden="true" color={fillIcon} />
            <Text>Партнёрство</Text>
          </HStack>
        </AppLink>
      </Button>
      <Button variant="ghost" justifyContent="flex-start" _hover={{ bg: hoverBg }} px={1} py={2}>
        <AppLink to="/" onClick={onClose} display="block" w="100%" px={1} py={2} borderRadius="md" _hover={{ bg: hoverBg, textDecoration: 'none' }}>
          <HStack spacing={3} align="center">
            <Icon as={FiLogOut} boxSize={4} aria-hidden="true" color={fillIcon} />
            <Text>Выйти</Text>
          </HStack>
        </AppLink>
      </Button>
    </VStack>
  );
};



