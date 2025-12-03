import { keyframes } from "@emotion/react";

export const prizeGlow = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(236, 72, 153, 0.45);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(236, 72, 153, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(236, 72, 153, 0);
  }
`;

export const prizeBlobA = keyframes`
  0% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(18px, -14px, 0) scale(1.06);
  }
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
`;

export const prizeBlobB = keyframes`
  0% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(-16px, 18px, 0) scale(1.08);
  }
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
`;

export const prizeShimmer = keyframes`
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
    transform: translateX(150%);
    opacity: 0;
  }
`;
