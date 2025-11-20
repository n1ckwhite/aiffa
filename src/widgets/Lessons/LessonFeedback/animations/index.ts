import { keyframes } from '@emotion/react';

export const pressUp = keyframes`
  0% { transform: scale(1) translate(0, 0) rotate(0deg); }
  45% { transform: scale(1.12) translate(3px, -3px) rotate(-6deg); }
  100% { transform: scale(1) translate(0, 0) rotate(0deg); }
`;

export const pressDown = keyframes`
  0% { transform: scale(1) translate(0, 0) rotate(0deg); }
  45% { transform: scale(1.12) translate(3px, 3px) rotate(6deg); }
  100% { transform: scale(1) translate(0, 0) rotate(0deg); }
`;


