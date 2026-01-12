import React from "react";
import { Box, HStack, Icon, Input, Link as ChakraLink, Text, VStack } from "@chakra-ui/react";
import { FiLink } from "react-icons/fi";
import { LeftRow } from "../../../LeftRow";
import { SectionLabel } from "../../../SectionLabel";
import { linkErrorMessageByCode } from "../../../../../model/helpers";
import type { LinksSectionProps } from "./types";
import { useProfileScreenUiColors } from "../../../../../colors/useProfileScreenUiColors";
import { buildNonEmailLinks, buildVisibleLinks, getInitialLinks, getUniqueErrorCodes } from "./model/helpers";
import { useLinksEditValidation } from "./model/hooks";

export const LinksSection: React.FC<LinksSectionProps> = (props) => {
  const {
    isEditing,
    hasTriedSave,
    displayLinks,
    editInitial,
    handleStopHotkeys,
  } = props;
  const { formBorder, formBg, linkTextColor, leftIconColors, invalidBorder, warningBorder, warningBg, warningText } = useProfileScreenUiColors();

  const nonEmailLinks = buildNonEmailLinks(displayLinks);
  const shouldShowLinks = isEditing || nonEmailLinks.length > 0;

  const initialLinks = getInitialLinks(editInitial);
  const { editValidationByIndex, handleValidateAtIndex } = useLinksEditValidation({ isEditing, initialLinks });

  if (!shouldShowLinks) return null;

  const { visibleLinks, viewErrorCodes } = buildVisibleLinks(nonEmailLinks);

  let content: React.ReactNode = null;

  if (isEditing) {
    const inputs: React.ReactNode[] = [];
    for (let idx = 0; idx < initialLinks.length; idx += 1) {
      const val = initialLinks[idx];
      const code = editValidationByIndex[idx]?.error ?? null;
      const isInvalid = Boolean(code);
      inputs.push(
        <LeftRow key={idx} icon={FiLink as any} iconColor={leftIconColors.link}>
          <Input
            id={`profile-link-${idx + 1}`}
            name={`profileLink${idx + 1}`}
            autoComplete="url"
            defaultValue={val}
            onKeyDownCapture={handleStopHotkeys as any}
            onChange={(e) => {
              handleValidateAtIndex(idx, e.target.value);
            }}
            form="profile-edit-form"
            size="sm"
            h={{ base: "40px", md: "32px" }}
            fontSize={{ base: "md", md: "sm" }}
            placeholder={`Ссылка ${idx + 1} (https://...)`}
            aria-label={`Ссылка ${idx + 1}`}
            borderRadius="sm"
            borderColor={hasTriedSave && isInvalid ? invalidBorder : formBorder}
            bg={formBg}
            focusBorderColor={formBorder}
            _focus={{ boxShadow: "none", outline: "none" }}
            _focusVisible={{ boxShadow: "none", outline: "none" }}
          />
        </LeftRow>,
      );
    }

    const editErrorCodes = Object.values(editValidationByIndex)
      .map((r) => r?.error ?? null)
      .filter(Boolean) as Array<keyof typeof linkErrorMessageByCode>;
    const uniqueEditErrors = getUniqueErrorCodes(editErrorCodes);

    content = (
      <VStack align="start" spacing={2} w="full">
        {inputs}

        {hasTriedSave && uniqueEditErrors.length > 0 && (
          <Box
            w="full"
            borderWidth="1px"
            borderColor={warningBorder}
            bg={warningBg}
            borderRadius="md"
            px={3}
            py={2.5}
          >
            <Text fontSize="sm" fontWeight="semibold" color={warningText}>
              Проверь ссылки
            </Text>
            <VStack align="start" spacing={1} mt={1}>
              {uniqueEditErrors.map((code) => (
                <Text key={code} fontSize="sm" color={warningText}>
                  - {linkErrorMessageByCode[code]}
                </Text>
              ))}
            </VStack>
          </Box>
        )}
      </VStack>
    );
  }

  if (!isEditing) {
    const linksRows: React.ReactNode[] = [];
    const uniqueViewErrors = getUniqueErrorCodes(viewErrorCodes);
    for (const l of visibleLinks) {
      const isInvalid = l.href === "#";
      linksRows.push(
        <HStack key={l.id} spacing={3} minW={0} justify="flex-start" w="full">
          <Box
            aria-hidden="true"
            w="22px"
            h="22px"
            flexShrink={0}
            display="flex"
            alignItems="center"
            justifyContent="center"
            color={leftIconColors.link}
          >
            <Icon as={FiLink as any} boxSize="18px" />
          </Box>
          {isInvalid ? (
            <Text
              fontSize="md"
              color={warningText}
              fontWeight="semibold"
              flex={1}
              minW={0}
              whiteSpace="normal"
              sx={{ overflowWrap: "anywhere", wordBreak: "break-word" }}
            >
              {l.value}
            </Text>
          ) : (
            <ChakraLink
              href={l.href}
              isExternal
              color={linkTextColor}
              fontWeight="semibold"
              fontSize="md"
              flex={1}
              minW={0}
              display="block"
              whiteSpace="normal"
              sx={{ overflowWrap: "anywhere", wordBreak: "break-word" }}
              aria-label={`Открыть ссылку: ${l.value}`}
            >
              {l.value}
            </ChakraLink>
          )}
        </HStack>,
      );
    }
    content = (
      <VStack align="start" spacing={1.5} w="full">
        {linksRows}
        {uniqueViewErrors.length > 0 && (
          <Box
            w="full"
            borderWidth="1px"
            borderColor={warningBorder}
            bg={warningBg}
            borderRadius="md"
            px={3}
            py={2.5}
          >
            <Text fontSize="sm" fontWeight="semibold" color={warningText}>
              Некоторые ссылки не будут открываться
            </Text>
            <VStack align="start" spacing={1} mt={1}>
              {uniqueViewErrors.map((code) => (
                <Text key={code} fontSize="sm" color={warningText}>
                  - {linkErrorMessageByCode[code]}
                </Text>
              ))}
            </VStack>
          </Box>
        )}
      </VStack>
    );
  }

  return (
    <>
      <SectionLabel>Ссылки</SectionLabel>

      <VStack align="start" spacing={1.5} w="full" pt={1}>
        {content}
      </VStack>
    </>
  );
};


