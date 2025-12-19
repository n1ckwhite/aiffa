import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppColors } from "@/shared/theme/colors";
import { useBlogArticles } from "../../../../hooks/useBlogArticles";
import { useBlogScreenColors } from "../../colors/useBlogScreenColors/useBlogScreenColors";
import { BLOG_TAG_FILTERS, matchesTagFilter, normalizeTag } from "../../lib/tags/tags";
import type { BlogTagFilter } from "../../lib/tags/types";
import { useDebouncedSetter } from "../useDebouncedSetter";
import { useBlogHotkeys } from "../useBlogHotkeys/useBlogHotkeys";
import { BlogScreenController } from "./types";

type UseBlogScreenControllerParams = {
  initialPage?: number;
  initialQuery?: string;
  initialTag?: string;
};

const clampPage = (value: number, totalPages: number) => {
  const safe = Number.isFinite(value) ? value : 1;
  const safeTotal = Number.isFinite(totalPages) && totalPages > 0 ? totalPages : 1;
  return Math.min(Math.max(safe, 1), safeTotal);
};

const makePageItems = (total: number, current: number, radius = 2, fullLimit = 7) => {
  if (total <= fullLimit) return Array.from({ length: total }, (_, i) => i + 1) as (number | string)[];
  const items: (number | string)[] = [];
  items.push(1);
  const left = Math.max(2, current - radius);
  const right = Math.min(total - 1, current + radius);
  if (left > 2) items.push("…");
  for (let i = left; i <= right; i++) items.push(i);
  if (right < total - 1) items.push("…");
  items.push(total);
  return items;
};

const buildBlogHref = (params: { page: number; q?: string; tag?: BlogTagFilter }) => {
  const safePage = Number.isFinite(params.page) && params.page > 0 ? params.page : 1;
  const basePath = safePage <= 1 ? "/blog" : `/blog?page=${safePage}`;

  const sp = new URLSearchParams();
  const q = (params.q ?? "").trim();
  if (q) sp.set("q", q);
  if (params.tag && params.tag !== "Все") sp.set("tag", params.tag);
  const nextSearch = sp.toString();
  return nextSearch ? `${basePath}${basePath.includes("?") ? "&" : "?"}${nextSearch}` : basePath;
};

export const useBlogScreenController = ({
  initialPage,
  initialQuery,
  initialTag,
}: UseBlogScreenControllerParams): BlogScreenController => {
  const theme = useAppColors();
  const colors = useBlogScreenColors(theme);
  const location = useLocation();
  const navigate = useNavigate();

  const searchInputRef = React.useRef<HTMLInputElement | null>(null);

  const safeInitialQuery = (initialQuery ?? "").toString();
  const safeInitialTag = React.useMemo<BlogTagFilter>(() => {
    const tag = (initialTag ?? "").trim();
    const found = BLOG_TAG_FILTERS.find((t) => t !== "Все" && normalizeTag(t) === normalizeTag(tag));
    return found ?? "Все";
  }, [initialTag]);

  const { items, isLoading } = useBlogArticles();
  const [query, setQuery] = React.useState<string>(safeInitialQuery);
  const [debouncedQuery, setDebouncedQuery] = React.useState<string>(safeInitialQuery);
  const [tagFilter, setTagFilter] = React.useState<BlogTagFilter>(safeInitialTag);

  const articles = React.useMemo(() => items.slice().sort((a, b) => (a.date < b.date ? 1 : -1)), [items]);
  const normalizedQuery = React.useMemo(() => debouncedQuery.trim().toLowerCase(), [debouncedQuery]);

  const filteredArticles = React.useMemo(() => {
    const base = normalizedQuery
      ? articles.filter((a) => {
          const haystack = [
            a.title,
            a.description,
            (a.tags || []).join(" "),
            a.author?.name,
            a.author?.github,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();
          return haystack.includes(normalizedQuery);
        })
      : articles;

    if (tagFilter === "Все") return base;
    return base.filter((a) => matchesTagFilter(a, tagFilter));
  }, [articles, normalizedQuery, tagFilter]);

  const isEmptyResults = !isLoading && filteredArticles.length === 0;

  const pageSize = 6;
  const totalPages = React.useMemo(
    () => Math.max(1, Math.ceil(filteredArticles.length / pageSize)),
    [filteredArticles.length],
  );
  const page = React.useMemo(() => clampPage(Number(initialPage ?? 1), totalPages), [initialPage, totalPages]);
  const start = React.useMemo(() => (page - 1) * pageSize, [page, pageSize]);
  const end = React.useMemo(() => start + pageSize, [start, pageSize]);
  const canPrev = page > 1;
  const canNext = page < totalPages;
  const pageItems = React.useMemo<(number | string)[]>(() => makePageItems(totalPages, page, 2, 7), [totalPages, page]);
  const pageArticles = React.useMemo(() => filteredArticles.slice(start, end), [filteredArticles, start, end]);

  useDebouncedSetter(query, setDebouncedQuery, 220);

  React.useEffect(() => {
    // если сервер прислал другие initial props (клиентская навигация),
    // синхронизируем controlled state.
    if (safeInitialQuery !== query) {
      setQuery(safeInitialQuery);
      setDebouncedQuery(safeInitialQuery);
    }
    if (safeInitialTag !== tagFilter) {
      setTagFilter(safeInitialTag);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeInitialQuery, safeInitialTag]);

  React.useEffect(() => {
    // query/tag меняются только с JS, поэтому URL-синк тут — “прогрессивное улучшение”.
    // При изменении фильтров сбрасываем страницу на 1.
    const desiredHref = buildBlogHref({ page: 1, q: query, tag: tagFilter });
    const currentHref = `${location.pathname}${location.search}`;
    if (desiredHref !== currentHref) {
      navigate(desiredHref, { replace: true, scroll: false });
    }
  }, [query, tagFilter, location.pathname, location.search, navigate]);

  useBlogHotkeys({ query, setQuery, searchInputRef });

  const getPageHref = React.useCallback(
    (targetPage: number) => buildBlogHref({ page: targetPage, q: query, tag: tagFilter }),
    [query, tagFilter],
  );

  return {
    theme,
    colors,
    query,
    setQuery,
    debouncedQuery,
    tagFilter,
    setTagFilter,
    searchInputRef,
    isLoading,
    isEmptyResults,
    pageArticles,
    pageSize,
    page,
    totalPages,
    canPrev,
    canNext,
    pageItems,
    getPageHref,
  };
};


