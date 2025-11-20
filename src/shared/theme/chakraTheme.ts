import { theme as baseTheme, type Theme, type ThemeConfig } from "@chakra-ui/react";

export const chakraThemeConfig: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false
};

export const chakraTheme: Theme = {
  ...baseTheme,
  config: chakraThemeConfig
};


