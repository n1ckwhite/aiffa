import React from "react";
import { Input } from "@chakra-ui/react";
import { LeftRow } from "../../../../../LeftRow";
import { useProfileScreenUiColors } from "../../../../../../../colors/useProfileScreenUiColors";
import type { EditFieldRowProps } from "./types";

const autoCompleteByName: Record<string, string> = {
  profileWorkplace: "organization",
  profileLocation: "address-level2",
};

export const EditFieldRow: React.FC<EditFieldRowProps> = ({
  icon,
  iconColor,
  id,
  name,
  placeholder,
  defaultValue,
  ariaLabel,
  onKeyDownCapture,
}) => {
  const { formBorder, formBg } = useProfileScreenUiColors();
  const autoComplete = autoCompleteByName[name] ?? "off";

  const commonFieldProps = {
    form: "profile-edit-form",
    size: "sm" as const,
    h: { base: "40px", md: "32px" } as const,
    fontSize: { base: "md", md: "sm" } as const,
    borderRadius: "sm" as const,
    borderColor: formBorder,
    bg: formBg,
    focusBorderColor: formBorder,
    _focus: { boxShadow: "none", outline: "none" } as const,
    _focusVisible: { boxShadow: "none", outline: "none" } as const,
  };

  return (
    <LeftRow icon={icon} iconColor={iconColor}>
      <Input
        {...commonFieldProps}
        id={id}
        name={name}
        autoComplete={autoComplete}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onKeyDownCapture={onKeyDownCapture}
        aria-label={ariaLabel}
      />
    </LeftRow>
  );
};


