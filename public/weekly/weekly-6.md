---
{
  "id": "weekly-6",
  "title": "Обработчик клика на кнопке",
  "description": "Повесьте обработчик клика на .btn и измените её текст.",
  "author": { "name": "Nick White", "github": "n1ckwhite", "url": "https://github.com/n1ckwhite" },
  "level": "Средний",
  "tip": "Используйте addEventListener и textContent.",
  "editorLanguage": "javascript",
  "tag": "JS"
}
---

### Задача

Напишите код:

- найдите элемент с классом `.btn`;
- навесьте обработчик клика;
- при клике меняйте текст на «Готово!».

```example:javascript
const btn = document.querySelector('.btn');
btn.addEventListener('click', () => {
  btn.textContent = 'Готово!';
});
```

```validator
function validate(input) {
  const s = String(input || '').toLowerCase();
  const hasQuery = /document\.queryselector\(['"][.]btn['"]\)/.test(s);
  const hasListener = /\.addeventlistener\(['"]click['"]/.test(s);
  const hasText = /textcontent\s*=\s*['"]готово!['"]/.test(s);
  const ok = hasQuery && hasListener && hasText;
  return ok || { ok: false, msg: 'Нужны querySelector(.btn), addEventListener(click) и textContent = \"Готово!\"' };
}
```


