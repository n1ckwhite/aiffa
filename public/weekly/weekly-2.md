---
{
  "id": "weekly-2",
  "title": "Центрирование карточки Flexbox‑ом",
  "description": "Отцентрируйте блок .card по центру экрана по вертикали и горизонтали с помощью Flexbox.",
  "author": { "name": "Nick White", "github": "n1ckwhite", "url": "https://github.com/n1ckwhite" },
  "level": "Средний",
  "tip": "Используйте min-height: 100vh на контейнере и выравнивание по осям.",
  "editorLanguage": "css",
  "tag": "CSS"
}
---

### Задача

Отцентрируйте `.card` в центре окна:

- контейнер `.page` занимает высоту окна;
- `.page` использует Flexbox для центрирования по обеим осям.

```example:css
.page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  padding: 16px 20px;
  border-radius: 12px;
  background: #0ea5e9;
  color: #fff;
}
```

```validator
function validate(input) {
  const s = String(input || '').toLowerCase();
  const hasPage = /\.page\s*\{[\s\S]*?\}/.test(s);
  const hasMinH = /min-height\s*:\s*100vh/.test(s);
  const hasFlex = /display\s*:\s*flex/.test(s);
  const hasCenter = /justify-content\s*:\s*center/.test(s) && /align-items\s*:\s*center/.test(s);
  const ok = hasPage && hasMinH && hasFlex && hasCenter;
  return ok || { ok: false, msg: 'Нужны .page с 100vh, display:flex и центрирование по осям' };
}
```


