import React from "react";
import { Box, Image, Skeleton, useColorModeValue } from "@chakra-ui/react";
import { BLOG_CARD_COVER_SIZES, buildUnsplashSrcSet, normalizeUnsplashUrl } from "@/shared/articles/unsplash";

export type BlogCoverImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
};

/**
 * Blog cover image with skeleton placeholder.
 * Handles cached images and keeps "eager" loading to avoid flaky WebView lazy-loading.
 */
export const BlogCoverImage: React.FC<BlogCoverImageProps> = ({ src, alt, priority = false }) => {
  const [loadState, setLoadState] = React.useState<"loading" | "loaded" | "error">("loading");
  const imgRef = React.useRef<HTMLImageElement | null>(null);
  const skeletonStartColor = useColorModeValue("blackAlpha.50", "whiteAlpha.100");
  const skeletonEndColor = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const fallbackBg = useColorModeValue("blackAlpha.50", "whiteAlpha.100");
  const srcSet = React.useMemo(() => buildUnsplashSrcSet(src), [src]);
  const normalizedSrc = React.useMemo(() => (srcSet ? normalizeUnsplashUrl(src, { width: 680 }) : src), [src, srcSet]);

  React.useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    // If the image was loaded from cache before React attached onLoad, complete will be true.
    if (img.complete && img.naturalWidth > 0) {
      setLoadState("loaded");
    }
  }, [normalizedSrc]);

  return (
    <Box position="relative" w="100%" h="100%">
      <Skeleton
        position="absolute"
        inset={0}
        borderRadius="inherit"
        startColor={skeletonStartColor}
        endColor={skeletonEndColor}
        isLoaded={loadState !== "loading"}
      />
      {loadState === "error" ? (
        <Box position="absolute" inset={0} borderRadius="inherit" bg={fallbackBg} />
      ) : (
        <Image
          ref={imgRef}
          src={normalizedSrc}
          srcSet={srcSet}
          sizes={srcSet ? BLOG_CARD_COVER_SIZES : undefined}
          alt={alt}
          // In iOS/Telegram webviews lazy-loading can be unreliable; keep covers eager to prevent "missing" images.
          loading="eager"
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          referrerPolicy="no-referrer"
          objectFit="cover"
          w="100%"
          h="100%"
          borderRadius="0"
          opacity={loadState === "loaded" ? 1 : 0}
          transition="opacity 220ms ease"
          onLoad={() => setLoadState("loaded")}
          onError={() => setLoadState("error")}
        />
      )}
    </Box>
  );
};


