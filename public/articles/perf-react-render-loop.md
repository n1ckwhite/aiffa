---
{
  "slug": "perf-react-render-loop",
  "title": "Почему компонент рендерится 100 раз: чек-лист",
  "description": "Типовые причины рендер-лупов и как быстро локализовать источник.",
  "date": "2025-12-04",
  "tags": ["React", "Performance"],
  "readingTime": "7 мин",
  "coverImage": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=80",
  "author": { "name": "n1ckwhite", "github": "n1ckwhite" }
}
---

# Почему компонент рендерится 100 раз: чек-лист

Проверьте в порядке:

1. state в родителе
2. эффекты без зависимостей
3. новые объекты/функции в props


