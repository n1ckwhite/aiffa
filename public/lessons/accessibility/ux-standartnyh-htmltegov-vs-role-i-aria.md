#  UX стандартных HTML‑тегов vs role/aria

Комбинировать нативные теги (`button`, `a`, `input`, `details`…) и ARIA возможно и полезно, если сохраняются семантика, клавиатура и предсказуемость UX. Ниже — практичные правила, примеры и задачки в стиле соседних материалов.

---

##  Короткое резюме
- **О чём**: как нативные теги влияют на UX компонентов на `role/aria`, когда и как их сочетать.
- **Зачем**: сохранить предсказуемость и доступность, не теряя гибкости дизайна.
- **Что уметь**: выбирать нативный тег, корректно добавлять `role/aria-*`, повторять клавиатурную модель. 

---

##  Почему нативные теги — базовая линия UX
- Нативные элементы уже содержат семантику, фокус, поведение и озвучивание (AT).
- `button` обрабатывает Enter/Space, участвует в формах, имеет `:focus`/`:disabled`.
- `a[href]` — навигация по Enter, поддержка контекстного меню/открытия в новой вкладке.

---

##  Когда использовать ARIA/role 
- Когда нет нативного аналога паттерна (tabs, menu, tree, grid) — следуем WAI‑ARIA APG.
- Когда нужно дополнить нативный элемент (`aria-expanded`, `aria-describedby`, `aria-live`).
- Не переопределяйте нативные роли без необходимости (не делайте `a role="button"` вместо `button`).

---

##  Анти‑паттерны и исправления 
- Кликобельный `div` как кнопка → используйте `button`, либо добавьте `tabindex="0"`, Enter/Space, ARIA‑состояния.
- Ссылка без `href` → потеря семантики. Для действий — `button`; для переходов — валидный `href`.
- Только CSS‑классы без ARIA‑состояний → скринридер не узнает об изменениях; синхронизируйте `aria-*`.

---

##  Примеры 
```html
<!-- Нативная кнопка -->
<button type="button" class="primary-button">Отправить</button>
```

```html
<!-- Кастомная «кнопка» (только если нельзя нативно) -->
<div role="button" tabindex="0" aria-label="Отправить" class="primary-button">Отправить</div>
<script>
  const btn = document.querySelector('[role="button"]');
  btn.addEventListener('click', onActivate);
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onActivate(); }
  });
  function onActivate(){ /* действие */ }
}</script>
```

```html
<!-- Раскрывающийся спойлер: нативно предпочтительно -->
<details>
  <summary>Подробнее</summary>
  <p>Контент</p>
</details>
```

```html
<!-- Кастомный disclosure (если обязателен кастомный UI) -->
<button aria-expanded="false" aria-controls="panel-1" id="toggle-1">Подробнее</button>
<div id="panel-1" hidden>
  <p>Контент</p>
</div>
<script>
  const toggle = document.getElementById('toggle-1');
  const panel = document.getElementById('panel-1');
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    panel.hidden = expanded;
  });
}</script>
```

---

##  Клавиатурные ожидания пользователей ⌨
- `button`: фокусируемый, Enter/Space активируют.
- `a[href]`: фокусируемый, Enter открывает URL (Space прокручивает).
- `checkbox`: Space переключает, синхронизируем `aria-checked`.
- `radio`: стрелки меняют выбор в группе.
- `tablist/tab`: стрелки ходят по вкладкам, `aria-selected` и `aria-controls` согласованы.

Кастом‑виджеты обязаны повторять эти модели.

---

##  Разный UX для однотипных компонентов?
Да, если не ломать базовые ожидания.
- Разные стили при одинаковой семантике (`button.primary`, `button.icon`).
- Разное поведение в контексте, но внутри роли (кнопка отправляет форму или закрывает модалку).
- Расширения через `aria-*` без смены роли (`aria-describedby`, `aria-busy`, `aria-live`).

> Важно: кнопка не должна внезапно вести себя как ссылка, и наоборот.

---

##  Итог
- Нативные теги — основа предсказуемого UX и доступности.
- ARIA — точечное усиление, а не замена.
- Разный UX допустим, если сохраняются роль и клавиатурная модель. 

##  ЗАДАЧИ

Набор задач для практики `нативные теги vs role/aria`:

---

###  Задача 1: Див‑кнопка → корректная кнопка
 Есть `<div class="btn">Сохранить</div>` c JS‑кликом. Обеспечьте полноценный UX «кнопки» без изменения внешнего вида.

```html
<!-- Исходник (упрощённо) -->
<div class="btn" onclick="save()">Сохранить</div>
```

<details>
<summary> Решение</summary>

Лучше заменить на нативный `button`. Если нельзя — добавить `role="button"`, `tabindex="0"`, обработку Enter/Space и видимый `:focus`.

```html
<button type="button" class="btn" onclick="save()">Сохранить</button>
```

</details>

---

###  Задача 2: Ссылка или кнопка?
 Элемент выглядит как ссылка, но запускает модалку. Выберите корректный тег и клавиатурную модель.

```html
<a class="linklike" onclick="openModal()">Открыть</a>
```

<details>
<summary> Решение</summary>

Это действие, значит `button`.

```html
<button type="button" class="linklike" onclick="openModal()">Открыть</button>
```

</details>

---

###  Задача 3: Disclosure с ARIA
 Реализуйте кнопку, которая разворачивает панель: синхронизируйте визуальное состояние и `aria-expanded`.

```html
<button aria-expanded="false" aria-controls="panel">Подробнее</button>
<div id="panel" hidden>Текст…</div>
```

<details>
<summary> Решение</summary>

```js
const btn = document.querySelector('button[aria-controls="panel"]');
const panel = document.getElementById('panel');
btn.addEventListener('click', () => {
  const exp = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!exp));
  panel.hidden = exp;
});
```

</details>

---

###  Задача 4: Разный UX без смены роли
 Сделайте две кнопки (`primary`, `icon`) с разным UI, но одинаковой семантикой и клавиатурой.

```html
<button class="primary">Отправить</button>
<button class="icon" aria-label="Отправить">
  <svg aria-hidden="true" focusable="false" width="16" height="16"><path/></svg>
  <span class="sr-only">Отправить</span>
  
</button>
```

<details>
<summary> Пояснение</summary>

Обе — `button`. Иконке добавлено доступное имя через `aria-label`/визуально скрытый текст.

</details>

---

##  Самопроверка

1. Можно ли делать «ссылку‑кнопку» через `a role="button"`?

<details>
<summary> Вывод</summary>
Лучше использовать `button` для действия. `a role="button"` допустимо только при жёстких ограничениях и с полной реализацией клавиатуры.
</details>

2. Должен ли `div role="button"` реагировать на Space?

<details>
<summary> Вывод</summary>
Да. Нужно добавить обработку Enter/Space и фокусируемость (`tabindex="0"`).
</details>

3. Когда уместно `aria-live`?

<details>
<summary> Вывод</summary>
Когда контент обновляется асинхронно и это важно озвучить (статусы, уведомления).
</details>

---

 Эти задачи помогают закрепить: выбор нативных тегов vs `role/aria`, воспроизведение корректных клавиатурных моделей и синхронизацию состояний UI с `aria-*` для предсказуемого, доступного UX.

---

