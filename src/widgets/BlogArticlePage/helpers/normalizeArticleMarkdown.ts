type NormalizeArticleMarkdownParams = {
  markdown: string;
  articleTitle: string;
};

/**
 * Убираем дублирующий заголовок/строку автора в markdown, т.к. они уже есть в шапке страницы.
 * Важно: делаем это детерминированно (без зависимостей от client-only состояния), чтобы не было hydration mismatch.
 */
export const normalizeArticleMarkdown = ({
  markdown,
  articleTitle,
}: NormalizeArticleMarkdownParams): string => {
  const raw = (markdown || "").replace(/\r\n/g, "\n");
  if (!raw.trim()) return raw;

  const lines = raw.split("\n");

  const first = (lines[0] || "").trim();
  if (first === `# ${articleTitle}`) {
    lines.shift();
    if ((lines[0] || "").trim() === "") lines.shift();
  }

  const maybeAuthorLine = (lines[0] || "").trim().toLowerCase();
  if (maybeAuthorLine.startsWith("автор:")) {
    lines.shift();
    if ((lines[0] || "").trim() === "") lines.shift();
  }

  return lines.join("\n").trimStart();
};


