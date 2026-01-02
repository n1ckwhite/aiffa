"use client";

import React from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { AppButtonLink } from "@/shared/ui/AppLink";
import type { BackToBlogLinkProps } from "./types";

export const BackToBlogLink: React.FC<BackToBlogLinkProps> = () => {
  return (
    <AppButtonLink
      to="/blog"
      variant="outline"
      colorScheme="blue"
      aria-label="Вернуться в блог"
      leftIcon={<ArrowBackIcon />}
      borderRadius="full"
      px={5}
      py={2}
      fontWeight="bold"
      alignSelf="flex-start"
      transition="background-color 0.15s ease, transform 0.1s ease"
    >
      В блог
    </AppButtonLink>
  );
};


