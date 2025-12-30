import {
  theme as baseTheme,
  type Theme,
  type ThemeConfig
} from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false
};

const theme: Theme = {
  ...baseTheme,
  config,
  fonts: {
    ...baseTheme.fonts,
    heading:
      "var(--font-inter), ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji'",
    body:
      "var(--font-inter), ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji'",
    mono:
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
  },
  colors: {
    ...baseTheme.colors,
    // кастомный основной бренд
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...( {
      brand: {
      50: "#ecfeff",
      100: "#cffafe",
      200: "#a5f3fc",
      300: "#67e8f9",
      400: "#22d3ee",
      500: "#06b6d4",
      600: "#0891b2",
      700: "#0e7490",
      800: "#155e75",
      900: "#164e63"
      }
    } as any),
    gray: {
      50: "#f7fafc",
      100: "#edf2f7",
      200: "#e2e8f0",
      300: "#cbd5e0",
      400: "#a0aec0",
      500: "#718096",
      600: "#4a5568",
      700: "#2d3748",
      800: "#1a202c",
      900: "#171923"
    }
  },
  radii: {
    ...baseTheme.radii,
    sm: "6px",
    md: "12px",
    lg: "16px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "32px"
  },
  shadows: {
    ...baseTheme.shadows,
    outline: "0 0 0 3px rgba(6, 182, 212, 0.45)",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...( {
      glow:
      "0 10px 30px rgba(6, 182, 212, 0.35), 0 2px 10px rgba(14, 116, 144, 0.25)",
    glass:
      "inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 24px rgba(0,0,0,0.24)",
    soft: "0 10px 24px rgba(0,0,0,0.18)",
    softLg: "0 16px 40px rgba(0,0,0,0.22)"
    } as any)
  },
  semanticTokens: {
    ...baseTheme.semanticTokens,
    colors: {
      ...(baseTheme.semanticTokens?.colors ?? {}),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...( {
        "surface.bg": {
        default: "white",
        _dark: "gray.900"
        },
        "surface.elevated": {
        default: "white",
        _dark: "gray.800"
        },
        "text.muted": {
        default: "gray.600",
        _dark: "gray.300"
        },
        "ring.focus": {
        default: "blue.300",
        _dark: "blue.400"
        }
      } as any)
    }
  },
  styles: {
    ...baseTheme.styles,
    global: () => ({
      body: {
        bg: "chakra-body-bg",
        color: "chakra-body-text",
        transition: "background-color 0.25s ease, color 0.25s ease"
      },
      "*, *::before, *::after": {
        transitionProperty:
          "background-color, border-color, color, fill, stroke, box-shadow",
        transitionDuration: "0.2s",
        transitionTimingFunction: "ease"
      }
    })
  },
  components: {
    ...baseTheme.components,
    Button: {
      ...(baseTheme.components?.Button as any),
      variants: {
        ...(baseTheme.components?.Button as any)?.variants,
        ghost: {
          ...((baseTheme.components?.Button as any)?.variants?.ghost ?? {}),
          _hover: {
            bg: "gray.700"
          }
        },
        brand: {
          bg:
            "linear-gradient(90deg, var(--chakra-colors-brand-400), var(--chakra-colors-blue-400))",
          color: "white",
          _hover: {
            filter: "brightness(1.05)",
            boxShadow: "glow"
          },
          _active: { filter: "brightness(0.95)" },
          borderRadius: "full"
        }
      }
    },
    Input: {
      ...(baseTheme.components?.Input as any),
      baseStyle: {
        ...((baseTheme.components?.Input as any)?.baseStyle ?? {}),
        field: {
          ...((baseTheme.components?.Input as any)?.baseStyle?.field ?? {}),
          borderRadius: "full"
        }
      }
    },
    Tooltip: {
      ...(baseTheme.components?.Tooltip as any),
      baseStyle: {
        ...((baseTheme.components?.Tooltip as any)?.baseStyle ?? {}),
        borderRadius: "md",
        px: 2.5,
        py: 1.5,
        boxShadow: "soft"
      }
    },
    Badge: {
      ...(baseTheme.components?.Badge as any),
      baseStyle: {
        ...((baseTheme.components?.Badge as any)?.baseStyle ?? {}),
        borderRadius: "full",
        fontWeight: "semibold"
      }
    },
    Link: {
      ...(baseTheme.components?.Link as any),
      baseStyle: {
        ...((baseTheme.components?.Link as any)?.baseStyle ?? {}),
        _hover: { textDecoration: "none", opacity: 0.9 }
      }
    }
  }
};

export default theme;
