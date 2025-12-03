import { keyframes } from "@emotion/react";

export const cardGlow = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.55);
  }
  70% {
    box-shadow: 0 0 0 18px rgba(59, 130, 246, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
`;

export const shimmer = keyframes`
  0% {
    transform: translateX(-40%);
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    transform: translateX(140%);
    opacity: 0;
  }
`;

export const floatBlobA = keyframes`
  0% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(12px, -18px, 0) scale(1.05);
  }
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
`;

export const floatBlobB = keyframes`
  0% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(-16px, 12px, 0) scale(1.08);
  }
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
`;


