import React from 'react';
import { HStack, Text, Tooltip, Icon } from '@chakra-ui/react';
import { FaBookOpen, FaClipboardList, FaCode, FaComments, FaUserFriends, FaFeatherAlt } from 'react-icons/fa';
import { AppLink } from '@/shared/ui/AppLink';
import ThemeToggleButton from '../../../ThemeToggleButton';
import type { DesktopActionsProps } from './types';
import { useDesktopActionsColors } from './colors/useDeskopActionsColors';
import { ProfileMenu } from './parts/ProfileMenu';

export const DesktopActions: React.FC<DesktopActionsProps> = ({
  hoverBg,
  setIsMobileMenuOpen,
}) => {
  const { fillIcon, avatarBorderColor, avatarBg, menuBg, menuText, menuBorder, menuItemHoverBg, menuShadow } =
    useDesktopActionsColors();

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
            display="none"
            sx={{
              "@container (min-width: 70rem)": { display: "inline" }
            }}
            fontSize="sm"
            fontWeight="semibold"
          >
            Материалы
          </Text>
        </AppLink>
      </Tooltip>

      {/* Контент */}
      <Tooltip label="Блог" openDelay={250} hasArrow>
        <AppLink
          to="/blog"
          aria-label="Блог"
          onClick={() => { setIsMobileMenuOpen(false); }}
          _hover={{ bg: hoverBg }}
          px={2}
          py={1.5}
          borderRadius="md"
          display="inline-flex"
          alignItems="center"
        >
          <Icon as={FaFeatherAlt} boxSize={4} aria-hidden="true" color={fillIcon} />
          <Text
            ml={2}
            display="none"
            sx={{
              "@container (min-width: 70rem)": { display: "inline" }
            }}
            fontSize="sm"
            fontWeight="semibold"
          >
            Блог
          </Text>
        </AppLink>
      </Tooltip>

      {/* Практика */}
      <Tooltip label="Задачи" openDelay={250} hasArrow>
        <AppLink
          to="/weekly"
          aria-label="Задачи"
          onClick={() => { setIsMobileMenuOpen(false); }}
          _hover={{ bg: hoverBg }}
          px={2}
          py={1.5}
          borderRadius="md"
          display="inline-flex"
          alignItems="center"
        >
          <Icon as={FaClipboardList} boxSize={4} aria-hidden="true" color={fillIcon} />
          <Text
            ml={2}
            display="none"
            sx={{
              "@container (min-width: 70rem)": { display: "inline" }
            }}
            fontSize="sm"
            fontWeight="semibold"
          >
            Задачи
          </Text>
        </AppLink>
      </Tooltip>
      <Tooltip label="Хакатоны" openDelay={250} hasArrow>
        <AppLink
          to="/hackathons"
          aria-label="Хакатоны"
          onClick={() => { setIsMobileMenuOpen(false); }}
          _hover={{ bg: hoverBg }}
          px={2}
          py={1.5}
          borderRadius="md"
          display="inline-flex"
          alignItems="center"
        >
          <Icon as={FaCode} boxSize={4} aria-hidden="true" color={fillIcon} />
          <Text
            ml={2}
            display="none"
            sx={{
              "@container (min-width: 70rem)": { display: "inline" }
            }}
            fontSize="sm"
            fontWeight="semibold"
          >
            Хакатоны
          </Text>
        </AppLink>
      </Tooltip>

      {/* Сообщество */}
      <Tooltip label="Сессии" openDelay={250} hasArrow>
        <AppLink
          to="/sessions"
          aria-label="Сессии"
          onClick={() => { setIsMobileMenuOpen(false); }}
          _hover={{ bg: hoverBg }}
          px={2}
          py={1.5}
          borderRadius="md"
          display="inline-flex"
          alignItems="center"
        >
          <Icon as={FaComments} boxSize={4} aria-hidden="true" color={fillIcon} />
          <Text
            ml={2}
            display="none"
            sx={{
              "@container (min-width: 70rem)": { display: "inline" }
            }}
            fontSize="sm"
            fontWeight="semibold"
          >
            Сессии
          </Text>
        </AppLink>
      </Tooltip>
      <Tooltip label="Создатели" openDelay={250} hasArrow>
        <AppLink
          to="/creators"
          aria-label="Создатели"
          onClick={() => { setIsMobileMenuOpen(false); }}
          _hover={{ bg: hoverBg }}
          px={2}
          py={1.5}
          borderRadius="md"
          display="inline-flex"
          alignItems="center"
        >
          <Icon as={FaUserFriends} boxSize={4} aria-hidden="true" color={fillIcon} />
          <Text
            ml={2}
            display="none"
            sx={{
              "@container (min-width: 70rem)": { display: "inline" }
            }}
            fontSize="sm"
            fontWeight="semibold"
          >
            Создатели
          </Text>
        </AppLink>
      </Tooltip>

      <ProfileMenu
        hoverBg={hoverBg}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        fillIcon={fillIcon}
        avatarBorderColor={avatarBorderColor}
        avatarBg={avatarBg}
        menuBg={menuBg}
        menuText={menuText}
        menuBorder={menuBorder}
        menuItemHoverBg={menuItemHoverBg}
        menuShadow={menuShadow}
      />
      
      <ThemeToggleButton />
    </HStack>
  );
};



