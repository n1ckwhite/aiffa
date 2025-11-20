import { keyframes } from '@emotion/react';

export const driftA = keyframes`
  0% { transform: translate3d(0, 0, 0) scale(1); }
  50% { transform: translate3d(30px, -20px, 0) scale(1.05); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
`;

export const driftB = keyframes`
  0% { transform: translate3d(0, 0, 0) scale(1); }
  50% { transform: translate3d(-40px, 20px, 0) scale(1.08); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
`;

export const driftC = keyframes`
  0% { transform: translate3d(0, 0, 0) scale(1); }
  50% { transform: translate3d(20px, 30px, 0) scale(1.03); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
`;



