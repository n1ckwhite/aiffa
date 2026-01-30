import React from 'react';
import { Button, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import type { MenuLinksProps } from './types';
import { FaBookOpen } from 'react-icons/fa';
import { useDesktopActionsColors } from '../../../Header/parts/DesktopActions/colors/useDeskopActionsColors';
import { useUserProfile } from 'entities/user';
import { useMobileMenuLogout } from './hooks/useMobileMenuLogout';
import { AppLink } from 'shared/ui/AppLink';
import { withGithubAvatarSize } from '@/shared/lib/github/withGithubAvatarSize';

export const MenuLinks: React.FC<MenuLinksProps> = ({ hoverBg, onClose }) => {
  const { fillIcon, avatarBorderColor, avatarBg } = useDesktopActionsColors();
  const { profile } = useUserProfile();
  const handleLogout = useMobileMenuLogout({ onClose });
  const githubAvatarUrl = withGithubAvatarSize(
    profile.avatarUrl || (profile.githubUsername ? `https://github.com/${profile.githubUsername}.png` : ''),
    96
  );
  const hasGithubConnected = Boolean(profile.githubUsername);
  return (
    <VStack gap={2} align="stretch">

      <Button variant="ghost" justifyContent="flex-start" _hover={{ bg: hoverBg }} px={1} py={2}>
        <AppLink to="/learn" onClick={onClose} display="block" w="100%" px={1} py={2} borderRadius="md" _hover={{ bg: hoverBg, textDecoration: 'none' }}>
          <HStack spacing={3} align="center">
            <Icon as={FaBookOpen} boxSize={4} aria-hidden="true" color={fillIcon} />
            <Text>Материалы</Text>
          </HStack>
        </AppLink>
      </Button>
    </VStack>
  );
};



