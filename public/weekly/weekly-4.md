---
{
  "id": "weekly-4",
  "title": "Фокус‑стиль для кнопки",
  "description": "Добавьте видимый outline для кнопки при фокусе клавиатурой.",
  "author": { "name": "PetePearl", "github": "PetePearl", "url": "https://github.com/PetePearl" },
  "level": "Начальный",
  "tip": "Используйте :focus-visible, чтобы не мешать пользователям мыши.",
  "editorLanguage": "css",
  "tag": "CSS"
}
---

### Задача

Стилизуйте `.btn`, чтобы при фокусе клавиатурой у неё показывалась видимая рамка:

- используйте `:focus` или `:focus-visible`;
- рамка не должна перекрывать содержимое (например, `outline` или `box-shadow`).

```example:css
.btn {
  padding: 10px 16px;
  border-radius: 10px;
  background-color: #2563eb;
  color: #fff;
  border: none;
}

.btn:focus-visible {
  outline: 2px solid #60a5fa;
  outline-offset: 2px;
}
```

```validator
function validate(input) {
  const s = String(input || '').toLowerCase();
  const hasFocus = /\.btn\s*:\s*(focus|focus-visible)\s*\{[\s\S]*?\}/.test(s);
  const hasOutline = /(outline|box-shadow)\s*:\s*[^;]+;/.test(s);
  const ok = hasFocus && hasOutline;
  return ok || { ok: false, msg: 'Нужны .btn:focus(/:focus-visible) и outline/box-shadow' };
}
```


