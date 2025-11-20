---
{
  "id": "weekly-9",
  "title": "Доступная форма: label + input",
  "description": "Создайте поле ввода с подписью через <label for='...'> и id у input.",
  "author": { "name": "Roman Troitsky", "github": "DreamShaded", "url": "https://github.com/DreamShaded" },
  "level": "Продвинутый",
  "tip": "Связка for/id улучшает доступность и UX.",
  "editorLanguage": "html",
  "tag": "HTML"
}
---

### Задача

Создайте подпись и поле:

- `<label for="email">Email</label>`;
- `<input id="email" type="email">`.

```example:html
<label for="email">Email</label>
<input id="email" type="email" />
```

```validator
function validate(input) {
  const s = String(input || '').toLowerCase();
  const hasLabel = /<label[^>]*for=/.test(s);
  const hasId = /<input[^>]*id=/.test(s);
  const ok = hasLabel && hasId;
  return ok || { ok: false, msg: 'Нужны <label for=\"...\"> и <input id=\"...\">' };
}
```


