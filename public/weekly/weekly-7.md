---
{
  "id": "weekly-7",
  "title": "Адаптивная сетка 1→3 колонки",
  "description": "Сделайте сетку: одна колонка на мобильных и три колонки на широких экранах.",
  "author": { "name": "PetePearl", "github": "PetePearl", "url": "https://github.com/PetePearl" },
  "level": "Средний",
  "tip": "Используйте display: grid и media‑query.",
  "editorLanguage": "css",
  "tag": "CSS"
}
---

### Задача

Стилизуйте контейнер `.grid`:

- по умолчанию — одна колонка;
- начиная с 1024px — три колонки одинаковой ширины.

```example:css
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

```validator
function validate(input) {
  const s = String(input || '').toLowerCase();
  const hasGrid = /\.grid\s*\{[\s\S]*display\s*:\s*grid[\s\S]*\}/.test(s);
  const hasOne = /grid-template-columns\s*:\s*1fr/.test(s);
  const hasMedia = /@media\s*\(min-width\s*:\s*1024px\)[\s\S]*\.grid[\s\S]*grid-template-columns\s*:\s*repeat\(3,\s*1fr\)/.test(s);
  const ok = hasGrid && hasOne && hasMedia;
  return ok || { ok: false, msg: 'Нужны display:grid, 1 колонка и media на 3 колонки' };
}
```


