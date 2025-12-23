"use client";

import React from "react";
import NextLink from "next/link";
import type { LinkProps as NextLinkProps } from "next/link";
import type { BoxProps, ButtonProps, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import { Box, Button, Link as ChakraLink } from "@chakra-ui/react";

type ToProp = {
  to: string;
};

type BaseNextLinkProps = Pick<NextLinkProps, "prefetch" | "replace" | "scroll" | "shallow">;

export type AppLinkProps = ToProp &
  BaseNextLinkProps &
  Omit<ChakraLinkProps, "as" | "href"> & {
    "aria-label"?: string;
  };

export const AppLink = ({ to, children, ...rest }: AppLinkProps) => {
  return (
    <ChakraLink as={NextLink} href={to} {...rest}>
      {children}
    </ChakraLink>
  );
};

export type AppButtonLinkProps = ToProp &
  BaseNextLinkProps &
  Omit<ButtonProps, "as" | "href"> & {
    "aria-label"?: string;
  };

export const AppButtonLink = ({ to, children, ...rest }: AppButtonLinkProps) => {
  return (
    <Button as={NextLink} href={to} {...rest}>
      {children}
    </Button>
  );
};

export type AppBoxLinkProps = ToProp &
  BaseNextLinkProps &
  Omit<BoxProps, "as" | "href"> & {
    "aria-label"?: string;
  };

export const AppBoxLink = ({ to, children, ...rest }: AppBoxLinkProps) => {
  return (
    <Box as={NextLink} href={to} {...rest}>
      {children}
    </Box>
  );
};


