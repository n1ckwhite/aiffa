import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import { Box } from '@chakra-ui/react';
import type { MarkdownRendererProps } from './types';
import { useMarkdownColors } from '../colors/useMarkdownColors';
import { buildComponents } from '../../model/buildComponents';
import { useSegments } from '../../model/useSegments';
import { useOpenDetails } from '../../model/useOpenDetails';
import { DetailsBlock } from '../parts/DetailsBlock';

const MarkdownRendererInner: React.FC<MarkdownRendererProps> = ({ content }) => {
  const colors = useMarkdownColors();
  const components = buildComponents(colors);
  const segments = useSegments(content);
  const { openIdx, toggle } = useOpenDetails(content);

  const renderMd = (md: string, key?: React.Key) => (
    <ReactMarkdown
      key={key}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'append', properties: { className: 'md-anchor' } }], rehypeHighlight]}
      components={components}
    >
      {md}
    </ReactMarkdown>
  );

  return (
    <Box className="md-content" w="100%" maxW="840px" mx="auto">
      {segments.length === 0
        ? renderMd(content)
        : segments.map((seg, i) =>
            seg.type === 'md'
              ? renderMd(seg.text, `md-${i}`)
              : (
                  <DetailsBlock
                  key={`det-${i}`}
                    idx={i}
                    summary={seg.summary}
                    body={seg.body}
                  bodyNode={renderMd(seg.body, `details-body-${i}`)}
                    open={openIdx === i}
                    onToggle={() => toggle(i)}
                  />
              )
          )}
    </Box>
  );
};

export const MarkdownRenderer = React.memo(MarkdownRendererInner);

export default MarkdownRenderer;


