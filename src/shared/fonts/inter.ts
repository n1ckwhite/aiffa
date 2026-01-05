import localFont from "next/font/local";


export const interFont = localFont({
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: [
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Arial",
    "Noto Sans",
    "Apple Color Emoji",
    "Segoe UI Emoji",
  ],
  src: [
    { path: "./library/Inter_28pt-Regular.woff2", weight: "400", style: "normal" },
    { path: "./library/Inter_28pt-Italic.woff2", weight: "400", style: "italic" },

    { path: "./library/Inter_28pt-Medium.woff2", weight: "500", style: "normal" },

    { path: "./library/Inter_28pt-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "./library/Inter_28pt-SemiBoldItalic.woff2", weight: "600", style: "italic" },

    { path: "./library/Inter_28pt-Bold.woff2", weight: "700", style: "normal" },
    { path: "./library/Inter_28pt-BoldItalic.woff2", weight: "700", style: "italic" },
  ],
});


