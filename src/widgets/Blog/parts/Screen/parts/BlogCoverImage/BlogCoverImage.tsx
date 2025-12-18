import React from "react";
import { Box, Image, Skeleton } from "@chakra-ui/react";
import { BLOG_CARD_COVER_SIZES } from "@/shared/articles/unsplash";
import { useBlogArticleCoverColors } from "./colors/useBlogArticleCover";
import type { BlogCoverImageProps } from "./types";
import { useBlogCoverImageState } from "./hooks/useBlogCoverImageState";

export const BlogCoverImage: React.FC<BlogCoverImageProps> = ({ src, alt, priority = false }) => {
  const { skeletonStartColor, skeletonEndColor, fallbackBg } = useBlogArticleCoverColors();
  const { imgRef, loadState, normalizedSrc, srcSet, markLoaded, markError } = useBlogCoverImageState(src);

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
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          referrerPolicy="no-referrer"
          objectFit="cover"
          w="100%"
          h="100%"
          borderRadius="0"
          opacity={loadState === "loaded" ? 1 : 0}
          transition="opacity 220ms ease"
          onLoad={markLoaded}
          onError={markError}
        />
      )}
    </Box>
  );
};


