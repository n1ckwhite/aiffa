import { keyframes } from '@emotion/react';

export const fadeInUp = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

export const arrowSlide = keyframes`
  0% { transform: translateX(0); }
  50% { transform: translateX(4px); }
  100% { transform: translateX(0); }
`;

export const iconBounce = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
`;


