import React from 'react';
import { linkifyTextLines } from './linkifyTextLines';
import type { MdSegment } from '../ui/MarkdownRenderer/types';

export const useSegments = (content: string): MdSegment[] => {
  const [segments, setSegments] = React.useState<MdSegment[]>([]);

  React.useEffect(() => {
    const out: MdSegment[] = [];
    const re = /<details>\s*<summary>([\s\S]*?)<\/summary>\s*([\s\S]*?)<\/details>/gi;
    let lastIdx = 0;
    let match: RegExpExecArray | null;
    const preprocessed = linkifyTextLines(content);
    while ((match = re.exec(preprocessed))) {
      if (match.index > lastIdx) {
        out.push({ type: 'md', text: linkifyTextLines(preprocessed.slice(lastIdx, match.index)) });
      }
      out.push({ type: 'details', summary: match[1].trim(), body: linkifyTextLines(match[2].trim()) });
      lastIdx = re.lastIndex;
    }
    if (lastIdx < preprocessed.length) {
      out.push({ type: 'md', text: linkifyTextLines(preprocessed.slice(lastIdx)) });
    }
    setSegments(out);
  }, [content]);

  return segments;
};


