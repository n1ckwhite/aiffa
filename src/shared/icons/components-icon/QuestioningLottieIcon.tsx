"use client";

import React from "react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import questioningAnimation from "@/shared/icons/json-icons/questioning.json";
import questioningIcon from "@/shared/icons/webp-icons/questioning-icon.webp";
import OptimizedIconImage from "@/shared/icons/components-icon/OptimizedIconImage";

const QuestioningLottieIcon: React.FC = () => {
  return (
    <LazyLottieIcon
      animationData={questioningAnimation}
      boxProps={{
        w: { base: "200px", md: "200px" },
        aspectRatio: 1080 / 1080,
        mx: "auto",
      }}
      fallback={
        <OptimizedIconImage
          src={questioningIcon}
          alt="Иконка вопроса"
          width={200}
          height={200}
          sizes="200px"
        />
      }
    />
  );
};

export default QuestioningLottieIcon;


