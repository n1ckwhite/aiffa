---
{
  "id": "weekly-5",
  "title": "Кнопка в HTML (семантически корректная)",
  "description": "Создайте кнопку с помощью тега <button> со строкой «Отправить».",
  "author": { "name": "Nick White", "github": "n1ckwhite", "url": "https://github.com/n1ckwhite" },
  "level": "Начальный",
  "tip": "Семантический <button> доступнее и управляемее, чем <div role='button'>.",
  "editorLanguage": "html",
  "tag": "HTML"
}
---

### Задача

Создайте кнопку:

- используйте тег `<button>`;
- текст кнопки — «Отправить».

```example:html
<button>Отправить</button>
```

```validator
function validate(input) {
  const s = String(input || '').toLowerCase();
  const hasButton = /<button[\s>]/.test(s);
  const hasText = /<button[^>]*>[\s\S]*отправить[\s\S]*<\/button>/.test(s);
  const ok = hasButton && hasText;
  return ok || { ok: false, msg: 'Нужны <button> и текст «Отправить»' };
}
```


