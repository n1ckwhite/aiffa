import React from "react";
import {
  Avatar,
  Box,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
} from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useUserProfile } from "entities/user";
import { withGithubAvatarSize } from "@/shared/lib/github/withGithubAvatarSize";
import { ProfileMenuProps } from "./types";
import { useDesktopActionsColors } from "../colors/useDeskopActionsColors";

export const ProfileMenu: React.FC<ProfileMenuProps> = ({
  hoverBg,
  setIsMobileMenuOpen,
}) => {
  const { fillIcon, avatarBorderColor, avatarBg, menuBg, menuText, menuBorder, menuItemHoverBg, menuShadow } =
    useDesktopActionsColors();
  const router = useRouter();
  const { profile, resetProfile } = useUserProfile();

  const githubAvatarUrl = withGithubAvatarSize(
    profile.avatarUrl ||
      (profile.githubUsername ? `https://github.com/${profile.githubUsername}.png` : ""),
    96,
  );
  const hasGithubConnected = Boolean(profile.githubUsername);
  const avatarSrc = hasGithubConnected ? githubAvatarUrl : undefined;

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
    <Menu placement="bottom-end" gutter={8} isLazy lazyBehavior="unmount">
      <Tooltip label="Профиль" openDelay={250} hasArrow>
        <MenuButton
          aria-label="Профиль"
          _hover={{ bg: hoverBg }}
          px={0}
          py={0}
          borderRadius="md"
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          h="32px"
          minH="32px"
          w="36px"
          minW="36px"
          lineHeight="1"
        >
          <Box w="26px" h="26px" display="flex" alignItems="center" justifyContent="center">
            <Avatar
              name={profile.name || "Профиль"}
              src={avatarSrc}
              boxSize="26px"
              borderWidth="1px"
              borderColor={avatarBorderColor}
              bg={avatarBg}
              icon={<FaUserCircle />}
              color={fillIcon}
            />
          </Box>
        </MenuButton>
      </Tooltip>

      <MenuList
        overflow="hidden"
        w="max-content"
        minW="unset"
        maxW={{ base: "calc(100vw - 24px)", md: "320px" }}
        bg={menuBg}
        color={menuText}
        borderWidth="1px"
        borderColor={menuBorder}
        borderRadius="md"
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
    </Menu>
  );
};


