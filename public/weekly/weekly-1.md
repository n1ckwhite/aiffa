---
{
  "id": "weekly-1",
  "title": "Кнопка с hover‑эффектом и плавной анимацией",
  "description": "Стилизуйте кнопку: базовые стили, эффект наведения и плавная анимация перехода.",
  "author": { "name": "PetePearl", "github": "PetePearl", "url": "https://github.com/PetePearl" },
  "level": "Начальный",
  "tip": "Добавьте плавный transition и лёгкий hover‑эффект — так кнопка ощущается живее.",
  "editorLanguage": "css",
  "tag": "CSS"
}
---

### Задача

Стилизуйте кнопку с классом `.btn`:

- базовые стили: отступы, скругление, фоновый цвет, цвет текста;
- при наведении (`:hover`) — изменение фона/тени/масштаба;
- плавная анимация с помощью `transition`.

```example:css
.btn {
  padding: 10px 16px;
  border-radius: 10px;
  background-color: #2563eb;
  color: #fff;
  transition: all 0.2s ease;
}

.btn:hover {
  background-color: #1d4ed8;
  transform: translateY(-1px) scale(1.02);
  box-shadow: 0 6px 16px rgba(37,99,235,0.35);
}
```

```validator
function validate(input) {
  const s = String(input || '').toLowerCase();
  const hasClass = /\.btn\s*\{[\s\S]*?\}/.test(s);
  const hasHover = /\.btn\s*:\s*hover\s*\{[\s\S]*?\}/.test(s);
  const hasTransition = /transition\s*:\s*[^;]+;/.test(s);
  const ok = hasClass && hasHover && hasTransition;
  return ok || { ok: false, msg: 'Нужны .btn, .btn:hover и transition' };
}
```


