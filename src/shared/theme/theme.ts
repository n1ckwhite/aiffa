import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  fonts: {
    heading:
      "ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji'",
    body:
      "ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji'",
    mono:
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
  colors: {
    brand: {
      50: '#ecfeff',
      100: '#cffafe',
      200: '#a5f3fc',
      300: '#67e8f9',
      400: '#22d3ee',
      500: '#06b6d4',
      600: '#0891b2',
      700: '#0e7490',
      800: '#155e75',
      900: '#164e63',
    },
    gray: {
      50: '#f7fafc',
      100: '#edf2f7',
      200: '#e2e8f0',
      300: '#cbd5e0',
      400: '#a0aec0',
      500: '#718096',
      600: '#4a5568',
      700: '#2d3748',
      800: '#1a202c',
      900: '#171923',
    },
  },
  radii: {
    sm: '6px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
  },
  shadows: {
    outline: '0 0 0 3px rgba(6, 182, 212, 0.45)',
    glow: '0 10px 30px rgba(6, 182, 212, 0.35), 0 2px 10px rgba(14, 116, 144, 0.25)',
    glass: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 24px rgba(0,0,0,0.24)',
    soft: '0 10px 24px rgba(0,0,0,0.18)',
    softLg: '0 16px 40px rgba(0,0,0,0.22)'
  },
  semanticTokens: {
    colors: {
      'surface.bg': {
        default: 'white',
        _dark: 'gray.900',
      },
      'surface.elevated': {
        default: 'white',
        _dark: 'gray.800',
      },
      'text.muted': {
        default: 'gray.600',
        _dark: 'gray.300',
      },
      'ring.focus': {
        default: 'blue.300',
        _dark: 'blue.400',
      },
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'white',
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
        transition: 'background-color 0.25s ease, color 0.25s ease',
      },
      '*, *::before, *::after': {
        transitionProperty: 'background-color, border-color, color, fill, stroke, box-shadow',
        transitionDuration: '0.2s',
        transitionTimingFunction: 'ease',
      },
    }),
  },
  components: {
    Button: {
      variants: {
        ghost: {
          _hover: {
            bg: 'gray.700',
          },
        },
        brand: {
          bg: 'linear-gradient(90deg, var(--chakra-colors-brand-400), var(--chakra-colors-blue-400))',
          color: 'white',
          _hover: {
            filter: 'brightness(1.05)',
            boxShadow: 'glow',
          },
          _active: { filter: 'brightness(0.95)' },
          borderRadius: 'full',
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          borderRadius: 'full',
        },
      },
    },
    Tooltip: {
      baseStyle: {
        borderRadius: 'md',
        px: 2.5,
        py: 1.5,
        boxShadow: 'soft',
      },
    },
    Modal: {
      baseStyle: {
        dialog: {
          bg: 'surface.elevated',
          boxShadow: 'softLg',
          backdropFilter: 'saturate(1.05) blur(8px)',
        },
      },
    },
    Badge: {
      baseStyle: {
        borderRadius: 'full',
        fontWeight: 'semibold',
      },
    },
    Link: {
      baseStyle: {
        _hover: { textDecoration: 'none', opacity: 0.9 },
      },
    },
  },
});

export default theme;
