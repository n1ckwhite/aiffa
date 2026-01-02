"use client";

import React from "react";
import { AppButtonLink } from "@/shared/ui/AppLink";
import type { BackToBlogLinkProps } from "./types";

export const BackToBlogLink: React.FC<BackToBlogLinkProps> = ({ ghostHoverBg, ghostActiveBg, ghostFocusShadow }) => {
  return (
    <AppButtonLink
      to="/blog"
      size="sm"
      variant="ghost"
      aria-label="Вернуться в блог"
      _hover={{ bg: ghostHoverBg }}
      _active={{ bg: ghostActiveBg }}
      _focusVisible={{ boxShadow: ghostFocusShadow }}
    >
      В блог
    </AppButtonLink>
  );
};


