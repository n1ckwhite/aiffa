import React from "react";
import { Box, Button, HStack, Icon, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { FiAward, FiUsers } from "react-icons/fi";
import PillBadge from "shared/ui/PillBadge";
import { formatCount } from "shared/functions/formatCount";
import type { ProfileHeaderProps } from "./types";
import { avatarProxyUrl } from "../../../../../model/helpers";
import { PLACEHOLDER_AVATAR_URL } from "../../../../../model/constants";
import { useProfileScreenUiColors } from "../../../../../colors/useProfileScreenUiColors";

export const ProfileHeader: React.FC<ProfileHeaderProps> = (props) => {
  const {
    avatarUrl,
    name,
    bio,
    xp,
    profileBadge,
    isEditing,
    editSessionId,
    editInitial,
    saveAction,
    handleStopHotkeys,
    handleStartEdit,
  } = props;
  const {
    muted,
    xpNumberColor,
    primaryBtnBg,
    primaryBtnHoverBg,
    primaryBtnActiveBg,
    formBorder,
    formBg,
    leftIconColors,
  } = useProfileScreenUiColors();

  const displayName = name || "Пользователь";
  const displayBio = bio || "Описание";

  let initialName = "";
  let initialBio = "";
  if (editInitial) {
    initialName = editInitial.name;
    initialBio = editInitial.bio;
  }

  let mainBlock: React.ReactNode = null;
  if (isEditing) {
    mainBlock = (
      <VStack
        key={editSessionId}
        w="full"
        maxW={{ base: "360px", md: "390px" }}
        spacing={3}
        align={{ base: "center", md: "start" }}
        alignSelf={{ base: "center", md: "flex-start" }}
      >
        <Box as="form" id="profile-edit-form" action={saveAction} display="none" />
        <Input
          id="profile-name"
          name="profileName"
          autoComplete="name"
          placeholder="Имя (до 250 символов)"
          defaultValue={initialName}
          onKeyDownCapture={handleStopHotkeys as any}
          form="profile-edit-form"
          maxLength={250}
          w="full"
          h="40px"
          fontSize={{ base: "md", md: "sm" }}
          aria-label="Имя"
          borderRadius="sm"
          borderColor={formBorder}
          bg={formBg}
          focusBorderColor={formBorder}
          _focus={{ boxShadow: "none", outline: "none" }}
          _focusVisible={{ boxShadow: "none", outline: "none" }}
        />
        <Textarea
          id="profile-bio"
          name="profileBio"
          autoComplete="off"
          placeholder="О себе (до 250 символов)"
          defaultValue={initialBio}
          onKeyDownCapture={handleStopHotkeys as any}
          form="profile-edit-form"
          resize="none"
          rows={2}
          w="full"
          minH="72px"
          fontSize={{ base: "md", md: "sm" }}
          aria-label="Bio"
          maxLength={250}
          borderRadius="sm"
          borderColor={formBorder}
          bg={formBg}
          focusBorderColor={formBorder}
          _focus={{ boxShadow: "none", outline: "none" }}
          _focusVisible={{ boxShadow: "none", outline: "none" }}
        />
      </VStack>
    );
  }

  if (!isEditing) {
    mainBlock = (
      <>
        <Text
          fontWeight="bold"
          fontSize={{ base: "2xl", md: "3xl" }}
          lineHeight="1.15"
          whiteSpace="normal"
          overflowWrap="anywhere"
          wordBreak="break-word"
        >
          {displayName}
        </Text>
        <Text color={muted} whiteSpace="normal" overflowWrap="anywhere" wordBreak="break-word">
          {displayBio}
        </Text>
        <Button
          type="button"
          onClick={handleStartEdit}
          aria-label="Редактировать профиль"
          w="full"
          maxW={{ base: "360px", md: "300px", lg: "250px" }}
          alignSelf={{ base: "center", md: "flex-start" }}
          h="44px"
          borderRadius="md"
          fontWeight="semibold"
          bg={primaryBtnBg}
          color="white"
          transition="background 0.2s ease, transform 0.15s ease, box-shadow 0.15s ease"
          _hover={{ transform: "translateY(-1px)", bg: primaryBtnHoverBg, boxShadow: "md" }}
          _active={{ transform: "translateY(0px)", bg: primaryBtnActiveBg, boxShadow: "sm" }}
        >
          Редактировать профиль
        </Button>
      </>
    );
  }

  return (
    <VStack
      align={{ base: "center", md: "start" }}
      spacing={3}
      w="full"
      minW={0}
      textAlign={{ base: "center", md: "left" }}
    >
      <Box
        as="img"
        boxSize={{ base: "132px", sm: "152px", md: "184px", lg: "208px" }}
        borderRadius="full"
        objectFit="cover"
        bg="transparent"
        alt={displayName}
        src={avatarProxyUrl(avatarUrl, 208)}
        srcSet={[
          `${avatarProxyUrl(avatarUrl, 132)} 132w`,
          `${avatarProxyUrl(avatarUrl, 152)} 152w`,
          `${avatarProxyUrl(avatarUrl, 184)} 184w`,
          `${avatarProxyUrl(avatarUrl, 208)} 208w`,
        ].join(", ")}
        sizes="(min-width: 62em) 208px, (min-width: 48em) 184px, (min-width: 30em) 152px, 132px"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        onError={(e: any) => {
          try {
            e.currentTarget.src = avatarProxyUrl(PLACEHOLDER_AVATAR_URL, 208);
            e.currentTarget.removeAttribute("srcset");
          } catch {}
        }}
      />

      <VStack align={{ base: "center", md: "start" }} spacing={2} w="full" minW={0}>
        {mainBlock}

        <VStack spacing={2} w="full" pt={1} align={{ base: "center", md: "start" }}>
          <HStack
            spacing={2}
            justify={{ base: "center", md: "flex-start" }}
            w="full"
            color={muted}
            flexWrap="wrap"
          >
            <Icon as={FiUsers} color={leftIconColors.people} />
            <Text>
              <Text as="span" fontWeight="semibold" color="inherit">
                {formatCount(0)}
              </Text>{" "}
              подписчики ·{" "}
              <Text as="span" fontWeight="semibold" color="inherit">
                {formatCount(0)}
              </Text>{" "}
              подписан
            </Text>
          </HStack>

          <HStack
            spacing={3}
            justify={{ base: "center", md: "flex-start" }}
            w="full"
            flexWrap="wrap"
            align="center"
          >
            <HStack spacing={1.5} color={muted}>
              <Icon as={FiAward} color={leftIconColors.xp} />
              <Text fontSize={{ base: "md", md: "lg" }}>
                <Text
                  as="span"
                  fontWeight="bold"
                  color={xpNumberColor}
                  fontSize={{ base: "md", md: "lg" }}
                >
                  {formatCount(xp)}
                </Text>{" "}
                XP
              </Text>
            </HStack>
            <Box>
              <PillBadge colorScheme={profileBadge.colorScheme as any} variant="outline" uppercase={false}>
                {profileBadge.label}
              </PillBadge>
            </Box>
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
};


