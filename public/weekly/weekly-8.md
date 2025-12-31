---
{
  "id": "weekly-8",
  "title": "Реализуйте функцию debounce",
  "description": "Напишите debounce(fn, delay) — возвращает функцию, откладывающую вызов.",
  "author": { "name": "Nick White", "github": "n1ckwhite", "url": "https://github.com/n1ckwhite" },
  "level": "Продвинутый",
  "tip": "Используйте таймер и замыкание для хранения id.",
  "editorLanguage": "javascript",
  "tag": "JS"
}
---

### Задача

Реализуйте `debounce(fn, delay)`:

- первый аргумент — функция;
- второй — задержка в миллисекундах;
- вернуть функцию, которая вызывает `fn` не чаще, чем раз в `delay` после остановки вызовов.

```example:javascript
function debounce(fn, delay) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(null, args), delay);
  };
}
```

```example:python
function debounce(fn, delay) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(null, args), delay);
  };
}
```

```validator
function validate(input) {
  const s = String(input || '').toLowerCase();
  const hasDecl = /function\s+debounce\s*\(/.test(s) || /const\s+debounce\s*=\s*\(/.test(s);
  const hasSet = /settimeout\(/.test(s);
  const hasClear = /cleartimeout\(/.test(s);
  const ok = hasDecl && hasSet && hasClear;
  return ok || { ok: false, msg: 'Нужны debounce(), clearTimeout и setTimeout' };
}
```


