import React from "react";
import { Button, Text } from "@chakra-ui/react";
import { PROFILE_HEADER_USERNAME } from "../../data/constants";
import { ProfileHeaderViewInfoProps } from "./types";

export const ProfileHeaderViewInfo: React.FC<ProfileHeaderViewInfoProps> = (props) => {
  const { displayName, displayBio, mutedColor, primaryBtnBg, primaryBtnHoverBg, primaryBtnActiveBg, onStartEdit } =
    props;

  return (
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
      <Text color={mutedColor} fontSize="sm" lineHeight="1.2">
        {PROFILE_HEADER_USERNAME}
      </Text>
      <Text color={mutedColor} whiteSpace="normal" overflowWrap="anywhere" wordBreak="break-word">
        {displayBio}
      </Text>
      <Button
        type="button"
        onClick={onStartEdit}
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
};

