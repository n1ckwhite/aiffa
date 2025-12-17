---
{
  "slug": "nodejs-event-loop-na-palcah",
  "title": "Node.js event loop — на пальцах",
  "description": "Очереди, microtasks и почему setTimeout(0) не всегда \"сразу\".",
  "date": "2025-12-11",
  "tags": ["Node.js", "База"],
  "readingTime": "7 мин",
  "coverImage": "/images/blog/1.avif",
  "author": { "name": "aiffadev", "github": "aiffadev" }
}
---

# Node.js event loop — на пальцах

Ключевая идея: есть разные очереди задач, и порядок их обработки важен.

## Практика

Сравните `Promise.resolve().then()` и `setTimeout(() => ..., 0)` в одном скрипте.


