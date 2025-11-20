import { keyframes } from '@emotion/react';

export const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(16,185,129,0.0); transform: scale(1); }
  70% { box-shadow: 0 0 0 8px rgba(16,185,129,0.08); }
  100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.0); transform: scale(1); }
`;


