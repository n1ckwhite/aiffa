import React from "react";
import { Link as ChakraLink, Text, VStack } from "@chakra-ui/react";
import { FiBriefcase, FiMail, FiMapPin } from "react-icons/fi";
import { LeftRow } from "../../../LeftRow";
import { SectionLabel } from "../../../SectionLabel";
import type { ContactsSectionProps, FieldDef } from "./types";
import { useProfileScreenUiColors } from "../../../../../colors/useProfileScreenUiColors";
import { EditFieldRow } from "./parts/EditFieldRow";

export const ContactsSection: React.FC<ContactsSectionProps> = (props) => {
  const {
    isEditing,
    workplace,
    locationLabel,
    emailValue,
    editInitial,
    handleStopHotkeys,
  } = props;
  const { textStrong, linkTextColor, leftIconColors } = useProfileScreenUiColors();

  const initialWorkplace = editInitial?.workplace ?? "";
  const initialLocation = editInitial?.location ?? "";

  const fields: FieldDef[] = [
    {
      key: "workplace",
      icon: FiBriefcase as any,
      iconColor: leftIconColors.work,
      viewValue: workplace,
      edit: {
        id: "profile-workplace",
        name: "profileWorkplace",
        placeholder: "Компания / место работы",
        defaultValue: initialWorkplace,
        ariaLabel: "Компания / место работы",
      },
    },
    {
      key: "location",
      icon: FiMapPin as any,
      iconColor: leftIconColors.location,
      viewValue: locationLabel,
      edit: {
        id: "profile-location",
        name: "profileLocation",
        placeholder: "Город / локация",
        defaultValue: initialLocation,
        ariaLabel: "Локация",
      },
    },
  ];

  const modeSuffixes = ["view", "edit"] as const;
  const modeSuffix = modeSuffixes[Number(isEditing)];
  const visibleFields = fields.filter((f) => isEditing || Boolean(f.viewValue));

  const renderView = (f: FieldDef) => {
    return (
      <LeftRow key={`${f.key}-${modeSuffix}`} icon={f.icon} iconColor={f.iconColor}>
        <Text fontSize="sm" fontWeight="semibold" color={textStrong} noOfLines={1}>
          {f.viewValue}
        </Text>
      </LeftRow>
    );
  };

  const renderEdit = (f: FieldDef) => {
    return (
      <EditFieldRow
        key={`${f.key}-${modeSuffix}`}
        icon={f.icon}
        iconColor={f.iconColor}
        {...f.edit}
        onKeyDownCapture={handleStopHotkeys}
      />
    );
  };

  const renderField = [renderView, renderEdit][Number(isEditing)];
  const rows = visibleFields.map((f) => renderField(f));

  rows.push(
    <LeftRow key="email" icon={FiMail as any} iconColor={leftIconColors.mail}>
      <ChakraLink
        href={`mailto:${emailValue}`}
        color={linkTextColor}
        fontWeight="semibold"
        maxW="360px"
        noOfLines={1}
        sx={{ overflowWrap: "anywhere" }}
        aria-label={`Email: ${emailValue}`}
      >
        {emailValue}
      </ChakraLink>
    </LeftRow>,
  );

  return (
    <VStack align="start" spacing={2} w="full" textAlign="left">
      <SectionLabel>Контакты</SectionLabel>
      {rows}
    </VStack>
  );
};


