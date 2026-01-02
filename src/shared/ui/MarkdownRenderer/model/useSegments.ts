import React from 'react';
import { linkifyTextLines } from './linkifyTextLines';
import type { MdSegment } from '../ui/MarkdownRenderer/types';

export const useSegments = (content: string): MdSegment[] => {
  return React.useMemo(() => {
    const preprocessed = linkifyTextLines(content);
    const re = /<details>\s*<summary>([\s\S]*?)<\/summary>\s*([\s\S]*?)<\/details>/gi;
    const out: MdSegment[] = [];
    let lastIdx = 0;
    let match: RegExpExecArray | null;
    let hasDetails = false;

    while ((match = re.exec(preprocessed))) {
      hasDetails = true;
      if (match.index > lastIdx) {
        out.push({ type: 'md', text: linkifyTextLines(preprocessed.slice(lastIdx, match.index)) });
      }
      out.push({ type: 'details', summary: match[1].trim(), body: linkifyTextLines(match[2].trim()) });
      lastIdx = re.lastIndex;
    }

    if (!hasDetails) return [];

    if (lastIdx < preprocessed.length) {
      out.push({ type: 'md', text: linkifyTextLines(preprocessed.slice(lastIdx)) });
    }
    return out;
  }, [content]);
};


