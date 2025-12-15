"use client";

import React from "react";
import type { CSSProperties } from "react";
import NextImage, { type StaticImageData } from "next/image";

type OptimizedIconImageProps = {
  src: StaticImageData;
  alt: string;
  /**
   * Базовая ширина/высота иконки в десктопном контейнере.
   * Вёрстка всё равно масштабирует картинку до 100% контейнера,
   * но эти значения помогают Next подобрать правильные размеры.
   */
  width: number;
  height: number;
  sizes?: string;
  priority?: boolean;
  fetchPriority?: 'auto' | 'high' | 'low';
  style?: CSSProperties;
};

const OptimizedIconImage: React.FC<OptimizedIconImageProps> = ({
  src,
  alt,
  width,
  height,
  sizes = "(max-width: 768px) 70vw, 350px",
  priority = false,
  fetchPriority = 'auto',
  style,
}) => {
  return (
    <NextImage
      src={src}
      alt={alt}
      sizes={sizes}
      fetchPriority={fetchPriority}
      priority={priority}
      width={width}
      height={height}
      style={{
        width: "100%",
        height: "auto",
        objectFit: "contain",
        ...style,
      }}
    />
  );
};

export default OptimizedIconImage;


