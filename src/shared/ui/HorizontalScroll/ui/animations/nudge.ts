import { keyframes } from '@emotion/react';

export const nudgeRight = keyframes`
  0% { transform: translateX(0); }
  50% { transform: translateX(4px); }
  100% { transform: translateX(0); }
`;

export const nudgeLeft = keyframes`
  0% { transform: translateX(0); }
  50% { transform: translateX(-4px); }
  100% { transform: translateX(0); }
`;


