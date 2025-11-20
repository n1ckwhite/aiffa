export type MarkdownRendererProps = { content: string };

export type MdSegment =
  | { type: 'md'; text: string }
  | { type: 'details'; summary: string; body: string };


