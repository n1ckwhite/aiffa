import { keyframes } from "@emotion/react";

export const communityCardFloat = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
  100% {
    transform: translateY(0);
  }
`;

export const communityMetricPulse = keyframes`
  0% {
    transform: translateY(0) scale(1);
    text-shadow: 0 0 0 rgba(56, 189, 248, 0.0);
  }
  50% {
    transform: translateY(-1px) scale(1.04);
    text-shadow: 0 0 18px rgba(56, 189, 248, 0.6);
  }
  100% {
    transform: translateY(0) scale(1);
    text-shadow: 0 0 0 rgba(56, 189, 248, 0.0);
  }
`;


