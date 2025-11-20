#  Комбинирование стандартных HTML‑тегов и Custom Elements (Web Components)

Комбинировать нативные теги (`button`, `a`, `form`, `input`…) и Custom Elements (напр., `mwc-button`, `my-card`) — нормальная практика. Важно сохранять корректную семантику, доступность (A11Y), управляемость с клавиатуры и предсказуемость UX.

---

##  Короткое резюме
- **О чём**: когда и как сочетать нативные теги и Custom Elements.
- **Зачем**: расширить функциональность без потери A11Y/UX.
- **Что уметь**: выбирать семантику, обеспечивать ARIA/ролы/клавиатуру, учитывать Shadow DOM. 

---

##  Что такое Web Components 
- **Custom Elements**: собственные теги (`<my-component>`), события/атрибуты.
- **Shadow DOM**: инкапсуляция разметки/стилей и контроль слотов.
- **HTML Templates**: разметка‑заготовки.
- Примеры: библиотека Material Web (`mwc-…`), собственные UI‑компоненты.

---

##  Когда комбинировать уместно 
- **Расширить возможности**: нужно особое поведение/стили (напр., `mwc-button`).
- **Модульность/реюз**: выделение повторяемых блоков (`<user-profile>` вместо россыпи `div`).
- **Изоляция стилей**: Shadow DOM защищает от конфликтов CSS.
- **Интеграция библиотек**: подключение готовых Custom Elements в обычный HTML.

---

##  Важные аспекты A11Y и UX 
- Семантика: для действий — `button`; для навигации — `a href`.
- У Custom Elements роль/имя нужно уточнять через ARIA/`role` при необходимости.
- Клавиатура: `Tab`‑фокус, `Enter/Space` для «кнопок», отсутствие ловушек фокса.
- Контент и SEO: убедитесь, что важный текст доступен за пределами Shadow DOM или индексируем.
- Старые браузеры: при нужде — полифилы (Custom Elements/Shadow DOM).

---

##  Примеры 
```html
<!-- Смешение нативного и custom -->
<header>
  <mwc-button label="Главная" raised></mwc-button>
  <a href="/catalog">Каталог</a>
</header>

<section>
  <p>Стандартный абзац.</p>
  <user-profile data-user-id="42"></user-profile>
</section>
```

```html
<!-- Действие: лучше button, даже если внешний вид «как ссылка» -->
<button type="button" class="linklike" onclick="openDialog()">Открыть</button>
```

```html
<!-- Ссылка, ведущая себя как кнопка (только при необходимости и с полной реализацией поведения) -->
<a href="#" role="button"
   onclick="event.preventDefault(); toggle();"
   onkeydown="if(event.code==='Space'){ event.preventDefault(); toggle(); }">
  Переключить
</a>
```

---

##  Итог
- Комбинировать можно, если сохраняются корректная семантика, предсказуемое поведение и доступность.
- Учитывайте Shadow DOM, роли/ARIA и клавиатуру; избегайте «див‑кнопок».
- Выбирайте нативный элемент, когда это возможно; Custom Element — когда реально нужен. 

##  ЗАДАЧИ

Вот набор задач, чтобы лучше понять `комбинирование HTML и Custom Elements`:

---

###  Задача 1: Действие в Custom Element
 Есть `<app-action>` с кликом внутри Shadow DOM. Обеспечьте корректную роль «кнопки» и клавиатурное управление без изменения внешнего API.

```html
<!-- Исходник (упрощённо) -->
<app-action>Сохранить</app-action>
```

<details>
<summary> Решение</summary>

Идея: внутри Shadow DOM элемент делаем фокусируемым и управляемым клавиатурой, с ролью `button` и ARIA‑состояниями. Снаружи API остаётся `<app-action>`.

```js
// Внутри реализации app-action
const root = this.attachShadow({ mode: 'open' });
root.innerHTML = `
  <style> :host{display:inline-block} .btn:focus{outline:2px solid #3b82f6} </style>
  <div class="btn" role="button" tabindex="0" aria-pressed="false">
    <slot></slot>
  </div>
`;
const btn = root.querySelector('.btn');
btn.addEventListener('click', () => this.dispatchEvent(new Event('activate')));
btn.addEventListener('keydown', (e) => {
  if (e.code === 'Enter' || e.code === 'Space') { e.preventDefault(); btn.click(); }
});
```

</details>

---

###  Задача 2: Навигация в Custom Element
 Создайте `<nav-link>` с обязательным `href`, который ведёт себя как обычная ссылка (включая открытие в новой вкладке по `Ctrl/Cmd+Enter`).

```html
<!-- Требования -->
<!-- <nav-link href="/help">Справка</nav-link> → по Enter открывает /help -->
```

<details>
<summary> Решение</summary>

```js
class NavLink extends HTMLElement {
  static get observedAttributes() { return ['href']; }
  connectedCallback(){ this.render(); }
  attributeChangedCallback(){ this.render(); }
  render(){
    const href = this.getAttribute('href') || '#';
    const root = this.shadowRoot || this.attachShadow({ mode:'open' });
    root.innerHTML = `
      <a part="anchor" href="${href}"><slot></slot></a>
    `;
    // Нативная ссылка обеспечивает A11Y/клавиатуру/контекстное меню
  }
}
customElements.define('nav-link', NavLink);
```

</details>

---

###  Задача 3: Доступность slotted‑контента
 В `<my-card>` заголовок приходит через слот. Обеспечьте правильную семантику заголовка и связку c основной секцией.

```html
<my-card>
  <span slot="title">Новости</span>
  <p>Последние обновления…</p>
</my-card>
```

<details>
<summary> Решение</summary>

```js
const root = this.attachShadow({ mode:'open' });
root.innerHTML = `
  <section aria-labelledby="title">
    <h2 id="title"><slot name="title"></slot></h2>
    <div class="content"><slot></slot></div>
  </section>
`;
```

</details>

---

 Эти задачи помогают закрепить: сохранение семантики при использовании Custom Elements, реализацию корректного клавиатурного поведения и интеграцию нативных возможностей (ссылки, заголовки) через Shadow DOM.

---
