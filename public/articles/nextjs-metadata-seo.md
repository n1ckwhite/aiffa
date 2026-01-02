# Next.js Metadata: как сделать SEO без боли

## База: title и description

```ts
import type { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Статья — AIFFA",
    description: "Короткое понятное описание страницы",
  };
};
```

## Canonical и OpenGraph

### Canonical

Нужен, чтобы не плодить дубликаты страниц (например, с `?page=`).

### OpenGraph

Нужен для превью в мессенджерах.

## Заключение

Делай простое и корректное SEO по умолчанию, а “сложное” добавляй только если есть смысл (Article/FAQ/Breadcrumbs).


