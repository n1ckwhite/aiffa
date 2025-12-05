"use client";

import React from "react";
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
};

const OptimizedIconImage: React.FC<OptimizedIconImageProps> = ({
  src,
  alt,
  width,
  height,
  sizes = "(max-width: 768px) 70vw, 350px",
  priority = false,
}) => {
  return (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
      }}
    />
  );
};

export default OptimizedIconImage;


