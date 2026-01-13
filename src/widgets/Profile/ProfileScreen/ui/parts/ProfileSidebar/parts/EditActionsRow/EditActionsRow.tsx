import React from "react";
import { Button, HStack } from "@chakra-ui/react";
import type { EditActionsRowProps } from "./types";
import { useProfileScreenUiColors } from "../../../../../colors/useProfileScreenUiColors";

export const EditActionsRow: React.FC<EditActionsRowProps> = ({
  isEditing,
  isSaving,
  onCancel,
}) => {
  const { primaryBtnBg, primaryBtnHoverBg, primaryBtnActiveBg } = useProfileScreenUiColors();
  if (!isEditing) return null;

  return (
    <HStack w="full" maxW="full" justify="flex-start" spacing={2} pt={2}>
      <Button
        type="submit"
        form="profile-edit-form"
        aria-label="Сохранить изменения профиля"
        size="sm"
        h="36px"
        px={5}
        borderRadius="full"
        fontWeight="semibold"
        bg={primaryBtnBg}
        color="white"
        transition="background 0.2s ease"
        _hover={{ bg: primaryBtnHoverBg }}
        _active={{ bg: primaryBtnActiveBg }}
        isLoading={isSaving}
      >
        Сохранить
      </Button>
      <Button
        type="button"
        onClick={onCancel}
        aria-label="Отмена редактирования"
        size="sm"
        h="36px"
        px={5}
        borderRadius="full"
        variant="outline"
        isDisabled={isSaving}
      >
        Отмена
      </Button>
    </HStack>
  );
};


