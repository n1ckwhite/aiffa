import { keyframes } from "@emotion/react";

export const sessionHighlightGlow = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.35);
    transform: translateY(0);
  }
  60% {
    box-shadow: 0 0 0 18px rgba(56, 189, 248, 0);
    transform: translateY(-1px);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(56, 189, 248, 0);
    transform: translateY(0);
  }
`;

export const detailCardGlow = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const iconIdleFloat = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-1px);
  }
  100% {
    transform: translateY(0);
  }
`;


