import React from "react";
import { Box, Input, Text, Textarea, VStack, VisuallyHidden } from "@chakra-ui/react";
import { ProfileHeaderEditFormProps } from "./types";

export const ProfileHeaderEditForm: React.FC<ProfileHeaderEditFormProps> = (props) => {
  const { editSessionId, saveAction, initialName, initialBio, formBorder, formBg, handleStopHotkeys } = props;

  return (
    <VStack
      key={editSessionId}
      w="full"
      maxW={{ base: "360px", md: "390px" }}
      spacing={3}
      align={{ base: "center", md: "start" }}
      alignSelf={{ base: "center", md: "flex-start" }}
    >
      <VisuallyHidden>
        <Text as="h1" id="profile-page-title">
          Профиль
        </Text>
      </VisuallyHidden>
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
};

