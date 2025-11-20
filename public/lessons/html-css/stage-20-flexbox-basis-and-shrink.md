#  Что делают свойства `flex-basis` и `flex-shrink` в Flexbox?

Свойства `flex-basis` и `flex-shrink` управляют тем, **с какого размера стартует flex-элемент** и **насколько он готов сжиматься**, когда контейнеру не хватает места. Это критично для предсказуемых и адаптивных интерфейсов.

---

##  Быстрый обзор

- **`flex-basis`**: базовый размер элемента вдоль главной оси до перераспределения места.
- **`flex-shrink`**: насколько элемент может сжиматься при нехватке места (по отношению к соседям).
- Рабочий порядок Flexbox: **сначала `basis` → потом `shrink` → затем `grow`**.

> Главная ось зависит от `flex-direction`. Для `row` — горизонталь, для `column` — вертикаль. Значение `flex-basis` применяется именно вдоль главной оси.

---

##  `flex-basis` подробно

- **Что делает:** задаёт **начальный размер** элемента вдоль главной оси.
- **Значения:** длины (`px`, `rem`, `em`), `%`, `auto` (по умолчанию), `0`.
- **Приоритет:** на главной оси `flex-basis` имеет приоритет над `width/height`.

###  Базовый пример
```css
.item {
  flex-basis: 150px;
}
```
Элемент постарается занять 150px вдоль главной оси.

###  `flex-basis` против `width`
```css
.item {
  width: 300px;      /* будет проигнорировано на главной оси */
  flex-basis: 150px; /* возьмёт верх */
}
```

###  Проценты и направление
```css
.row {
  display: flex;            /* main axis: горизонталь */
  flex-direction: row;
}
.row .item { flex-basis: 33.333%; }

.col {
  display: flex;            /* main axis: вертикаль */
  flex-direction: column;
}
.col .item { flex-basis: 25%; /* процент от высоты контейнера; нужен заданный размер */ }
```
> Процентная высота (`column`-направление) работает только если высота контейнера вычислима (не `auto`).

###  Особые значения
- **`flex-basis: auto` (по умолчанию):** берёт `width/height`, если заданы, иначе размер содержимого.
- **`flex-basis: 0`**: удобно для равного распределения при `flex-grow` (см. ниже). Часто эквивалент популярному шорткату `flex: 1`.
- **`flex-basis: content`**: использовать осторожно — ведёт себя как размер содержимого; совместимость исторически была неровной. Проверьте в вашей целевой поддержке.

---

##  `flex-shrink` подробно

- **Что делает:** задаёт **относительную скорость сжатия** элемента, когда места не хватает.
- **Значение по умолчанию:** `1` (все сжимаются поровну).
- **Если `0`:** элемент не будет сжиматься (с учётом ограничений `min-width/height`).

###  Числовой разбор
Контейнер: 600px. Три элемента: `basis = [300, 200, 200]` → сумма 700px (не хватает 100px).

```css
.a { flex: 0 2 300px; } /* shrink=2 */
.b { flex: 0 1 200px; } /* shrink=1 */
.c { flex: 0 1 200px; } /* shrink=1 */
```
Дефицит 100px делим пропорционально `shrink`: всего 2+1+1 = 4 доли →
- `.a` теряет 50px → 250px
- `.b` теряет 25px → 175px
- `.c` теряет 25px → 175px

> Совет: Чтобы не дать важному элементу «умирать», ставьте `flex-shrink: 0;` (например, логотипы, кнопки).

> По умолчанию во flex-контейнере действует `min-width: auto` у детей — они не сжимаются меньше содержимого. Чтобы разрешить реальное сжатие/перенос длинных строк, задайте элементу `min-width: 0` (или `overflow: hidden`).

---

##  Как работают вместе: шаги компоновки

1. Выделяем каждому элементу место по `flex-basis`.
2. Если места не хватает — сжимаем по `flex-shrink` (с учётом ограничений `min-*`).
3. Если место остаётся — распределяем по `flex-grow`.

---

##  Сокращение `flex`

Шорткат: `flex: <grow> <shrink> <basis>`.

- `flex: 1` обычно трактуется как `flex: 1 1 0%` → удобное равное распределение.
- `flex: 0 0 240px` — зафиксированная колонка шириной 240px (не растёт и не сжимается).
- `flex: 1 1 auto` — «эластичная» колонка, стартует от `auto` и может сжиматься/расти.

```css
.sidebar { flex: 0 0 280px; }
.content { flex: 1 1 auto; min-width: 0; }
```

---

##  Практические примеры

###  1) Равные карточки в строке
```html
<div class="cards">
  <article class="card">A</article>
  <article class="card">B</article>
  <article class="card">C</article>
  <article class="card">D</article>
  <article class="card">E</article>
  <article class="card">F</article>
  <!-- при узком экране карточки начнут сжиматься, затем переноситься если включить wrap -->
</div>
```
```css
.cards {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;          /* разрешаем перенос */
}
.card {
  flex: 1 1 220px;          /* старт 220px, можно сжаться и вырасти */
  min-width: 200px;         /* не меньше минимума визуально комфортной ширины */
  background: #f6f8ff;
  border: 1px solid #cdd9ff;
  border-radius: 8px;
  padding: 12px;
}
```

###  2) «Несжимаемый» логотип и гибкое меню
```html
<header class="bar">
  <div class="logo">LOGO</div>
  <nav class="menu">…</nav>
</header>
```
```css
.bar {
  display: flex;
  align-items: center;
  gap: 12px;
}
.logo { flex: 0 0 auto; }   /* не сжимать */
.menu { flex: 1 1 auto; min-width: 0; }
```

###  3) Колонка с фиксированным сайдбаром
```html
<main class="layout">
  <aside class="sidebar">Sidebar</aside>
  <section class="content">Content</section>
</main>
```
```css
.layout { display: flex; }
.sidebar { flex: 0 0 280px; }
.content { flex: 1 1 auto; min-width: 0; }
```

---

##  Частые ошибки и подводные камни

- **`width` игнорируется на главной оси**, если задан `flex-basis` → используйте `flex-basis` или шорткаты `flex`.
- **Длинные строки/код «не сжимаются»** из‑за `min-width: auto` → добавьте `min-width: 0;` элементу.
- **Проценты в `column`**: высоты по процентам требуют явной высоты контейнера.
- **`flex-basis: content`**: проверяйте поддержку, особенно если важна кроссбраузерность.
- **Путаются оси**: помните, что `basis`/`shrink`/`grow` работают вдоль главной оси (`flex-direction`).

> Для «равных колонок» используйте `flex: 1` у всех элементов — это коротко и предсказуемо.

---

##  Полезные ссылки

- MDN — Flexbox: https://developer.mozilla.org/ru/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox
- MDN — flex-basis: https://developer.mozilla.org/ru/docs/Web/CSS/flex-basis
- MDN — flex-shrink: https://developer.mozilla.org/ru/docs/Web/CSS/flex-shrink
- MDN — flex (шорткат): https://developer.mozilla.org/ru/docs/Web/CSS/flex
- web.dev — Flexbox: https://web.dev/learn/css/flexbox/
- Flexbugs (известные баги): https://github.com/philipwalton/flexbugs

---

##  Итог

- **`flex-basis`** задаёт стартовый размер на главной оси и имеет приоритет над `width/height`.
- **`flex-shrink`** управляет тем, как элемент делит «дефицит места» с соседями.
- Используйте шорткат `flex: grow shrink basis` для лаконичной и точной настройки.
- Помните про `min-width: 0` там, где элемент действительно должен уметь сжиматься.

---