import React from "react";
import { Box, HStack, Icon, Input, Link as ChakraLink, Text, VStack } from "@chakra-ui/react";
import { FiLink } from "react-icons/fi";
import type { ProfileLink } from "entities/user";
import { LeftRow } from "../../../LeftRow";
import { SectionLabel } from "../../../SectionLabel";
import { buildProfileLinkHref, linkErrorMessageByCode, validateCustomLinkValue } from "../../../../../model/helpers";
import type { LinksSectionProps } from "./types";
import { useProfileScreenUiColors } from "../../../../../colors/useProfileScreenUiColors";

const buildNonEmailLinks = (links: ProfileLink[]): ProfileLink[] => {
  return links.filter((l) => String((l as any)?.kind ?? "") !== "email");
};

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
  if (!shouldShowLinks) return null;

  let initialLinks: [string, string, string, string] = ["", "", "", ""];
  if (editInitial) initialLinks = editInitial.links;
  const initialLinksKey = initialLinks.join("||");

  const [editValidationByIndex, setEditValidationByIndex] = React.useState<Record<number, ReturnType<typeof validateCustomLinkValue>>>({});

  React.useEffect(() => {
    if (!isEditing) {
      setEditValidationByIndex({});
      return;
    }
    const next: Record<number, ReturnType<typeof validateCustomLinkValue>> = {};
    for (let i = 0; i < initialLinks.length; i += 1) {
      next[i] = validateCustomLinkValue(initialLinks[i]);
    }
    setEditValidationByIndex(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing, initialLinksKey]);

  const visibleLinks: Array<{ id: string; href: string; value: string }> = [];
  const viewErrorCodes: Array<keyof typeof linkErrorMessageByCode> = [];
  if (!isEditing) {
    for (const l of nonEmailLinks) {
      if (visibleLinks.length >= 6) break;
      const raw = String((l as any)?.value ?? "").trim();
      const { normalized, error } = validateCustomLinkValue(raw);
      const value = normalized || raw;
      if (!value) continue;
      let id = "";
      if (typeof (l as any)?.id === "string") id = String((l as any).id);
      if (!id) id = value;
      if (error) {
        viewErrorCodes.push(error);
        visibleLinks.push({ id, href: "#", value });
        continue;
      }
      visibleLinks.push({ id, href: buildProfileLinkHref({ ...l, value: normalized }), value });
    }
  }

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
              const next = validateCustomLinkValue(e.target.value);
              setEditValidationByIndex((prev) => {
                const prevCode = prev[idx]?.error ?? null;
                const nextCode = next.error ?? null;
                if (prevCode === nextCode) return prev;
                return { ...prev, [idx]: next };
              });
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
    const uniqueEditErrors = Array.from(new Set(editErrorCodes));

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
    const uniqueViewErrors = Array.from(new Set(viewErrorCodes));
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


