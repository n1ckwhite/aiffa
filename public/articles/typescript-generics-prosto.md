---
{
  "slug": "typescript-generics-prosto",
  "title": "TypeScript Generics — просто и по делу",
  "description": "Как читать и писать дженерики, чтобы типы помогали, а не мешали.",
  "date": "2025-12-15",
  "tags": ["TypeScript", "Практика"],
  "readingTime": "8 мин",
  "coverImage": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=80",
  "author": { "name": "aiffadev", "github": "aiffadev" }
}
---

# TypeScript Generics — просто и по делу

Дженерики — это способ описать «тип, который станет известен позже».

## Мини‑пример

`Array<T>` — это массив элементов типа `T`.

## Практика

Сделайте функцию `identity<T>(value: T): T` и попробуйте вызвать её с разными типами.

---
{
  "slug": "typescript-generics-prosto",
  "title": "TypeScript Generics — просто и по делу",
  "description": "Как читать и писать дженерики, чтобы типы помогали, а не мешали.",
  "date": "2025-12-15",
  "tags": ["TypeScript", "Практика"],
  "readingTime": "8 мин",
  "coverImage": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=80",
  "author": { "name": "aiffadev", "github": "aiffadev" }
}
---

# TypeScript Generics — просто и по делу

Генерики нужны, чтобы описывать **обобщённые** функции/типы без потери безопасности.

## TL;DR
- `T` — это “тип‑параметр”.
- Генерики работают лучше, когда TS может вывести тип сам.
- Не усложняйте API: сначала простое, потом — расширение.


