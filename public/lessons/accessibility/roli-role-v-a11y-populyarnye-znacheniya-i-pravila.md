#  Роли (role) в A11Y: популярные значения и правила

`role` помогает ассистивным технологиям понять назначение элемента. Используйте только предопределённые роли из WAI‑ARIA — собственные значения не распознаются.

---

##  Короткое резюме
- **О чём**: самые популярные роли и как их правильно применять.
- **Зачем**: чтобы компоненты были предсказуемы для скринридеров и клавиатуры.
- **Что уметь**: выбирать корректную роль, не переопределять нативные теги зря, дополнять `aria-*`. 

---

##  Популярные роли по группам

### Структурные
- `banner` — верхняя шапка сайта (обычно `header`).
- `main` — основное содержимое страницы (обычно один на страницу).
- `navigation` — навигация (`nav`).
- `complementary` — дополнительная боковая область.
- `contentinfo` — футер/метаинформация.
- `region` — логическая область, как правило с заголовком (`aria-labelledby`).

### Интерактивные
- `button` — кнопка (если нельзя использовать `button`).
- `link` — ссылка (если нельзя `a[href]`).
- `checkbox`, `radio`, `switch` — переключатели.
- `slider`, `spinbutton` — ввод числовых значений.
- `textbox`, `searchbox`, `combobox` — ввод текста/комбинации.

### Контейнеры/Составные виджеты
- `list` / `listitem` — списки и элементы.
- `menu` / `menuitem` — меню и пункты.
- `tablist` / `tab` / `tabpanel` — вкладки.
- `tree` / `treeitem` — древовидные структуры.
- `grid` / `row` / `gridcell` — таблицы‑виджеты.

### Статусы и уведомления
- `status` — информативный статус (не срочный).
- `alert` — важное уведомление, требует внимания.
- `tooltip` — всплывающая подсказка.
- `progressbar` — индикатор прогресса.

### Диалоги
- `dialog` — диалоговое окно.
- `alertdialog` — диалог с важным предупреждением.

---

##  Можно ли придумывать свои значения для `role`?
Нет. Допустимы только значения из спецификации WAI‑ARIA. Произвольные роли скринридеры не понимают.

Вместо этого:
- Используйте нативные теги, где это возможно.
- Дополняйте поведение `aria-*` атрибутами (`aria-label`, `aria-labelledby`, `aria-describedby`, `aria-expanded`, `aria-selected`, `aria-live`, и т. д.).
- При необходимости уточняйте описание через `aria-roledescription` (читается как доп. пояснение, не меняет роль).

---

##  Примеры 
```html
<!-- Регион с заголовком для скринридера -->
<section role="region" aria-labelledby="custom-label">
  <h2 id="custom-label">Моя уникальная область</h2>
  <p>Контент…</p>
</section>
```

```html
<!-- Карусель (пример уточнений через roledescription) -->
<div role="region" aria-roledescription="Карусель">
  <button aria-label="Предыдущий слайд">←</button>
  <div role="group" aria-roledescription="Слайды" aria-labelledby="carousel-title">
    <h2 id="carousel-title">Фотогалерея</h2>
    <div role="group" aria-label="Слайд 1 из 5">…</div>
  </div>
  <button aria-label="Следующий слайд">→</button>
  
</div>
```

```html
<!-- Вкладки по APG (упрощённо) -->
<div role="tablist" aria-label="Разделы">
  <button role="tab" aria-selected="true" aria-controls="p1" id="t1">Обзор</button>
  <button role="tab" aria-selected="false" aria-controls="p2" id="t2">Характеристики</button>
</div>
<section role="tabpanel" id="p1" aria-labelledby="t1">…</section>
<section role="tabpanel" id="p2" aria-labelledby="t2" hidden>…</section>
```

---

##  Практические правила
- Сначала выбираем нативный тег; если нельзя — добавляем корректную `role`.
- Не конфликтуйте с нативной ролью (не делайте `a role="button"` вместо `button`).
- Синхронизируйте роль и состояния через `aria-*`.
- Повторяйте ожидаемую клавиатурную модель (Enter/Space/стрелки/Tab).
- Для сложных виджетов ориентируйтесь на WAI‑ARIA Authoring Practices (APG).

> Важно: `aria-roledescription` — пояснение, а не новая роль. Не заменяет и не изобретает значение `role`.

---

##  Итог
- Используйте только стандартные роли из WAI‑ARIA.
- Комбинируйте их с `aria-*` для уточнений и динамики.
- Тестируйте со скринридерами и клавиатурой. 

##  ЗАДАЧИ

Набор задач для практики `role` и `aria-*`:

---

###  Задача 1: Правильная роль для действия
 Элемент визуально «как ссылка», но открывает модалку. Выберите корректный тег/роль и клавиатуру.

```html
<a class="linklike" onclick="openModal()">Открыть</a>
``;

<details>
<summary> Решение</summary>

Это действие → используем `<button>` (или `role="button"` при жёстком ограничении). Добавляем клавиатурную модель Enter/Space.

```html
<button type="button" class="linklike" onclick="openModal()">Открыть</button>
```

</details>

---

###  Задача 2: Область c заголовком
 Сделайте логическую область, которую скринридер сможет найти по заголовку.

```html
<div class="box">Содержимое…</div>
```

<details>
<summary> Решение</summary>

```html
<section role="region" aria-labelledby="area-title">
  <h2 id="area-title">Раздел</h2>
  <div class="box">Содержимое…</div>
</section>
```

</details>

---

###  Задача 3: Вкладки — синхронизация состояний
 Синхронизируйте `aria-selected`, `aria-controls` и `hidden` у вкладок и панелей.

```html
<div role="tablist">
  <button role="tab" aria-selected="true" aria-controls="p1" id="t1">A</button>
  <button role="tab" aria-selected="false" aria-controls="p2" id="t2">B</button>
</div>
<section role="tabpanel" id="p1" aria-labelledby="t1">…</section>
<section role="tabpanel" id="p2" aria-labelledby="t2" hidden>…</section>
```

<details>
<summary> Решение</summary>

```js
const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));
tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(t => t.setAttribute('aria-selected', String(t === tab)));
  panels.forEach(p => p.hidden = p.id !== tab.getAttribute('aria-controls'));
}));
```

</details>

---

##  Самопроверка

1. Можно ли придумывать собственные значения для `role`?

<details>
<summary> Вывод</summary>
Нет. Допустимы только значения из WAI‑ARIA.
</details>

2. Чем `aria-roledescription` отличается от `role`?

<details>
<summary> Вывод</summary>
Это пояснение для AT, не меняет роль и не изобретает новую.
</details>

3. Когда уместно назначать `role="button"` на не‑кнопку?

<details>
<summary> Вывод</summary>
Только при реальных ограничениях, с полной клавиатурной моделью и фокусируемостью.
</details>

---

 Эти задачи помогают закрепить: выбор корректных ролей, сочетание с `aria-*` и синхронизацию состояний для предсказуемого поведения.

---