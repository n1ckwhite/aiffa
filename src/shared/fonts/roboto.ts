import localFont from "next/font/local";


export const robotoFont = localFont({
  variable: "--font-roboto",
  display: "swap",
  src: [
    { path: "./library/Roboto-Thin.woff2", weight: "100", style: "normal" },
    { path: "./library/Roboto-ThinItalic.woff2", weight: "100", style: "italic" },

    { path: "./library/Roboto-ExtraLight.woff2", weight: "200", style: "normal" },
    { path: "./library/Roboto-ExtraLightItalic.woff2", weight: "200", style: "italic" },

    { path: "./library/Roboto-Light.woff2", weight: "300", style: "normal" },
    { path: "./library/Roboto-LightItalic.woff2", weight: "300", style: "italic" },

    { path: "./library/Roboto-Regular.woff2", weight: "400", style: "normal" },
    { path: "./library/Roboto-Italic.woff2", weight: "400", style: "italic" },

    { path: "./library/Roboto-Medium.woff2", weight: "500", style: "normal" },
    { path: "./library/Roboto-MediumItalic.woff2", weight: "500", style: "italic" },

    { path: "./library/Roboto-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "./library/Roboto-SemiBoldItalic.woff2", weight: "600", style: "italic" },

    { path: "./library/Roboto-Bold.woff2", weight: "700", style: "normal" },
    { path: "./library/Roboto-BoldItalic.woff2", weight: "700", style: "italic" },

    { path: "./library/Roboto-ExtraBold.woff2", weight: "800", style: "normal" },
    { path: "./library/Roboto-ExtraBoldItalic.woff2", weight: "800", style: "italic" },

    { path: "./library/Roboto-Black.woff2", weight: "900", style: "normal" },
    { path: "./library/Roboto-BlackItalic.woff2", weight: "900", style: "italic" },
  ],
});


