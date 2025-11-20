---
{
  "id": "weekly-3",
  "title": "Семантическое меню навигации",
  "description": "Создайте блок <nav> с неупорядоченным списком ссылок. Минимум две ссылки.",
  "author": { "name": "Roman Troitsky", "github": "DreamShaded", "url": "https://github.com/DreamShaded" },
  "level": "Продвинутый",
  "tip": "Используйте <nav> для навигации и семантически корректные <ul>/<li>/<a>.",
  "editorLanguage": "html",
  "tag": "HTML"
}
---

### Задача

Создайте навигационный блок:

- оберните меню в `<nav>`;
- используйте список `<ul>` с пунктами `<li>`;
- внутри пунктов — ссылки `<a href="...">` (минимум две).

```example:html
<nav>
  <ul>
    <li><a href="#home">Главная</a></li>
    <li><a href="#about">О проекте</a></li>
  </ul>
  <!-- Дополнительно можно добавить больше пунктов меню -->
  </nav>
```

```validator
function validate(input) {
  const s = String(input || '').toLowerCase();
  const hasNav = /<nav[\s>]/.test(s);
  const hasUl = /<ul[\s>]/.test(s);
  const links = (s.match(/<a\s+href=/g) || []).length;
  const ok = hasNav && hasUl && links >= 2;
  return ok || { ok: false, msg: 'Нужны <nav>, <ul> и минимум две ссылки <a href="...">' };
}
```


