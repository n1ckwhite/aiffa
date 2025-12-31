import { ColorModeScript } from "@chakra-ui/react";
import theme from "@/shared/theme/theme";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "http://localhost:3000";

/**
 * App Router head (Next-managed).
 * Important: keep metadata tags inside real <head> so Lighthouse can detect them.
 */
const Head = () => {
  return (
    <>
      <ColorModeScript type="cookie" initialColorMode={theme.config.initialColorMode} />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: SITE_URL,
            name: "AIFFA — платформа для роста разработчиков",
            potentialAction: {
              "@type": "SearchAction",
              target: `${SITE_URL}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            url: SITE_URL,
            name: "AIFFA",
            logo: `${SITE_URL}/icons/icon.svg`,
          }),
        }}
      />
    </>
  );
};

export default Head;


