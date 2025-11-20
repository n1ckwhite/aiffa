import { keyframes } from '@emotion/react';


export const buildTopBarBefore = (levelAccent: string) => ({
  content: '""',
  position: 'absolute' as const,
  top: 0,
  left: 0,
  right: 0,
  height: '3px',
  bg: levelAccent,
  transform: 'scaleX(0)',
  transformOrigin: 'left',
  transition: 'transform 0.3s ease-in-out',
});




export const glowLine = keyframes`0% { transform: scaleX(0); } 100% { transform: scaleX(1); }`;
export const arrowLoop = keyframes`0% { transform: translateX(0); } 50% { transform: translateX(4px); } 100% { transform: translateX(0); }`;


