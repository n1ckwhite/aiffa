import type { Ring } from '../types';

export const getRing = (scheme?: string): Ring => {
  const s = (scheme || 'blue').toLowerCase();
  switch (s) {
    case 'cyan': return { from: '#22d3ee', to: '#06b6d4' };
    case 'orange': return { from: '#fbbf24', to: '#f59e0b' };
    case 'yellow': return { from: '#fde047', to: '#eab308' };
    case 'green': return { from: '#4ade80', to: '#22c55e' };
    case 'red': return { from: '#f87171', to: '#ef4444' };
    case 'teal': return { from: '#2dd4bf', to: '#14b8a6' };
    case 'purple': return { from: '#c084fc', to: '#a855f7' };
    case 'blue':
    default:
      return { from: '#93c5fd', to: '#3b82f6' };
  }
};


