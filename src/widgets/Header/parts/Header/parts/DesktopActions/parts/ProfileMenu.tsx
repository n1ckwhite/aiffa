import React from "react";
import {
  Avatar,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Tooltip,
} from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useUserProfile } from "entities/user";
import { withGithubAvatarSize } from "@/shared/lib/github/withGithubAvatarSize";
import { ProfileMenuProps } from "./types";

export const ProfileMenu: React.FC<ProfileMenuProps> = ({
  hoverBg,
  setIsMobileMenuOpen,
  fillIcon,
  avatarBorderColor,
  avatarBg,
  menuBg,
  menuText,
  menuBorder,
  menuItemHoverBg,
  menuShadow,
}) => {
  const router = useRouter();
  const { profile, resetProfile } = useUserProfile();

  const githubAvatarUrl = withGithubAvatarSize(
    profile.avatarUrl ||
      (profile.githubUsername ? `https://github.com/${profile.githubUsername}.png` : ""),
    96,
  );
  const hasGithubConnected = Boolean(profile.githubUsername);

  const handleOpenProfile = () => {
    setIsMobileMenuOpen(false);
    router.push("/profile");
  };

  const handleLogout = () => {
    setIsMobileMenuOpen(false);
    resetProfile();
    router.push("/");
  };

  return (
    <Menu placement="bottom-end" gutter={8}>
      <Tooltip label="Профиль" openDelay={250} hasArrow>
        <MenuButton
          aria-label="Профиль"
          _hover={{ bg: hoverBg }}
          px={2}
          py={0}
          borderRadius="md"
          display="inline-flex"
          alignItems="center"
          h="32px"
          minH="32px"
          lineHeight="1"
        >
          {hasGithubConnected ? (
            <Avatar
              name={profile.name || "Профиль"}
              src={githubAvatarUrl}
              boxSize="26px"
              borderWidth="1px"
              borderColor={avatarBorderColor}
              bg={avatarBg}
            />
          ) : (
            <Icon as={FaUserCircle} boxSize={5} aria-hidden="true" color={fillIcon} />
          )}
        </MenuButton>
      </Tooltip>

      <Portal>
        <MenuList
          overflow="hidden"
          w="max-content"
          minW="unset"
          maxW={{ base: "calc(100vw - 24px)", md: "320px" }}
          bg={menuBg}
          color={menuText}
          borderWidth="1px"
          borderColor={menuBorder}
          borderRadius="2xl"
          py={0}
          boxShadow={menuShadow}
          zIndex={2000}
        >
          <MenuItem
            onClick={handleOpenProfile}
            icon={<Icon as={FaUserCircle} boxSize={4} color={fillIcon} />}
            fontWeight="semibold"
            py={2.5}
            px={3}
            bg="transparent"
            _hover={{ bg: menuItemHoverBg }}
            _focus={{ bg: menuItemHoverBg }}
          >
            Профиль
          </MenuItem>

          <MenuItem
            onClick={handleLogout}
            icon={<Icon as={FiLogOut} boxSize={4} color={fillIcon} />}
            fontWeight="semibold"
            py={2.5}
            px={3}
            bg="transparent"
            _hover={{ bg: menuItemHoverBg }}
            _focus={{ bg: menuItemHoverBg }}
          >
            Выйти
          </MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
};


