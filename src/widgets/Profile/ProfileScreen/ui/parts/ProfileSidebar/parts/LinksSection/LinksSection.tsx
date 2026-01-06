import React from "react";
import { Box, HStack, Icon, Input, Link as ChakraLink, VStack } from "@chakra-ui/react";
import { FiLink } from "react-icons/fi";
import type { ProfileLink } from "entities/user";
import { LeftRow } from "../../../LeftRow";
import { SectionLabel } from "../../../SectionLabel";
import { buildProfileLinkHref } from "../../../../../model/helpers";
import type { LinksSectionProps } from "./types";
import { useProfileScreenUiColors } from "../../../../../colors/useProfileScreenUiColors";

const buildNonEmailLinks = (links: ProfileLink[]): ProfileLink[] => {
  return links.filter((l) => String((l as any)?.kind ?? "") !== "email");
};

export const LinksSection: React.FC<LinksSectionProps> = (props) => {
  const {
    isEditing,
    displayLinks,
    editInitial,
    handleStopHotkeys,
  } = props;
  const { formBorder, formBg, linkTextColor, leftIconColors } = useProfileScreenUiColors();

  const nonEmailLinks = buildNonEmailLinks(displayLinks);
  const shouldShowLinks = isEditing || nonEmailLinks.length > 0;
  if (!shouldShowLinks) return null;

  let initialLinks: [string, string, string, string] = ["", "", "", ""];
  if (editInitial) initialLinks = editInitial.links;

  const visibleLinks: Array<{ id: string; href: string; value: string }> = [];
  if (!isEditing) {
    for (const l of nonEmailLinks) {
      if (visibleLinks.length >= 6) break;
      const value = String((l as any)?.value ?? "").trim();
      if (!value) continue;
      let id = "";
      if (typeof (l as any)?.id === "string") id = String((l as any).id);
      if (!id) id = value;
      visibleLinks.push({ id, href: buildProfileLinkHref(l), value });
    }
  }

  let content: React.ReactNode = null;

  if (isEditing) {
    const inputs: React.ReactNode[] = [];
    for (let idx = 0; idx < initialLinks.length; idx += 1) {
      const val = initialLinks[idx];
      inputs.push(
        <LeftRow key={idx} icon={FiLink as any} iconColor={leftIconColors.link}>
          <Input
            id={`profile-link-${idx + 1}`}
            name={`profileLink${idx + 1}`}
            autoComplete="url"
            defaultValue={val}
            onKeyDownCapture={handleStopHotkeys as any}
            form="profile-edit-form"
            size="sm"
            h={{ base: "40px", md: "32px" }}
            fontSize={{ base: "md", md: "sm" }}
            placeholder={`Ссылка ${idx + 1} (https://...)`}
            aria-label={`Ссылка ${idx + 1}`}
            borderRadius="sm"
            borderColor={formBorder}
            bg={formBg}
            focusBorderColor={formBorder}
            _focus={{ boxShadow: "none", outline: "none" }}
            _focusVisible={{ boxShadow: "none", outline: "none" }}
          />
        </LeftRow>,
      );
    }
    content = (
      <VStack align="start" spacing={2} w="full">
        {inputs}
      </VStack>
    );
  }

  if (!isEditing) {
    const linksRows: React.ReactNode[] = [];
    for (const l of visibleLinks) {
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
          <ChakraLink
            href={l.href}
            isExternal
            color={linkTextColor}
            fontWeight="semibold"
            flex={1}
            minW={0}
            display="block"
            whiteSpace="normal"
            sx={{ overflowWrap: "anywhere", wordBreak: "break-word" }}
            aria-label={`Открыть ссылку: ${l.value}`}
          >
            {l.value}
          </ChakraLink>
        </HStack>,
      );
    }
    content = <>{linksRows}</>;
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


