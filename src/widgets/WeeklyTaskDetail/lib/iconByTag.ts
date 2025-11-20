import { FaHtml5, FaJs, FaReact } from 'react-icons/fa6';
import { SiGo, SiCss3, SiTypescript, SiNodedotjs, SiGit, SiReact } from 'react-icons/si';
import React from 'react';

export function iconByTag(tag?: string): React.ElementType {
  switch ((tag || '').toUpperCase()) {
    case 'REACT': return FaReact as unknown as React.ElementType;
    case 'REACTNATIVE':
    case 'RN': return SiReact as unknown as React.ElementType;
    case 'HTML': return FaHtml5 as unknown as React.ElementType;
    case 'JS': return FaJs as unknown as React.ElementType;
    case 'GO': return SiGo as unknown as React.ElementType;
    case 'CSS': return SiCss3 as unknown as React.ElementType;
    case 'TS':
    case 'TYPESCRIPT': return SiTypescript as unknown as React.ElementType;
    case 'NODE':
    case 'NODEJS': return SiNodedotjs as unknown as React.ElementType;
    case 'GIT': return SiGit as unknown as React.ElementType;
    default: return FaJs as unknown as React.ElementType;
  }
}


