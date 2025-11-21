import React from 'react';
import { Box } from '@chakra-ui/react';
import { norm } from './search';

export const highlightText = (text: string, query: string, markBg: string) => {
  const Q = norm(query);
  if (!Q) return text;
  const tokens = Q.split(' ').filter(Boolean).sort((a, b) => b.length - a.length);
  let out: Array<{ part: string; mark: boolean }> = [{ part: text, mark: false }];
  for (const tok of tokens) {
    const next: Array<{ part: string; mark: boolean }> = [];
    for (const seg of out) {
      if (seg.mark) { next.push(seg); continue; }
      const lower = seg.part.toLowerCase().replace(/ё/g, 'е');
      const idx = lower.indexOf(tok);
      if (idx === -1) { next.push(seg); continue; }
      next.push({ part: seg.part.slice(0, idx), mark: false });
      next.push({ part: seg.part.slice(idx, idx + tok.length), mark: true });
      next.push({ part: seg.part.slice(idx + tok.length), mark: false });
    }
    out = next;
  }
  const markColor = markBg === 'whiteAlpha.300' ? 'blue.100' : 'inherit';
  return out.map((seg, i) =>
    seg.mark
      ? (
        <Box
          as="mark"
          key={i}
          bg={markBg}
          color={markColor}
          px={0.5}
          borderRadius="sm"
        >
          {seg.part}
        </Box>
      )
      : (<React.Fragment key={i}>{seg.part}</React.Fragment>)
  );
};



